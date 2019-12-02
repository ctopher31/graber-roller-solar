// Swatches
import { getSwatches, buildSwatch, buildBlurb, swatchClickHandler } from './modules/swatches';

const path = '../assets/images/swatches';
const swatchGallery = document.getElementById('swatches');

export const filterItems = (filterDeck, items) => items.reduce((accum, item) => [...accum, ...Object.keys(item).filter(key => filterDeck.every(filterItem => item[key] === filterItem))], []);

export default () => {
  getSwatches('../assets/js/graber-roller-solar-swatches.json')
    .then((swatches) => {
      swatches.map((swatch) => {
        let swatchContainer;
        if (swatch.type === 'swatch-blurb') {
          swatchContainer = buildBlurb(swatch);
        } else {
          swatchContainer = buildSwatch(swatch, `${path}/300x300`, `${path}/600x600`);
        }
        swatchGallery.appendChild(swatchContainer);
        return false;
      });

      setTimeout(() => {
        swatchGallery.scrollTop = 0;
      }, 50);

      document.addEventListener('click', swatchClickHandler, false);
      let filterDeck = [];
      const filters = document.querySelectorAll('.filter');
      console.log(filters);
      [].map.call(filters, filter => filter.addEventListener('change', () => {
        console.log('Change');
        [].map.call(swatchGallery.children, () => {
          while (swatchGallery.firstElementChild) {
            swatchGallery.removeChild(swatchGallery.firstElementChild);
          }
        });
        // filterDeck = [...[].filter.call(filters, filterItem => (filterItem.selected ? filterItem.getAttribute('data-value') : false))];
        // const items = filterItems(filterDeck, swatches);
        // items.map((swatch) => {
        //   const swatchContainer = buildSwatch(swatch, `${path}/300x300`, `${path}/600x600`);
        //   swatchGallery.appendChild(swatchContainer);
        // });
      }, false));
    })
    .catch(err => new Error(err));
};
