// Gallery
const path = 'assets/images/roomscenes';
const rollerGallery = document.getElementById('roller-gallery');
const solarGallery = document.getElementById('solar-gallery');
const lightBox = document.getElementById('lightbox');
const lightBoxInnerContainer = document.getElementById('lightbox-inner-container');
const lightBoxLeft = document.getElementById('lightbox-left');
const lightBoxRight = document.getElementById('lightbox-right');
const lightBoxList = document.getElementById('lightbox-list');

const getImages = () => new Promise((resolve, reject) => {
  fetch('assets/js/gallery.json')
    .then(response => response.json())
    .then(data => resolve(data))
    .catch(err => reject(new Error(err)));
});

const animateSlides = ({ timing, draw, duration }) => {
  const start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    const progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
};

const stopEvent = (event) => {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

const imageClickHandler = (event) => {
  const lightBoxItem = document.createElement('div');
  lightBoxItem.classList.add('lightbox-item');
  lightBoxItem.innerHTML = (
    `<div class="lightbox-image-container">
      <img class="lightbox-image" src="${event.target.src}" alt="${event.target.alt}" />
    </div>
    <figcaption class="lightbox-caption">${event.target.alt}</figcaption>`
  );
  lightBoxList.appendChild(lightBoxItem);
  lightBox.classList.remove('hide');
  return false;
};

export default () => {
  getImages()
    .then((images) => {
      images.map((image) => {
        const listItem = document.createElement('div');
        listItem.classList.add('gallery-list-item');
        const container = document.createElement('div');
        container.classList.add('gallery-image-container');
        const img = document.createElement('img');
        img.src = `${path}/${image.filename}`;
        img.alt = image.caption;
        img.classList.add('gallery-image');
        container.appendChild(img);
        listItem.appendChild(container);
        img.addEventListener('click', imageClickHandler, false);
        if (image.productline === 'Roller Shades') {
          rollerGallery.appendChild(listItem);
        } else if (image.productline === 'Solar Shades') {
          solarGallery.appendChild(listItem);
        }
        return false;
      });

      const leftButtonHandler = () => {
        lightBoxLeft.removeEventListener('click', leftButtonHandler, false);
        lightBoxLeft.addEventListener('click', stopEvent, false);
        const lightBoxItem = document.createElement('div');
        lightBoxItem.classList.add('lightbox-item');

        const currentItems = document.querySelectorAll('.lightbox-item');
        const currentImages = document.querySelectorAll('.lightbox-image');
        let currentIndex;
        if (currentImages !== undefined) {
          currentIndex = images.findIndex(image => image.filename === currentImages[0].src.split('/').slice(-1)[0].replace('%20', ' '));
        }

        if (currentIndex === 0) {
          currentIndex = images.length;
        }

        lightBoxItem.innerHTML = (
          `<div class="lightbox-image-container">
            <img class="lightbox-image" src="${path}/${images[currentIndex - 1].filename}" alt="${images[currentIndex - 1].caption}" />
          </div>
          <figcaption class="lightbox-caption">${images[currentIndex - 1].caption}</figcaption>`
        );
        lightBoxList.insertBefore(lightBoxItem, lightBoxList.firstElementChild);
        currentItems[0].style.width = `${currentItems[0].clientWidth}px`;
        lightBoxItem.style.width = `${currentItems[0].clientWidth}px`;
        lightBoxList.style.width = `${currentItems[0].clientWidth * 2}px`;
        lightBoxList.style.transform = `translateX(-${currentItems[0].clientWidth}px)`;
        animateSlides({
          duration: 700,
          timing: t => (t < 0.5 ? 4 * (t ** 3) : ((t - 1) * ((2 * t) - 2) * ((2 * t) - 2)) + 1),
          // t => (1−t)3P1 + 3(1−t)2tP2 +3(1−t)t2P3 + t3P4)
          draw: (progress) => {
            lightBoxList.style.transform = `translateX(${-currentItems[0].clientWidth + (progress * currentItems[0].clientWidth)}px)`;
          },
        });
        setTimeout(() => {
          lightBoxList.removeChild(lightBoxList.lastElementChild);
          lightBoxList.style.transform = 'translateX(0)';
          lightBoxList.style.width = '100%';
          lightBoxLeft.removeEventListener('click', stopEvent, false);
          lightBoxLeft.addEventListener('click', leftButtonHandler, false);
        }, 750);
      };

      const rightButtonHandler = () => {
        lightBoxRight.removeEventListener('click', rightButtonHandler, false);
        lightBoxRight.addEventListener('click', stopEvent, false);
        const lightBoxItem = document.createElement('div');
        lightBoxItem.classList.add('lightbox-item');

        const currentItems = document.querySelectorAll('.lightbox-item');
        const currentImages = document.querySelectorAll('.lightbox-image');
        let currentIndex;
        if (currentImages !== undefined) {
          currentIndex = images.findIndex(image => image.filename === currentImages[0].src.split('/').slice(-1)[0].replace('%20', ' '));
        }

        if (currentIndex === (images.length - 1)) {
          currentIndex = -1;
        }

        lightBoxItem.innerHTML = (
          `<div class="lightbox-image-container">
            <img class="lightbox-image" src="${path}/${images[currentIndex + 1].filename}" alt="${images[currentIndex + 1].caption}" />
          </div>
          <figcaption class="lightbox-caption">${images[currentIndex + 1].caption}</figcaption>`
        );
        lightBoxList.appendChild(lightBoxItem);
        currentItems[0].style.width = `${currentItems[0].clientWidth}px`;
        lightBoxItem.style.width = `${currentItems[0].clientWidth}px`;
        lightBoxList.style.width = `${currentItems[0].clientWidth * 2}px`;
        lightBoxList.style.transform = 'translateX(0)';
        animateSlides({
          duration: 700,
          timing: t => (t < 0.5 ? 4 * (t ** 3) : ((t - 1) * ((2 * t) - 2) * ((2 * t) - 2)) + 1), // t => Math.pow(t, 2),
          draw: (progress) => {
            lightBoxList.style.transform = `translateX(${0 - (progress * currentItems[0].clientWidth)}px)`;
          },
        });
        setTimeout(() => {
          lightBoxList.removeChild(lightBoxList.firstElementChild);
          lightBoxList.style.transform = 'translateX(0)';
          lightBoxList.style.width = '100%';
          lightBoxRight.removeEventListener('click', stopEvent, false);
          lightBoxRight.addEventListener('click', rightButtonHandler, false);
        }, 750);
      };

      lightBoxInnerContainer.addEventListener('click', (event) => {
        event.stopPropagation();
        return false;
      });

      lightBox.addEventListener('click', (event) => {
        event.stopPropagation();
        while (lightBoxList.children.length > 0) {
          lightBoxList.removeChild(lightBoxList.lastElementChild);
        }
        lightBox.classList.add('hide');
        return false;
      });

      lightBoxLeft.addEventListener('click', leftButtonHandler, false);
      lightBoxRight.addEventListener('click', rightButtonHandler, false);
    })
    .catch(err => new Error(err));
};
