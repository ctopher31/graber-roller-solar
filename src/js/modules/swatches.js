// Swatches
const lightBox = document.getElementById('lightbox');
const lightBoxImage = document.getElementById('lightbox-image');
const lightBoxCaption = document.getElementById('lightbox-caption');

export const getSwatches = filename => new Promise((resolve, reject) => {
  fetch(filename)
    .then(response => response.json())
    .then(data => resolve(data))
    .catch(err => reject(new Error(err)));
});

export const buildSwatch = (swatch, thumbPath, fullSizepath) => {
  const swatchContainer = document.createElement('div');
  swatchContainer.classList.add('swatch', 'swatch-container');
  const swatchImageContainer = document.createElement('div');
  swatchImageContainer.classList.add('swatch-image-container');
  const swatchImage = document.createElement('img');
  swatchImage.classList.add('swatch-image');
  swatchImage.src = `${thumbPath}/${swatch.filename}`;
  swatchImage.alt = swatch.colorName;
  swatchImage.setAttribute('data-source', `${fullSizepath}/${swatch.filename}`);
  swatchImage.setAttribute('data-color-name', swatch.colorName);
  swatchImage.setAttribute('data-collection-name', swatch.collection);
  swatchImage.setAttribute('data-style', swatch.productLine);
  swatchImage.setAttribute('data-light-control', swatch.lightControl);
  swatchImageContainer.appendChild(swatchImage);
  swatchContainer.appendChild(swatchImageContainer);
  return swatchContainer;
};

export const buildBlurb = (swatch) => {
  const swatchContainer = document.createElement('div');
  swatchContainer.classList.add('swatch', 'swatch-blurb-container');
  const swatchBlurb = document.createElement('p');
  swatchBlurb.classList.add('swatch-blurb');
  swatchBlurb.textContent = swatch.blurb;
  swatchContainer.appendChild(swatchBlurb);
  return swatchContainer;
};

export const swatchClickHandler = (event) => {
  if (event.target.classList.contains('swatch-image')) {
    lightBox.classList.remove('hide');
    lightBoxImage.src = event.target.getAttribute('data-source');
    lightBoxCaption.innerHTML = `${event.target.getAttribute('data-style')}<br>${event.target.getAttribute('data-collection-name')}: ${event.target.getAttribute('data-color-name')}<br>${event.target.getAttribute('data-light-control')}`;
  } else if (event.target.classList.contains('lightbox-image') || event.target.classList.contains('lightbox-caption')) {
    event.stopPropagation();
  } else {
    lightBox.classList.add('hide');
  }
};
