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
  const newTag = '<p class="new-tag">New</p>';
  swatchContainer.innerHTML = (
    `<div class="swatch--inner-container">
      ${(swatch.newSwatch ? newTag : '')}
      <div class="swatch-image-container">
        <img class="swatch-image" src="${thumbPath}/${swatch.filename}" alt="${swatch.colorName}" data-source="${fullSizepath}/${swatch.filename}" data-color-name="${swatch.colorName}" data-collection-name="${swatch.collection}" data-style="${swatch.productLine}" data-light-control="${swatch.lightControl}" />
      </div>
      <ul class="swatch-info--list">
        <li class="swatch-info--list-item color-name">${swatch.colorName}</li>
        <li class="swatch-info--list-item color-number-collection-name">${swatch.colorNumber}<br>${swatch.collection}</li>
        <li class="swatch-info--list-item productline">${swatch.productLine}</li>
      </div>
    </div>`
  );
  return swatchContainer;
};

const lightBoxHandler = (event) => {
  if (event.target.classList.contains('swatch-lightbox-image') || event.target.classList.contains('swatch-lightbox-caption')) {
    event.stopPropagation();
  } else {
    lightBox.classList.add('hide');
    document.removeEventListener('click', lightBoxHandler, false);
  }
};

export const swatchClickHandler = (event) => {
  event.stopPropagation();
  const sortIcon = document.getElementById('sort-icon');
  const filterSection = document.getElementById('collections-filter');
  filterSection.classList.remove('open');
  sortIcon.classList.remove('flip');
  lightBox.classList.remove('hide');
  const image = event.currentTarget.querySelector('.swatch-image');
  lightBoxImage.src = image.getAttribute('data-source');
  lightBoxCaption.innerHTML = `${image.getAttribute('data-style')}<br>${image.getAttribute('data-collection-name')} : ${image.getAttribute('data-color-name')}<br>${image.getAttribute('data-light-control')}`;

  document.addEventListener('click', lightBoxHandler, false);
};
