
const rewire = require("rewire");
require('jest-extended');

const index = rewire('../index');


test('index.getRandomSubRedit', () => {

    let opts = index.__get__("opts");
    let getRandomSubRedit = index.__get__("getRandomSubRedit");

    // just run it a bunch of times
    expect(getRandomSubRedit()).toBeOneOf(opts);
    expect(getRandomSubRedit()).toBeOneOf(opts);
    expect(getRandomSubRedit()).toBeOneOf(opts);
    expect(getRandomSubRedit()).toBeOneOf(opts);
    expect(getRandomSubRedit()).toBeOneOf(opts);
    expect(getRandomSubRedit()).toBeOneOf(opts);
    expect(getRandomSubRedit()).toBeOneOf(opts);
});

test('index.getRandomSubRedit', () => {

    let formatObject = index.__get__("formatObject");


    let data_res = {
        title: 'my girlfriend left me, but my bike stays.',
        url: 'https://i.redd.it/xujhf291jd561.jpg',
        author: 'derdrip',
        subreddit: 'ComedyCemetery',
        created: '2020-12-08 06:28:10.000',
        created_utc: '2020-12-15 21:01:28.000'
    };

    let data_body = {
        title: 'my girlfriend left me, but my bike stays.',
        url: 'https://i.redd.it/xujhf291jd561.jpg',
        author: 'derdrip',
        subreddit: 'ComedyCemetery',
        created: 1607408890,
        created_utc: 1608066088
    };

    expect(formatObject(data_body)).toEqual(data_res);
});

let keys = ['title', 'url', 'author', 'subreddit', 'created', 'created_utc'];

test('index.meme - prommise random success', () => {

    return expect(index.meme()).resolves.toContainAllKeys(keys);
});

test('index.meme - prommise puppy success', () => {

    return expect(index.meme("puppy")).resolves.toContainEntry(['subreddit', 'puppy']);
});

test('index.meme - prommise cats success', () => {

    return expect(index.meme("cats")).resolves.toContainEntry(['subreddit', 'cats']);
});

test('index.meme - prommise cats success', () => {

    return expect(index.meme("cats")).resolves.toContainEntry(['subreddit', 'cats']);
});

test('index.meme - callback default success', done => {

    index.meme((err, obj) => {
        expect(obj).toContainAllKeys(keys);
        done();
    })
});

test('index.meme - callback cats success', done => {

    index.meme("cats", (err, obj) => {
        expect(obj).toContainAllKeys(keys);
        expect(obj).toContainEntry(['subreddit', 'cats'])
        done();
    })
});


test('index.memeAsync - prommise random success', () => {

    return expect(index.memeAsync()).resolves.toContainAllKeys(keys);
});

test('index.memeAsync - prommise puppy success', () => {

    return expect(index.memeAsync("puppy")).resolves.toContainEntry(['subreddit', 'puppy']);
});

test('index.memeAsync - prommise cats success', () => {

    return expect(index.memeAsync("cats")).resolves.toContainEntry(['subreddit', 'cats']);
});

test('index.memeAsync - prommise cats success', () => {

    return expect(index.memeAsync("cats")).resolves.toContainEntry(['subreddit', 'cats']);
});

test('index.memeAsync - callback default success', done => {

    index.memeAsync((err, obj) => {
        expect(obj).toContainAllKeys(keys);
        done();
    })
});

test('index.memeAsync - callback cats success', done => {

    index.memeAsync("cats", (err, obj) => {
        expect(obj).toContainAllKeys(keys);
        expect(obj).toContainEntry(['subreddit', 'cats'])
        done();
    })
});
