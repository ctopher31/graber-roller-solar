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
  event.preventDefault();
  cordova.InAppBrowser.open(event.target.getAttribute('data-href'), '_blank', 'location=no,toolbar=yes,toolbarposition=bottom,enableViewportScale=yes');
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
    const sortButton = document.getElementById('sort-button');
    const sortIcon = document.getElementById('sort-icon');
    const filterSection = document.getElementById('collections-filter');
    document.addEventListener('click', (event) => {
      event.stopPropagation();
      filterSection.classList.remove('open');
      sortIcon.classList.remove('flip');
    });
    filterSection.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    sortButton.addEventListener('click', (event) => {
      event.stopPropagation();
      filterSection.classList.toggle('open');
      sortIcon.classList.toggle('flip');
    });
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
    if (document.getElementById('home')) {
      const catalog = document.getElementById('catalog');
      catalog.addEventListener('click', loadPdf);

      const guide = document.getElementById('trend-guide');
      guide.addEventListener('click', loadPdf);
    }
  },
};

app.initialize();
FastClick.attach(document.body, {});
run();
