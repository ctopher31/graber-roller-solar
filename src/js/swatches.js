// Swatches
import { getSwatches, buildSwatch, swatchClickHandler } from './modules/swatches';

const path = 'assets/images/swatches';
const swatchGallery = document.getElementById('swatches');
const loader = document.getElementById('loader');

const filterDeck = ['All', 'All'];

export const filterItems = (filterDeck, items) => items.reduce((accum, item) => [...accum, ...Object.keys(item).filter(key => filterDeck.every(filterItem => item[key] === filterItem))], []);

export default () => {
  getSwatches('assets/js/graber-roller-solar-swatches.json')
    .then((swatches) => {
      swatches.map((swatch) => {
        const swatchContainer = buildSwatch(swatch, `${path}/300x300`, `${path}/1000x1000`);
        swatchGallery.appendChild(swatchContainer);
        return false;
      });

      setTimeout(() => {
        swatchGallery.scrollTop = 0;
      }, 50);

      let swatchContainers = document.querySelectorAll('.swatch--inner-container');
      [].map.call(swatchContainers, container => container.addEventListener('click', swatchClickHandler, false));

      const productFilters = document.querySelectorAll('.product-filter');
      [].map.call(productFilters, filter => filter.addEventListener('click', (event) => {
        event.stopPropagation();
        [].map.call(productFilters, flt => flt.classList.remove('selected'));
        event.target.classList.add('selected');
        filterDeck[0] = event.target.getAttribute('data-option-value');
        [].map.call(swatchContainers, container => container.removeEventListener('click', swatchClickHandler, false));
        while (swatchGallery.children.length > 0) {
          swatchGallery.removeChild(swatchGallery.firstElementChild);
        }
        let filteredSwatches;
        if (filterDeck[0] === 'All' && filterDeck[1] === 'All') {
          filteredSwatches = swatches;
        } else if (filterDeck[0] !== 'All' && filterDeck[1] === 'All') {
          filteredSwatches = swatches.filter(swatch => swatch.productLine === filterDeck[0]);
        } else if (filterDeck[0] === 'All' && filterDeck[1] !== 'All') {
          filteredSwatches = swatches.filter(swatch => swatch.newSwatch === true);
        } else {
          filteredSwatches = swatches.filter(swatch => swatch.productLine === filterDeck[0] && swatch.newSwatch === true);
        }
        swatchGallery.classList.add('hide');
        loader.classList.add('show');
        setTimeout(() => {
          loader.classList.remove('show');
          swatchGallery.classList.remove('hide');
        }, 500);
        filteredSwatches.map((swatch) => {
          const swatchContainer = buildSwatch(swatch, `${path}/300x300`, `${path}/1000x1000`);
          swatchGallery.appendChild(swatchContainer);
          return false;
        });
        swatchContainers = document.querySelectorAll('.swatch--inner-container');
        [].map.call(swatchContainers, container => container.addEventListener('click', swatchClickHandler, false));
      }, false));

      const swatchFilters = document.querySelectorAll('.swatch-filter');
      [].map.call(swatchFilters, filter => filter.addEventListener('click', (event) => {
        event.stopPropagation();
        [].map.call(swatchFilters, flt => flt.classList.remove('selected'));
        event.target.classList.add('selected');
        filterDeck[1] = event.target.getAttribute('data-option-value');
        [].map.call(swatchContainers, container => container.removeEventListener('click', swatchClickHandler, false));
        while (swatchGallery.children.length > 0) {
          swatchGallery.removeChild(swatchGallery.firstElementChild);
        }
        let filteredSwatches;
        if (filterDeck[0] === 'All' && filterDeck[1] === 'All') {
          filteredSwatches = swatches;
        } else if (filterDeck[0] !== 'All' && filterDeck[1] === 'All') {
          filteredSwatches = swatches.filter(swatch => swatch.productLine === filterDeck[0]);
        } else if (filterDeck[0] === 'All' && filterDeck[1] !== 'All') {
          filteredSwatches = swatches.filter(swatch => swatch.newSwatch === true);
        } else {
          filteredSwatches = swatches.filter(swatch => swatch.productLine === filterDeck[0] && swatch.newSwatch === true);
        }
        swatchGallery.classList.add('hide');
        loader.classList.add('show');
        setTimeout(() => {
          loader.classList.remove('show');
          swatchGallery.classList.remove('hide');
        }, 500);
        filteredSwatches.map((swatch) => {
          const swatchContainer = buildSwatch(swatch, `${path}/300x300`, `${path}/1000x1000`);
          swatchGallery.appendChild(swatchContainer);
          return false;
        });
        swatchContainers = document.querySelectorAll('.swatch--inner-container');
        [].map.call(swatchContainers, container => container.addEventListener('click', swatchClickHandler, false));
      }, false));
    })
    .catch(err => new Error(err));
};
