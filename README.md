# memejs
Retrieve memes easily from reddit.
<p><a href="https://www.npmjs.com/package/memejs" rel="nofollow"><img src="https://badgen.net/npm/dt/memejs" alt="Downloads" /></a></p>

## Installation
```bash
npm install memejs
```

## Usage
To get the full JSON output:
```js
const { meme } = require('memejs');

meme(function(err, data) {
  if (err) return console.error(err);
  console.log(data);
});
```

To filter subreddits:
```js
const { meme } = require('memejs');
 
meme('crappydesign', function(err, data) {
  if (err) return console.error(err);
  console.log(data);
});
```

Async requests:
```js
const { memeAsync } = require('memejs');

memeAsync() // Use memeAsync('subredditname') to filter subreddits
.then(m => {
  // Do stuff with the JSON
  console.log(m);
})
.catch(e => {
  // Handle the error
  console.log(e);
})
```

TypeScript support:
```ts
import { memeAsync } from 'memejs';

memeAsync() // Use memeAsync('subredditname') to filter subreddits
.then(m => {  
  // Do stuff with the JSON
  console.log(m);
})
.catch(e => {
  // Handle the error
  console.log(e);
});
```

Example of JSON output:
```
{
  title: 'Me irl',
  url: 'https://i.redd.it/zdaqicupnzq41.jpg',
  author: 'godofeverythingelse',
  subreddit: 'me_irl',
  created: '2020-03-05 19:55:59.000',
  created_utc: '2020-03-05 11:55:59.000'
}
```

**Note:** You can now search for any subreddit.

Created by Kyle (Imposed#9787) and Nuno (nuno#4160)
