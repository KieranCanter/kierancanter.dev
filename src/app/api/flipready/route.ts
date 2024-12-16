import { NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
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

    // Get current stats before update
    const oldStats = await kv.get('flipready-stats');
    console.log('Current stats in KV:', oldStats);

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
        hasKVUrl: !!process.env.KV_REST_API_URL,
        hasKVToken: !!process.env.KV_REST_API_TOKEN
      }
    });
    return null;
  }
}

async function scrapeStats() {
  if (isScrapingInProgress) return { views: "N/A", downloads: "N/A" };

  try {
    isScrapingInProgress = true;
    console.log('Starting browser...');
    
    const browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process'
      ],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless
    });
    
    const page = await browser.newPage();
    
    // Set a shorter timeout
    page.setDefaultNavigationTimeout(30000);
    page.setDefaultTimeout(30000);
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    console.log('Navigating to URL...');
    await page.goto('https://bakkesplugins.com/plugins/view/401', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    console.log('Waiting for Cloudflare...');
    await page.waitForFunction(() => {
      return !document.querySelector('#challenge-running');
    }, { timeout: 25000 });

    console.log('Extracting data...');
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
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return { views: "N/A", downloads: "N/A" };
  } finally {
    isScrapingInProgress = false;
  }
}

export async function GET() {
  try {
    const cachedStats = await getStoredStats();
    const now = Date.now();
    
    console.log('Cached stats:', cachedStats);
    console.log('Cache age:', now - (cachedStats?.lastUpdated || 0), 'ms');
    
    if (cachedStats?.lastUpdated && 
        (now - cachedStats.lastUpdated < 30 * 60 * 1000) && 
        cachedStats.views !== "N/A" && 
        cachedStats.downloads !== "N/A") {
      console.log('Returning cached stats');
      return NextResponse.json({
        ...cachedStats,
        cached: true
      });
    }

    console.log('Cache expired or missing, fetching fresh stats...');
    const freshStats = await scrapeStats();
    
    // Don't update if scraping failed
    if (freshStats.views === "N/A" || freshStats.downloads === "N/A") {
      console.log('Scraping failed, returning cached stats if available');
      return NextResponse.json({
        ...(cachedStats || freshStats),
        cached: !!cachedStats,
        scrapeError: true
      });
    }
    
    const updatedStats = await updateStats(freshStats);
    console.log('Fresh stats:', freshStats);
    console.log('Updated stats:', updatedStats);
    
    return NextResponse.json({
      ...(updatedStats || freshStats),
      cached: false
    });

  } catch (error) {
    console.error('Error handling FlipReady stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}