import fetch from "node-fetch";

export function time(time: number): string {
  const unix = new Date(time*1000);

  return unix.getUTCFullYear() +
  '-' + ('0' + unix.getUTCMonth()).slice(-2) +
  '-' + ('0' + unix.getUTCDate()).slice(-2) + 
  ' ' + ('0' + unix.getUTCHours()).slice(-2) +
  ':' + ('0' + unix.getUTCMinutes()).slice(-2) +
  ':' + ('0' + unix.getUTCSeconds()).slice(-2) +
  '.' + (unix.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) 
}

export async function checkSubreddit(url: string): Promise<unknown> {
  const request = await fetch(url);
  const res = await request.json();
  if(!res.data || !res.data.children) return console.error('Invalid subreddit')
  const { children } = res.data;
  return children;
}