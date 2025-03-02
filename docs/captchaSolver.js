 
// captchaSolver.js
import { API_KEY, config, TimeToStartRead, TimeToVerify } from './config.js';
import { normaliserTexte, extractNumber, filterElementsWithPositionAndDisplay, findHighestZIndexElement, isMatchingNumber } from './utils.js';
import { preprocessImage } from './imageProcessing.js';

function waitForTesseractAndOpenCV() {
  return new Promise((resolve) => {
    const checkTesseractAndOpenCV = () => {
      if (typeof Tesseract !== 'undefined' && typeof cv !== 'undefined') {
        resolve();
      } else {
        setTimeout(checkTesseractAndOpenCV, 100);
      }
    };
    checkTesseractAndOpenCV();
  });
}

(async function() {
  await waitForTesseractAndOpenCV();
  console.log('Tesseract.js et OpenCV.js sont chargés !');

  const elementsWithClass = document.querySelectorAll('.col-12.box-label');
  const highestZIndexNbrElementNbrNbr = [...elementsWithClass].reduce((maxEl, el) => {
    const zIndex = parseInt(window.getComputedStyle(el).zIndex) || -Infinity;
    return zIndex > (parseInt(window.getComputedStyle(maxEl).zIndex) || -Infinity) ? el : maxEl;
  }, elementsWithClass[0]);

  const numberFromText = extractNumber(highestZIndexNbrElementNbrNbr?.outerText || '');

  const parentElement = document.querySelector("#captchaForm > div.text-center.row.no-gutters").parentElement.parentElement.previousElementSibling;
  const childElements = parentElement.querySelectorAll('*');

  const positions = [
    {left: "0px", top: "0px"}, {left: "0px", top: "110px"}, {left: "0px", top: "220px"},
    {left: "110px", top: "0px"}, {left: "110px", top: "110px"}, {left: "110px", top: "220px"},
    {left: "220px", top: "0px"}, {left: "220px", top: "110px"}, {left: "220px", top: "220px"}
  ];

  positions.forEach((position, index) => {
    const filteredElements = filterElementsWithPositionAndDisplay(childElements, position.left, position.top, "block");
    const highestZIndexElement = findHighestZIndexElement(filteredElements);

    if (highestZIndexElement) {
      setTimeout(async () => {
        try {
          const processedImageUrl = await preprocessImage(highestZIndexElement.children[0]);
          const imgElement = new Image();
          imgElement.src = processedImageUrl;

          Tesseract.recognize(
            imgElement, 'eng', config
          ).then(result => {
            const text = normaliserTexte(result.data.text).replace(/\D/g, '');
            console.log(`Texte détecté pour (${position.left}, ${position.top}): ${text}`);

            if (isMatchingNumber(text, numberFromText.toString()) && highestZIndexElement.children[0].className !== 'captcha-img img-selected') {
              highestZIndexElement.children[0].click();
            } else {
              console.log('La case est déjà sélectionnée ou ne correspond pas');
            }

            if (index === 8) {
              setTimeout(() => {
                document.getElementById('btnVerify').click();
                console.log("Clique sur 'Verify'");
              }, TimeToVerify * 1000);
            }
          });
        } catch (error) {
          console.error('Erreur lors du prétraitement ou de la reconnaissance:', error);
        }
      }, TimeToStartRead * 1000);
    } else {
      console.log(`Aucun élément trouvé pour (${position.left}, ${position.top})`);
    }
  });
})();