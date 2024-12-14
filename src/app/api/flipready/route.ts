import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import puppeteer from 'puppeteer';

const STATS_FILE_PATH = path.join(process.cwd(), 'src/data/flipready-stats.json');

interface StatsData {
  lastUpdated: number;
  lastUpdatedDate: string;
  views: string;
  downloads: string;
}

async function readStatsFile() {
  try {
    const data = await fs.readFile(STATS_FILE_PATH, 'utf-8');
    return JSON.parse(data) as StatsData;
  } catch {
    const now = new Date();
    return { 
      lastUpdated: 0,
      lastUpdatedDate: now.toLocaleString(),
      views: "0",
      downloads: "0"
    };
  }
}

async function writeStatsFile(stats: StatsData) {
  await fs.writeFile(STATS_FILE_PATH, JSON.stringify(stats, null, 2));
}

let isScrapingInProgress = false;

async function scrapeStats() {
  if (isScrapingInProgress) {
    console.log('Scraping already in progress, skipping...');
    return { views: "N/A", downloads: "N/A" };
  }

  try {
    isScrapingInProgress = true;
    console.log('Starting browser...');
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
      ]
    });
    
    const page = await browser.newPage();

    // Set a realistic user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Set extra headers
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    });

    console.log('Navigating to URL...');
    await page.goto('https://bakkesplugins.com/plugins/view/401', {
      waitUntil: 'networkidle0',
      timeout: 60000
    });

    // Wait for Cloudflare challenge to complete
    await page.waitForFunction(() => {
      return !document.querySelector('#challenge-running');
    }, { timeout: 30000 });

    // Now try to get the data
    const data = await page.evaluate(() => {
      const viewsMatch = document.body.innerText.match(/Views:\s*(\d+)/);
      const downloadsMatch = document.body.innerText.match(/Downloads:\s*(\d+)/);
      
      return {
        views: viewsMatch ? viewsMatch[1] : "N/A",
        downloads: downloadsMatch ? downloadsMatch[1] : "N/A"
      };
    });

    await browser.close();
    console.log('Scraped data:', data);
    
    return data;
  } catch (error) {
    console.error('Detailed error:', error);
    return { views: "N/A", downloads: "N/A" };
  } finally {
    isScrapingInProgress = false;
  }
}

export async function GET() {
  try {
    const cachedStats = await readStatsFile();
    const now = Date.now();
    const nowDate = new Date();

    // Always return cached stats first if they exist
    if (cachedStats.views && cachedStats.downloads) {
      // Update stats in the background
      scrapeStats().then(freshStats => {
        writeStatsFile({
          lastUpdated: Date.now(),
          lastUpdatedDate: new Date().toLocaleString(),
          ...freshStats
        });
      }).catch(error => {
        console.error('Background stats update failed:', error);
      });

      return NextResponse.json({
        views: cachedStats.views,
        downloads: cachedStats.downloads,
        lastUpdatedDate: cachedStats.lastUpdatedDate,
        cached: true
      });
    }

    // If no cache exists, wait for fresh stats
    const freshStats = await scrapeStats();
    
    await writeStatsFile({
      lastUpdated: now,
      lastUpdatedDate: nowDate.toLocaleString(),
      ...freshStats
    });

    return NextResponse.json({
      ...freshStats,
      lastUpdatedDate: nowDate.toLocaleString(),
      cached: false
    });

  } catch (error) {
    console.error('Error handling FlipReady stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}