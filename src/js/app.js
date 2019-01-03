// App
import FastClick from 'fastclick';
import Touches from './modules/touch';
import { setCookie, getCookie } from './modules/doc-cookies';
import Gallery from './modules/gallery';
import SheerLayeredSwatchGallery from './sheer-layered-swatches';
import CellularPleatedSwatchGallery from './cellular-pleated-swatches';

let timeoutId;
const timeout = 600000;

const SwipeNav = {
  pageLeft: 'Left',
  pageRight: 'Right',
};

const setSwipeNav = () => {
  // prepare swipe navigation
  SwipeNav.pageLeft = document.body.getAttribute('data-page-left');
  SwipeNav.pageRight = document.body.getAttribute('data-page-right');
};

export const playVideo = () => {
  const video = document.getElementById('video');
  const videotime = getCookie('videotime');
  if (parseInt(videotime, 10) > 0) {
    video.currentTime = videotime;
  }
  video.parentElement.classList.add('video-active');
  video.play();
};

window.playVideo = playVideo;

export const pauseVideo = () => {
  const video = document.getElementById('video');
  setCookie('videotime', video.currentTime, 30);
  video.parentElement.classList.remove('video-active');
  video.pause();
};

window.pauseVideo = pauseVideo;

const runTimer = () => {
  timeoutId = window.setTimeout(playVideo, timeout);
};

const resetTimer = (event) => {
  if (!event.target.classList.contains('.video')) {
    window.clearTimeout(timeoutId);
    runTimer();
  }
};

const runPlayer = () => {
  const video = document.getElementById('video');
  video.parentElement.addEventListener('touchstart', (event) => {
    event.preventDefault();
    pauseVideo();
  }, false);
};

const loadPdf = (event) => {
  cordova.InAppBrowser.open(event.target.getAttribute('data-href'), '_blank', 'location=no');
};

const run = () => {
  setSwipeNav();

  const pageLeft = document.getElementById('page-left');
  if (pageLeft) {
    pageLeft.addEventListener('click', () => {
      window.location = SwipeNav.pageLeft;
    });
  }

  const pageRight = document.getElementById('page-right');
  if (pageRight) {
    pageRight.addEventListener('click', () => {
      window.location = SwipeNav.pageRight;
    });
  }

  const content = document.querySelector('.content-container');
  const contentTouch = Object.create(Touches);
  contentTouch.run({
    element: content,
    swipeNav: SwipeNav,
  });

  // Inactive Video Player
  document.addEventListener('touchstart', resetTimer, false);
  document.addEventListener('DOMContentLoaded', runPlayer, false);
  runTimer();

  if (document.getElementById('play-button')) {
    const playButton = document.getElementById('play-button');
    playButton.addEventListener('click', (event) => {
      event.preventDefault();
      playVideo();
    }, false);
  }

  document.addEventListener('unload', (event) => {
    event.preventDefault();
    pauseVideo();
  }, false);

  // Cellular/Pleated 4 Opacity Options
  const buttons = document.querySelectorAll('.option-button');
  const selectedImage = document.getElementById('selected-option-image');

  [].map.call(buttons, button => button.addEventListener('click', (event) => {
    [].map.call(buttons, item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');
    selectedImage.src = event.currentTarget.getAttribute('data-image');
  }));

  // Sheer/Layered 2 Videos
  const posters = document.querySelectorAll('.poster-container');
  [].map.call(posters, poster => poster.addEventListener('click', (event) => {
    [].map.call(posters, (item) => {
      item.previousElementSibling.pause();
      // item.previousElementSibling.classList.add('hide');
      // item.classList.remove('hide');
    });
    event.currentTarget.classList.add('hide');
    event.currentTarget.previousElementSibling.classList.remove('hide');
    event.currentTarget.previousElementSibling.play();
  }));

  const sl2Videos = document.querySelectorAll('.sl-2-video');
  [].map.call(sl2Videos, video => video.addEventListener('play', () => {
    [].map.call(sl2Videos, (item) => {
      if (video.id !== item.id) {
        item.pause();
      }
    });
  }));

  if (document.getElementById('gallery')) {
    Gallery();
  }

  if (document.getElementById('sheer-layered-swatches')) {
    console.log('There here');
    SheerLayeredSwatchGallery();
  }

  if (document.getElementById('cellular-pleated-swatches')) {
    CellularPleatedSwatchGallery();
  }
};

const app = {

  // Application Constructor
  initialize() {
    this.bindEvents();
  },

  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady() {
    if (document.getElementById('swatch-collections-link')) {
      const pdfLink = document.getElementById('swatch-collections-link');
      pdfLink.addEventListener('click', loadPdf, false);
    }
  },
};

app.initialize();
FastClick.attach(document.body, {});
run();
