import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { kv } from '@vercel/kv';

interface StatsData {
  lastUpdated: number;
  lastUpdatedDate: string;
  views: string;
  downloads: string;
}

let isScrapingInProgress = false;

async function getStoredStats(): Promise<StatsData | null> {
  try {
    const stats = await kv.get<StatsData>('flipready-stats');
    return stats || {
      lastUpdated: 0,
      lastUpdatedDate: new Date().toLocaleString(),
      views: "0",
      downloads: "0"
    };
  } catch (error) {
    console.error('Error reading from KV:', error);
    return null;
  }
}

async function updateStats(freshStats: { views: string; downloads: string }) {
  // Only update KV if we have valid stats
  if (freshStats.views === "N/A" || freshStats.downloads === "N/A") {
    console.log('Skipping KV update due to invalid stats:', freshStats);
    return null;
  }

  try {
    const now = new Date();
    const stats: StatsData = {
      lastUpdated: now.getTime(),
      lastUpdatedDate: now.toLocaleString('en-US', { 
        timeZone: 'America/New_York',
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      }),
      ...freshStats
    };
    
    console.log('Attempting to update KV with stats:', stats);
    
    // Check if KV is properly configured
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.error('KV environment variables are not properly configured');
      return null;
    }

    await kv.set('flipready-stats', stats);
    console.log('Successfully updated KV');
    
    // Verify the update
    const verifyStats = await kv.get('flipready-stats');
    console.log('Verified KV stats after update:', verifyStats);
    
    return stats;
  } catch (error: unknown) {
    console.error('Error writing to KV:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      env: {
        hasRedisUrl: !!process.env.UPSTASH_REDIS_REST_URL,
        hasRedisToken: !!process.env.UPSTASH_REDIS_REST_TOKEN
      }
    });
    return null;
  }
}

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
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
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

    await page.waitForFunction(() => {
      return !document.querySelector('#challenge-running');
    }, { timeout: 30000 });

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
    const cachedStats = await getStoredStats();
    const now = Date.now();
    
    // If we have cached stats and they're less than 30 minutes old
    if (cachedStats?.lastUpdated && (now - cachedStats.lastUpdated < 30 * 60 * 1000)) {
      return NextResponse.json({
        ...cachedStats,
        cached: true
      });
    }

    // If stats are older than 30 minutes or don't exist, get fresh stats
    const freshStats = await scrapeStats();
    const updatedStats = await updateStats(freshStats);
    
    return NextResponse.json({
      ...(updatedStats || freshStats),
      cached: false
    });

  } catch (error) {
    console.error('Error handling FlipReady stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}