// Touch Gestures
import TouchGestures from './touch-gestures';

let scale = 1;
let posX = 0;
let posY = 0;
const lastX = 0;
const lastY = 0;
let maxPosX = 0;
let maxPosY = 0;
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

console.log(`${screenWidth} x ${screenHeight}`);

const tapHandler = (event, options) => {
  const {
    element,
  } = options;

  switch (event.type) {
    case 'doubletap':
      // event.preventDefault();
      // event.stopPropagation();
      // if (scale === 1) {
      //   scale = 1.5;
      //   element.style.webkitTransform = 'translate3d(25%, 25%, 0) scale3d(1.5, 1.5, 1)';
      //   element.parentElement.scrollTop = (element.parentElement.scrollHeight / 5);
      //   element.parentElement.scrollLeft = (element.parentElement.scrollWidth / 5);
      //   element.parentElement.classList.add('allow-overflow');
      // } else {
      //   scale = 1;
      //   element.style.webkitTransform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
      //   element.parentElement.scrollTop = 0;
      //   element.parentElement.scrollLeft = 0;
      //   element.parentElement.classList.remove('allow-overflow');
      // }
      break;

    case 'singletap':
      break;

    default:
      break;
  }
  return true;
};

const swipeNavHandler = (event, options) => {
  // console.log(event.type, event);

  const {
    swipeNav,
  } = options;

  switch (event.type) {
    case 'swipeleft':
      window.location = swipeNav.pageRight;
      break;

    case 'swiperight':
      window.location = swipeNav.pageLeft;
      break;

    default:
      break;
  }
};

const panHandler = (event, options) => {
  console.log(event.type, event);

  const {
    element,
  } = options;

  posX = lastX + event.deltaX;
  posY = lastY + event.deltaY;
  maxPosX = Math.ceil((scale - 1) * (element.clientWidth / 2));
  maxPosY = Math.ceil((scale - 1) * (element.clientHeight / 2));
  if (posX > maxPosX) {
    posX = maxPosX;
  }
  if (posX < -maxPosX) {
    posX = -maxPosX;
  }
  if (posY > maxPosY) {
    posY = maxPosY;
  }
  if (posY < -maxPosY) {
    posY = -maxPosY;
  }
};

const pinchZoomHandler = (event, options) => {
  // console.log(event.type, event, options);

  // Zoom out, decrease scale

};

const addListeners = (options) => {
  const {
    element,
  } = options;

  element.addEventListener('singletap', event => tapHandler(event, options), false);
  element.addEventListener('doubletap', event => tapHandler(event, options), false);
  element.addEventListener('swipeleft', event => swipeNavHandler(event, options), false);
  element.addEventListener('swiperight', event => swipeNavHandler(event, options), false);
  element.addEventListener('panup', event => panHandler(event, options), false);
  element.addEventListener('pandown', event => panHandler(event, options), false);
  element.addEventListener('panleft', event => panHandler(event, options), false);
  element.addEventListener('panright', event => panHandler(event, options), false);
  element.addEventListener('pinchin', event => pinchZoomHandler(event, options), false);
  element.addEventListener('pinchout', event => pinchZoomHandler(event, options), false);
};

const run = (newOptions = {}) => {
  const defaultOptions = {
    element: null,
    stopPropagation: false,
    velocityThreshhold: 1.6,
  };

  const options = Object.assign({}, defaultOptions, newOptions);

  TouchGestures.init(options);

  addListeners(options);
};

export default {
  run,
};
