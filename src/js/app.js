// App
import FastClick from 'fastclick';
import Touches from './modules/touch';
import Gallery from './modules/gallery';
import SwatchGallery from './swatches';

const SwipeNav = {
  pageLeft: 'Left',
  pageRight: 'Right',
};

const setSwipeNav = () => {
  // prepare swipe navigation
  SwipeNav.pageLeft = document.body.getAttribute('data-page-left');
  SwipeNav.pageRight = document.body.getAttribute('data-page-right');
};

const loadPdf = (event) => {
  cordova.InAppBrowser.open(event.target.getAttribute('data-href'), '_blank', 'location=no');
};

const run = () => {
  if (navigator.userAgent.match(/Android/i)) {
    document.body.classList.add('android');
  }
  if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
    document.body.classList.add('ios');
  }

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

  if (document.getElementById('gallery')) {
    Gallery();
  }

  if (document.getElementById('swatches')) {
    SwatchGallery();
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
