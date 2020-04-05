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

meme(function(data, err) {
  if (err) return console.error(err);
  console.log(data);
});
```

To filter subreddits:
```js
var { meme } = require('memejs');
 
meme('crappydesign', function(data, err) {
  if (err) return console.error(err);
  console.log(data);
});
```

Async requests:
```js
const { memeAsync } = require('memejs');

memeAsync() // Use meme(subredditname) to filter subreddits
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

memeAsync()
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

Possible subreddits to filter are:
```
crappydesign
dankmemes
me_irl
wholesomememes
memeeconomy
adviceanimals
comedycemetery
memes
prequelmemes
terriblefacebookmemes
pewdiepiesubmissions
funny
```
Created by Kyle (Imposed#9787) and Nuno (nuno#4160)
