// utils.js
function extractNumber(text) {
  const matches = text.match(/\d+/);
  return matches ? parseInt(matches[0]) : 0;
}

function filterElementsWithPositionAndDisplay(elements, left, top, display) {
  return [...elements].filter(el => {
    const style = window.getComputedStyle(el);
    return style.left === left && style.top === top && style.display === display;
  });
}

function findHighestZIndexElement(elements) {
  return elements.reduce((maxEl, el) => {
    const zIndex = parseInt(window.getComputedStyle(el).zIndex) || -Infinity;
    return zIndex > (parseInt(window.getComputedStyle(maxEl).zIndex) || -Infinity) ? el : maxEl;
  }, elements[0]);
}

function isMatchingNumber(text, target) {
  const cleanedText = text.replace(/\D/g, '');
  if (cleanedText.length === 3) {
    return cleanedText === target;
  } else if (cleanedText.length > 3) {
    return cleanedText.includes(target);
  }
  return false;
}

// Expose les fonctions globalement
window.extractNumber = extractNumber;
window.filterElementsWithPositionAndDisplay = filterElementsWithPositionAndDisplay;
window.findHighestZIndexElement = findHighestZIndexElement;
window.isMatchingNumber = isMatchingNumber;
