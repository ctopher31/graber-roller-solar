// Index Spec
import {after, afterEach, before, beforeEach, describe, it} from 'mocha';
import chai from 'chai';
import ChaiDom from './chai-jsdom';
import sinon from 'sinon';
import {JSDOM} from 'jsdom';
import SwatchGallery from '../src/js/modules/swatch-gallery';

const expect = chai.expect;
chai.use(ChaiDom.run);
const jsdomOptions = {
  runScripts: 'dangerously',
};
let DOM;
let window;
let document;
let counter = 0;

describe('Swatch Gallery', function () {

  before(function () {
    return JSDOM.fromFile('./tests/test-templates/swatch-gallery.spec.html', jsdomOptions)
      .then((dom) => {
        DOM = dom;
        window = dom.window;
        document = window.document;
        ChaiDom.setDomContext(DOM);
      });
  });
  beforeEach(function () {
    // return JSDOM.fromFile('./test/testrunner.html', jsdomOptions)
    //   .then((dom) => {
    //     window = dom.window;
    //     document = window.document;
    //   });
  });
  after(function () {
    counter = 0;
    window.close();
    window = '';
  });
  afterEach(function () {
    // window.close();
  });

  describe('Get the list of swatch links', function () {
    it('expect a list of the swatch links: NodeList converted to Array so we can check instance', function () {
      console.log(document.querySelector('h1').textContent + ` | Test ${++counter}`);
      console.log(ChaiDom.getDomContext().serialize());
      let swatchLinks = Array.prototype.slice.call(document.querySelectorAll('.swatch-link'));
      console.log(swatchLinks);
      console.log(swatchLinks instanceof Array);
      expect(swatchLinks).to.be.instanceof(Array);
    });
    it('expect correct length', function () {
      console.log(document.querySelector('h1').textContent + ` | Test ${++counter}`);
      let swatchLinks = Array.prototype.slice.call(document.querySelectorAll('.swatch-link'));
      expect(swatchLinks).to.have.length(3);
    });
    it('expect correct classname', function () {
      console.log(document.querySelector('h1').textContent + ` | Test ${++counter}`);
      let swatchLinks = document.querySelectorAll('.swatch-link');
      console.log(swatchLinks[0].classList);
      let className = swatchLinks[0].classList;
      expect(swatchLinks).to.have.class('swatch-link');
    });
  });

  describe('Set the swatch image source', function () {
    it('', function () {
      console.log(document.querySelector('h1').textContent + ` | Test ${++counter}`);

      expect(setImageSource(imageElement, src)).to.be.instanceof(Array);
    });
  });

});
