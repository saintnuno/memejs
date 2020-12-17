
const utils = require('../utils');

test('utils.time', () => {

    let date1 = new Date(1608174423239);       // 2020-12-17T03:07:03.239Z
    let date2 = new Date(1607408890.0*1000);   // seconds

    expect(utils.time(~~(date1.valueOf()/1000))).toBe("2020-12-17 03:07:03.000");
    expect(utils.time(~~(date2.valueOf()/1000))).toBe("2020-12-08 06:28:10.000");
});

test('utils.extensionCheck', () => {

    expect(utils.extensionCheck("https://i.imgur.com/a7Elnqe.gifv")).toBe(true);
    expect(utils.extensionCheck("http://i.imgur.com/a7Elnqe.gifv")).toBe(true);
    expect(utils.extensionCheck("https://i.imgur.com/a7Elnqe.jpg")).toBe(true);
    expect(utils.extensionCheck("https://i.imgur.com/a7Elnqe.gif")).toBe(true);
    expect(utils.extensionCheck("https://i.imgur.com/a7Elnqe.png")).toBe(true);
    expect(utils.extensionCheck("https://i.imgur.com/a7Elnqe")).toBe(false);
    expect(utils.extensionCheck("i.imgur.com/a7Elnqe.jpg")).toBe(false);
    expect(utils.extensionCheck("https//i.imgur.com/a7Elnqe.jpg")).toBe(false);
});


test('utils.subredditCheck - valid subredit', () => {

    return expect(utils.subredditCheck("https://www.reddit.com/r/puppy.json?sort=top&t=day&limit=100"))
        .resolves.toBe(true);

});

test('utils.subredditCheck - invalid url', () => {

    return expect(utils.subredditCheck("https://notautl.test"))
        .rejects.toEqual(new Error("Invalid subredit"));

});
