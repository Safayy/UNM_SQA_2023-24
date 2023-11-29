const {By, until} = require('selenium-webdriver');
// import videoListManager from '../video-manager.js';

// test('TC001 Show Playlist', async () => {
//   let videos = await driver.wait(
//     until.elementsLocated(By.css('.playlist-video')), 5000
//   );
//   let thumbnails = await driver.wait(
//     until.elementsLocated(By.css('.thumbnail')), 5000
//   );
//   let titles = await driver.wait(
//     until.elementsLocated(By.css('.title')), 5000
//   );

//   expect(videos.length).toBe(12);
//   expect(thumbnails.length).toBe(12);
//   expect(titles.length).toBe(12);
// });

test('TC001 Show Default Video', async () => {
  let videoIframe = await global.driver.wait(
    until.elementsLocated(By.id('video-container')), 9000
  );

  await global.driver.switchTo().frame(videoIframe);
  let videoPlayer = await global.driver.wait(
    until.elementsLocated(By.id('player')), 9000
  );
  await global.driver.switchTo().parentFrame();


  // console.log(videoIframe.getAttribute('id'));
  //get current playing video
  // console.log(videoListManager.videoCurrent.id)

  //get id of currentVideo



  // expect

  // expect(videoIframe).toBeDefined();
}, 9000);