# memejs
Get the best memes easily!

## Installation
```bash
npm install memejs
```

## Usage
To get the full JSON output:
```js
var meme = require('memejs');

meme(function(data, err) {
  if (err) return console.error(err);
  console.log(data);
});
```
To get the meme title:
```js
var meme = require('memejs');

meme(function(data, err) {
  if (err) return console.error(err);
  console.log(data.title[0]);
});
```
To get the meme url:
```js
var meme = require('memejs');

meme(function(data, err) {
  if (err) return console.error(err);
  console.log(data.url[0]);
});
```
