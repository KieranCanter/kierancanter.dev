import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { updateFlipReadyStats } from '@/lib/kv'

export async function GET() {
  try {
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
    
    // Store the stats in KV
    await updateFlipReadyStats(data.views, data.downloads);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json({ 
      error: (error as Error).message,
      stack: (error as Error).stack 
    }, { status: 500 });
  }
}