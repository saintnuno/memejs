const rewire = require('rewire');
require('jest-extended');

const index = rewire('../index');

test('index.getRandomSubRedit', () => {
    const opts = index.__get__('opts'); // eslint-disable-line no-underscore-dangle
    const getRandomSubRedit = index.__get__('getRandomSubRedit'); // eslint-disable-line no-underscore-dangle

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
    const formatObject = index.__get__('formatObject'); // eslint-disable-line no-underscore-dangle

    const dataResult = {
        title: 'my girlfriend left me, but my bike stays.',
        url: 'https://i.redd.it/xujhf291jd561.jpg',
        author: 'derdrip',
        subreddit: 'ComedyCemetery',
        created: '2020-12-08 06:28:10.000',
        created_utc: '2020-12-15 21:01:28.000',
    };

    const dataBody = {
        title: 'my girlfriend left me, but my bike stays.',
        url: 'https://i.redd.it/xujhf291jd561.jpg',
        author: 'derdrip',
        subreddit: 'ComedyCemetery',
        created: 1607408890,
        created_utc: 1608066088,
    };

    expect(formatObject(dataBody)).toEqual(dataResult);
});

const keys = ['title', 'url', 'author', 'subreddit', 'created', 'created_utc'];

test('index.meme - prommise random success', () => expect(index.meme()).resolves.toContainAllKeys(keys));

test('index.meme - prommise puppy success', () => expect(index.meme('puppy')).resolves.toContainEntry(['subreddit', 'puppy']));

test('index.meme - prommise cats success', () => expect(index.meme('cats')).resolves.toContainEntry(['subreddit', 'cats']));

test('index.meme - prommise cats success', () => expect(index.meme('cats')).resolves.toContainEntry(['subreddit', 'cats']));

test('index.meme - callback default success', (done) => {
    index.meme((err, obj) => {
        expect(obj).toContainAllKeys(keys);
        done();
    });
});

test('index.meme - callback cats success', (done) => {
    index.meme('cats', (err, obj) => {
        expect(obj).toContainAllKeys(keys);
        expect(obj).toContainEntry(['subreddit', 'cats']);
        done();
    });
});

test('index.memeAsync - prommise random success', () => expect(index.memeAsync()).resolves.toContainAllKeys(keys));

test('index.memeAsync - prommise puppy success', () => expect(index.memeAsync('puppy')).resolves.toContainEntry(['subreddit', 'puppy']));

test('index.memeAsync - prommise cats success', () => expect(index.memeAsync('cats')).resolves.toContainEntry(['subreddit', 'cats']));

test('index.memeAsync - prommise cats success', () => expect(index.memeAsync('cats')).resolves.toContainEntry(['subreddit', 'cats']));

test('index.memeAsync - callback default success', (done) => {
    index.memeAsync((err, obj) => {
        expect(obj).toContainAllKeys(keys);
        done();
    });
});

test('index.memeAsync - callback cats success', (done) => {
    index.memeAsync('cats', (err, obj) => {
        expect(obj).toContainAllKeys(keys);
        expect(obj).toContainEntry(['subreddit', 'cats']);
        done();
    });
});
