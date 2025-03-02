// utils.js
export function normaliserTexte(texte) {
    return texte.replace(/[+J?Zz¥§;:&%gsSoO£9A]/g, (match) => {
      return { '+': '1', 'J': '1', '?': '7', 'Z': '7', 'z': '7', '¥': '7', '§': '8', ';': '1',
               ':': '1', '&': '2', '%': '2', 'g': '2', 's': '5', 'S': '5', 'o': '0', 'O': '0',
               '£': '29', '9A': '94' }[match] || match;
    });
  }
  
  export function extractNumber(text) {
    const matches = text.match(/\d+/);
    return matches ? parseInt(matches[0]) : 0;
  }
  
  export function filterElementsWithPositionAndDisplay(elements, left, top, display) {
    return [...elements].filter(el => {
      const style = window.getComputedStyle(el);
      return style.left === left && style.top === top && style.display === display;
    });
  }
  
  export function findHighestZIndexElement(elements) {
    return elements.reduce((maxEl, el) => {
      const zIndex = parseInt(window.getComputedStyle(el).zIndex) || -Infinity;
      return zIndex > (parseInt(window.getComputedStyle(maxEl).zIndex) || -Infinity) ? el : maxEl;
    }, elements[0]);
  }
  
  export function isMatchingNumber(text, target) {
    const cleanedText = text.replace(/\D/g, '');
    if (cleanedText.length === 3) {
      return cleanedText === target;
    } else if (cleanedText.length > 3) {
      return cleanedText.includes(target);
    }
    return false;
  }