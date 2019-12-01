// Swatches
import { getSwatches, buildSwatch, buildBlurb, swatchClickHandler } from './modules/swatches';

const path = '../assets/images/swatches';
const swatchGallery = document.getElementById('swatches');

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
    })
    .catch(err => new Error(err));
};
