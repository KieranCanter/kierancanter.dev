// app/api/scrape/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET(req: NextRequest) {
  try {
    // Define the URL to scrape
    const url = 'https://github.com/bakkesmodorg';

    // Fetch the HTML from the URL
    const { data } = await axios.get(url);

    // Load the HTML into Cheerio
    const $ = cheerio.load(data);

    // Scrape the views and downloads (update these selectors based on the actual HTML structure)
    const views = $('h1.h2').text().trim() || null;
    const downloads = $('span.text-bold').text().trim() || null;

    // Return the scraped data as JSON
    return NextResponse.json({ views, downloads });
  } catch (error) {
    console.error('Error scraping data:', error);
    return NextResponse.json({ views: null, downloads: null }, { status: 500 });
  }
}
