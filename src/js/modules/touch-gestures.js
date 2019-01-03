// Touch Gestures
const Point1 = {
  startX: 0,
  startY: 0,
  lastX: 0,
  lastY: 0,
  deltaX: 0,
  deltaY: 0,
  startTime: null,
  currentTime: null,
  endTime: null,
  duration: 0,
  velocityX: 0,
  velocityY: 0,
};

const Point2 = {
  startX: 0,
  startY: 0,
  lastX: 0,
  lastY: 0,
  deltaX: 0,
  deltaY: 0,
  startTime: null,
  currentTime: null,
  endTime: null,
  duration: 0,
  velocityX: 0,
  velocityY: 0,
};

// Events and The Event Store
let startEvent = {
  point1: Point1,
  point2: Point2,
  event: 'ready',
};

let lastEvent = {
  point1: Point1,
  point2: Point2,
  event: 'ready',
};

const eventStore = [startEvent];

// Save last 10 events in eventStore
const shiftStore = () => {
  while (eventStore.length > 10) {
    eventStore.shift();
  }
};

// The Custom Events
let singleTap;
let doubleTap;
let swipeUp;
let swipeDown;
let swipeLeft;
let swipeRight;
let panUp;
let panDown;
let panLeft;
let panRight;
let pinchIn;
let pinchOut;

// Build the Custom Events
const buildCustomEvents = () => {
  singleTap = new CustomEvent('singletap');
  doubleTap = new CustomEvent('doubletap');
  swipeUp = new CustomEvent('swipeup');
  swipeDown = new CustomEvent('swipedown');
  swipeLeft = new CustomEvent('swipeleft');
  swipeRight = new CustomEvent('swiperight');
  panUp = new CustomEvent('panup');
  panDown = new CustomEvent('pandown');
  panLeft = new CustomEvent('panleft');
  panRight = new CustomEvent('panright');
  pinchIn = new CustomEvent('pinchin');
  pinchOut = new CustomEvent('pinchout');
};

// Set the New Event Points
const setTouchStartPoints = (event, obj) => {
  if (event.changedTouches[0]) {
    obj.point1.startX = event.changedTouches[0].pageX;
    obj.point1.startY = event.changedTouches[0].pageY;
    obj.point1.startTime = Date.now();
  }
  if (event.changedTouches[1]) {
    obj.point2.startX = event.changedTouches[1].pageX;
    obj.point2.startY = event.changedTouches[1].pageY;
    obj.point2.startTime = Date.now();
  }
  return obj;
};

const updateTouchPoints = (event, obj) => {
  if (event.changedTouches.length > 0) {
    obj.point1.lastX = event.changedTouches[0].pageX;
    obj.point1.lastY = event.changedTouches[0].pageY;
    obj.point1.deltaX = obj.point1.lastX - startEvent.point1.startX;
    obj.point1.deltaY = obj.point1.lastY - startEvent.point1.startY;
    obj.point1.endTime = Date.now();
    obj.point1.duration = Math.abs(obj.point1.endTime - startEvent.point1.startTime);
    obj.point1.velocityX = Math.abs(obj.point1.deltaX / obj.point1.duration);
    obj.point1.velocityY = Math.abs(obj.point1.deltaY / obj.point1.duration);
  }
  if (event.changedTouches.length > 1) {
    obj.point2.lastX = event.changedTouches[1].pageX;
    obj.point2.lastY = event.changedTouches[1].pageY;
    obj.point2.deltaX = obj.point2.lastX - startEvent.point2.startX;
    obj.point2.deltaY = obj.point2.lastY - startEvent.point2.startY;
    obj.point2.endTime = Date.now();
    obj.point2.duration = Math.abs(obj.point2.endTime - startEvent.point2.startTime);
    obj.point2.velocityX = Math.abs(obj.point2.deltaX / obj.point2.duration);
    obj.point2.velocityY = Math.abs(obj.point2.deltaY / obj.point2.duration);
  }
  return obj;
};

const touchStartHandler = (event, options) => {
  // console.log('Touchstart');

  const {
    stopPropagation,
  } = options;

  if (stopPropagation) {
    event.stopPropagation();
    return;
  }

  let currentEvent = {
    point1: Object.create(Point1),
    point2: Object.create(Point2),
    event: 'touchstart',
  };

  currentEvent = setTouchStartPoints(event, currentEvent);

  startEvent = currentEvent;

  if (eventStore.length > 10) {
    shiftStore();
    eventStore.push(currentEvent);
  } else {
    eventStore.push(currentEvent);
  }
  // console.log('Event Store ', eventStore);
};

const touchMoveHandler = (event, options) => {
  console.log('Touchmove');
  console.log(startEvent);
  console.log(lastEvent);

  const {
    element,
    stopPropagation,
  } = options;

  if (stopPropagation) {
    event.stopPropagation();
    return;
  }

  let currentEvent = {
    point1: Object.create(Point1),
    point2: Object.create(Point2),
    event: 'touchmove',
  };

  currentEvent = updateTouchPoints(event, currentEvent);

  if (event.changedTouches.length === 1) {
    // Pan
    if (currentEvent.point1.velocityX < options.velocityThreshhold && currentEvent.point1.velocityY < options.velocityThreshhold) {
      // Pan Up
      if (
        (currentEvent.point1.deltaY < -10 && currentEvent.point1.deltaX < -1 && currentEvent.point1.deltaY < currentEvent.point1.deltaX)
        || (currentEvent.point1.deltaY < -10 && currentEvent.point1.deltaX > 1 && Math.abs(currentEvent.point1.deltaY) > currentEvent.point1.deltaX)
      ) {
        element.dispatchEvent(panUp);
        currentEvent.event = 'panup';
        console.log(currentEvent);
        eventStore.push(currentEvent);
      }

      // Pan Down
      if (
        (currentEvent.point1.deltaY > 10 && currentEvent.point1.deltaX > 1 && currentEvent.point1.deltaY > currentEvent.point1.deltaX)
        || (currentEvent.point1.deltaY > 10 && currentEvent.point1.deltaX < -1 && currentEvent.point1.deltaY > Math.abs(currentEvent.point1.deltaX))
      ) {
        element.dispatchEvent(panDown);
        currentEvent.event = 'pandown';
        console.log(currentEvent);
        eventStore.push(currentEvent);
      }

      // Pan Left
      if (
        (currentEvent.point1.deltaX < -10 && currentEvent.point1.deltaY < -1 && currentEvent.point1.deltaX < currentEvent.point1.deltaY)
        || (currentEvent.point1.deltaX < -10 && currentEvent.point1.deltaY > 1 && Math.abs(currentEvent.point1.deltaX) > currentEvent.point1.deltaY)
      ) {
        element.dispatchEvent(panLeft);
        currentEvent.event = 'panleft';
        console.log(currentEvent);
        eventStore.push(currentEvent);
      }

      // Pan Right
      if (
        (currentEvent.point1.deltaX > 10 && currentEvent.point1.deltaY > 1 && currentEvent.point1.deltaX > currentEvent.point1.deltaY)
        || (currentEvent.point1.deltaX > 10 && currentEvent.point1.deltaY < -1 && currentEvent.point1.deltaX > Math.abs(currentEvent.point1.deltaY))
      ) {
        element.dispatchEvent(panRight);
        currentEvent.event = 'panright';
        console.log(currentEvent);
        eventStore.push(currentEvent);
      }
    }
  }

  // Pinch
  if (event.changedTouches.length > 1) {

    // element.dispatchEvent(pinchIn);
    // element.dispatchEvent(pinchOut);
  }

  if (eventStore.length > 10) {
    shiftStore();
  }
  eventStore.push(currentEvent);
  lastEvent = currentEvent;
  // console.log('Event Store ', eventStore);
};

const touchEndHandler = (event, options) => {
  // console.log('Touchend');

  const {
    element,
    stopPropagation,
  } = options;

  if (stopPropagation) {
    event.stopPropagation();
    return;
  }

  let currentEvent = {
    point1: Object.create(Point1),
    point2: Object.create(Point2),
    event: 'touchend',
  };

  currentEvent = updateTouchPoints(event, currentEvent);

  if (!eventStore[eventStore.length - 1].event === 'touchstart') {
    currentEvent = lastEvent;
  }

  if (event.changedTouches.length === 1) {
    // Tap
    if (eventStore[eventStore.length - 1].event === 'touchstart') {
      if (currentEvent.point1.deltaX < 10 && currentEvent.point1.deltaX > -10 && currentEvent.point1.deltaY < 10 && currentEvent.point1.deltaY > -10) {
        if (eventStore[eventStore.length - 2] && eventStore[eventStore.length - 2].event === 'singletap' && (currentEvent.point1.endTime - eventStore[eventStore.length - 2].point1.endTime) < 300) {
          element.dispatchEvent(doubleTap);
          currentEvent.event = 'doubletap';
        } else {
          element.dispatchEvent(singleTap);
          currentEvent.event = 'singletap';
        }
      }
    }

    // Swipe - Vertical
    if (currentEvent.point1.velocityY > options.velocityThreshhold && currentEvent.point1.velocityX < options.velocityThreshhold) {
      if (currentEvent.point1.deltaY < -120 && Math.abs(currentEvent.point1.deltaX) < options.swipeThreshhold) {
        // Swipe Up
        element.dispatchEvent(swipeUp);
        currentEvent.event = 'swipeup';
      } else if (currentEvent.point1.deltaY > 120 && currentEvent.point1.deltaX > -60 && currentEvent.point1.deltaX < 60) {
        // Swipe Down
        element.dispatchEvent(swipeDown);
        currentEvent.event = 'swipedown';
      }
    }

    // Swipe - Horizontal
    if (currentEvent.point1.velocityX > options.velocityThreshhold && currentEvent.point1.velocityY < options.velocityThreshhold) {
      if (currentEvent.point1.deltaX < -120 && currentEvent.point1.deltaY > -60 && currentEvent.point1.deltaY < 60) {
        // Swipe Left
        element.dispatchEvent(swipeLeft);
        currentEvent.event = 'swipeleft';
      } else if (currentEvent.point1.deltaX > 120 && currentEvent.point1.deltaY > -60 && currentEvent.point1.deltaY < 60) {
        // Swipe Right
        element.dispatchEvent(swipeRight);
        currentEvent.event = 'swiperight';
      }
    }
  }

  // Pinch
  if (event.changedTouches.length > 1) {

    // element.dispatchEvent(pinchIn);
    // element.dispatchEvent(pinchOut);
  }

  if (eventStore.length > 10) {
    shiftStore();
    if (!eventStore[eventStore.length - 1].event === 'touchstart') {
      eventStore.pop();
    }
    eventStore.push(currentEvent);
  } else {
    if (!eventStore[eventStore.length - 1].event === 'touchstart') {
      eventStore.pop();
    }
    eventStore.push(currentEvent);
  }
  lastEvent = currentEvent;
  // console.log('Event Store ', eventStore);
};

const addListeners = (options) => {
  const {
    element,
  } = options;

  element.addEventListener('touchstart', event => touchStartHandler(event, options), false);
  element.addEventListener('touchmove', event => touchMoveHandler(event, options), false);
  element.addEventListener('touchend', event => touchEndHandler(event, options), false);
};

const init = (newOptions = {}) => {
  let options = {
    element: null,
    stopPropagation: false,
    velocityThreshhold: 1.6,
  };

  options = Object.assign(options, newOptions);
  buildCustomEvents();
  addListeners(options);

  // console.log('Event Store: ', eventStore);
};

export default {
  init,
};
