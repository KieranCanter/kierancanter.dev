import { createClient } from '@vercel/kv'

const kv = createClient({
  url: process.env.NEXT_PUBLIC_KV_REST_API_URL!,
  token: process.env.NEXT_PUBLIC_KV_REST_API_TOKEN!,
});

export const getFlipReadyStats = async () => {
  try {
    const stats = await kv.hgetall('flipready_stats') as { views?: string; downloads?: string };
    console.log('Raw KV stats:', stats);
    return {
      views: stats?.views ?? 'N/A',
      downloads: stats?.downloads ?? 'N/A'
    };
  } catch (error) {
    console.error('Error fetching FlipReady stats:', error);
    return { views: 'N/A', downloads: 'N/A' };
  }
}

export const updateFlipReadyStats = async (views: string, downloads: string) => {
  try {
    await kv.hset('flipready_stats', { views, downloads })
    return true
  } catch (error) {
    console.error('Error updating FlipReady stats:', error)
    return false
  }
} 