const { meme } = require("../dist/index")

test('meme', (done) => {
  meme('ProgrammerHumor').then(m => {
    expect(m.title)
    done();
  });
});

// This should fail
test('meme', (done) => {
  meme('ProgrammerHumor!!!!!!!!!').then(m => {
    expect(m.title)
    done();
  });
});