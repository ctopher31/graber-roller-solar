// Cellular Pleated Swatches
import { getSwatches, buildSwatch, buildBlurb, swatchClickHandler } from './modules/swatches';

const path = '../assets/images/swatches';
const gallery1 = document.getElementById('swatches-1');
const gallery2 = document.getElementById('swatches-2');
const gallery3 = document.getElementById('swatches-3');
const gallery4 = document.getElementById('swatches-4');

export default () => {
  getSwatches('../assets/js/cellular-pleated.json')
    .then((swatches) => {
      swatches.map((swatch, index) => {
        let swatchContainer;
        if (swatch.type === 'swatch-blurb') {
          swatchContainer = buildBlurb(swatch);
        } else {
          swatchContainer = buildSwatch(swatch, `${path}/cellular-pleated/210x210`, `${path}/cellular-pleated/600x600`);
        }
        if (index < 16) {
          gallery1.appendChild(swatchContainer);
        } else if (index >= 16 && index < 32) {
          gallery2.appendChild(swatchContainer);
        } else if (index >= 32 && index < 53) {
          gallery3.appendChild(swatchContainer);
        } else {
          gallery4.appendChild(swatchContainer);
        }
        return false;
      });

      setTimeout(() => {
        gallery1.scrollTop = 75;
        gallery2.scrollTop = 0;
        gallery3.scrollTop = 0;
        gallery4.scrollTop = 75;
      }, 300);

      document.addEventListener('click', swatchClickHandler, false);
    })
    .catch(err => new Error(err));
};
