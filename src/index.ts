import { time, checkSubreddit } from "./utils";

interface redditObject {
	title: string;
	url: string;
	author: string;
	subreddit: string;
	created: number;
	created_utc: number;
	nsfw: boolean;
}

const subs: string[] = [
	'crappydesign',
	'dankmemes',
	'me_irl',
	'wholesomememes',
	'memeeconomy',
	'adviceanimals',
	'comedycemetery',
	'memes',
	'prequelmemes',
	'terriblefacebookmemes',
	'pewdiepiesubmissions',
	'funny'
];

export async function meme(reddit?: string, callback?: any) {
	if(callback) console.log('Callbacks are now deprecated please update your code.');
  if(!reddit) reddit = subs[~~(Math.random() * subs.length)];

	const url: string = `https://www.reddit.com/r/${reddit}.json?sort=top&t=day&limit=100`;
	let object;

  await checkSubreddit(url).then((body: any) => {
		if(!body.length) return console.log('No results found.');
		const math: number = Math.floor(Math.random() * Math.floor(body.length));
		const random = body[math].data;
		if(!/^.*\.(jpg?g|png|gif|gifv)$/.test(random.url)) return console.log('No results found.');
		object = {
			title: random.title,
			url: random.url,
			author: random.author,
			subreddit: random.subreddit,
			created: time(random.created as number),
			created_utc: time(random.created_utc as number),
			nsfw: random.over_18
		}
	}).catch(e => new Error(e));
	return object;
}

(exports as any).memeAsync = meme;
