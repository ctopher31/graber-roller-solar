// Swatches
import { getSwatches, buildSwatch, buildBlurb, swatchClickHandler } from './modules/swatches';

const path = '../assets/images/swatches';
const sheerGallery = document.getElementById('sheer-swatches');
const layeredGallery = document.getElementById('layered-swatches');

export default () => {
  getSwatches('../assets/js/sheer-layered.json')
    .then((swatches) => {
      swatches.map((swatch) => {
        let swatchContainer;
        if (swatch.type === 'swatch-blurb') {
          swatchContainer = buildBlurb(swatch);
        } else {
          swatchContainer = buildSwatch(swatch, `${path}/sheer-layered/210x210`, `${path}/sheer-layered/600x600`);
        }
        if (swatch.productLine === 'Sheer Shades') {
          sheerGallery.appendChild(swatchContainer);
        }
        if (swatch.productLine === 'Layered Shades') {
          layeredGallery.appendChild(swatchContainer);
        }
        return false;
      });

      setTimeout(() => {
        sheerGallery.scrollTop = 100;
        layeredGallery.scrollTop = 0;
      }, 50);

      document.addEventListener('click', swatchClickHandler, false);
    })
    .catch(err => new Error(err));
};
