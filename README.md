# memejs
Retrieve memes easily from reddit.
<p><a href="https://www.npmjs.com/package/memejs" rel="nofollow"><img src="https://badgen.net/npm/dt/memejs" alt="Downloads" /></a></p>

## Installation
```bash
npm install memejs --save
```

## How to use memejs
```js
const { meme } = require('memejs');

memeAsync() // Use meme('subredditname') to filter subreddits
.then(m => console.log(m)) // Get the JSON output
.catch(e => console.log(e)); // Handle any errors
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

**Note:** V2 is now out, fully reworked with TypeScript. No need for callbacks anymore!

Created by [Kyle](https://github.com/scrap) and Nuno (nuno#4160)

Honorable mention [marshallasch](https://github.com/marshallAsch/) --> [reasoning](https://github.com/Nuno135/memejs/pull/6)