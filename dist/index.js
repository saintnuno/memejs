"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meme = void 0;
const utils_1 = require("./utils");
const subs = [
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
function meme(reddit, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        if (callback)
            console.log('Callbacks are now deprecated please update your code.');
        if (!reddit)
            reddit = subs[~~(Math.random() * subs.length)];
        const url = `https://www.reddit.com/r/${reddit}.json?sort=top&t=day&limit=100`;
        let object;
        yield utils_1.checkSubreddit(url).then((body) => {
            if (!body.length)
                return console.log('No results found.');
            const math = Math.floor(Math.random() * Math.floor(body.length));
            const random = body[math].data;
            if (!/^.*\.(jpg?g|png|gif|gifv)$/.test(random.url))
                return console.log('No results found.');
            object = {
                title: random.title,
                url: random.url,
                author: random.author,
                subreddit: random.subreddit,
                created: utils_1.time(random.created),
                created_utc: utils_1.time(random.created_utc)
            };
        }).catch(e => new Error(e));
        return object;
    });
}
exports.meme = meme;
exports.memeAsync = meme;
//# sourceMappingURL=index.js.map