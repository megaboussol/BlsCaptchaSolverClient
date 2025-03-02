// ==UserScript==
// @name         3.NewCaptchaSolverV7
// @namespace    http://tampermonkey.net/
// @version      12.1
// @description  Improved Captcha Solver with OpenCV and Tesseract
// @author       MeGaBOuSsOl
// @match        https://algeria.blsspainglobal.com/DZA/newcaptcha/logincaptcha?*
// @match        https://algeria.blsspainglobal.com/DZA/NewCaptcha/LoginCaptcha*
// @match        https://algeria.blsspainglobal.com/DZA/NewCaptcha/LoginCaptcha*
// @match        https://algeria.blsspainglobal.com/DZA/newCaptcha/logincaptcha*
// @match        https://algeria.blsspainglobal.com/DZA/Appointment/AppointmentCaptcha*
// @match        https://algeria.blsspainglobal.com/DZA/appointment/appointmentcaptcha*
// @match        https://algeria.blsspainglobal.com/DZA/Bls/DoorstepCaptcha*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=blscn.cn
// @require      https://raw.githubusercontent.com/megaboussol/BlsCaptchaSolverByMeGa/main/docs/TessereactByMeGaV6.js
// @require      https://raw.githubusercontent.com/megaboussol/BlsCaptchaSolverByMeGa/main/docs/openCvByMeGaV6.js
// ==/UserScript==

/*************************************************************************** بسم الله الرحمن الرحيم ***********************************************************************************/

// Fonction pour attendre que Tesseract.js et OpenCV.js soient chargés
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

// Fonction principale
(async function() {
  await waitForTesseractAndOpenCV();
  console.log('Tesseract.js et OpenCV.js sont chargés !');

  // Variables de configuration
  const TimeToStartRead = 1 / 10; // Temps avant de commencer la lecture
  const TimeToVerify = 3; // Temps avant de cliquer sur "Verify"

  // Configuration de Tesseract
  const config = {
    tessedit_char_whitelist: '0123456789',
    textord_underline_width: "1",
  };

  // Fonction pour normaliser le texte extrait
  function normaliserTexte(texte) {
    return texte.replace(/[+J?Zz¥§;:&%gsSoO£9A]/g, (match) => {
      return { '+': '1', 'J': '1', '?': '7', 'Z': '7', 'z': '7', '¥': '7', '§': '8', ';': '1',
               ':': '1', '&': '2', '%': '2', 'g': '2', 's': '5', 'S': '5', 'o': '0', 'O': '0',
               '£': '29', '9A': '94' }[match] || match;
    });
  }

  // Fonction pour extraire un nombre à partir d'un texte
  function extractNumber(text) {
    const matches = text.match(/\d+/);
    return matches ? parseInt(matches[0]) : 0;
  }

  // Trouver l'élément avec le z-index le plus élevé
  const elementsWithClass = document.querySelectorAll('.col-12.box-label');
  const highestZIndexNbrElementNbrNbr = [...elementsWithClass].reduce((maxEl, el) => {
    const zIndex = parseInt(window.getComputedStyle(el).zIndex) || -Infinity;
    return zIndex > (parseInt(window.getComputedStyle(maxEl).zIndex) || -Infinity) ? el : maxEl;
  }, elementsWithClass[0]);

  // Extraire le nombre du texte de l'élément
  const numberFromText = extractNumber(highestZIndexNbrElementNbrNbr?.outerText || '');

  // Trouver l'élément parent contenant les images CAPTCHA
  const parentElement = document.querySelector("#captchaForm > div.text-center.row.no-gutters").parentElement.parentElement.previousElementSibling;
  const childElements = parentElement.querySelectorAll('*');

  // Positions des images CAPTCHA
  const positions = [
    {left: "0px", top: "0px"}, {left: "0px", top: "110px"}, {left: "0px", top: "220px"},
    {left: "110px", top: "0px"}, {left: "110px", top: "110px"}, {left: "110px", top: "220px"},
    {left: "220px", top: "0px"}, {left: "220px", top: "110px"}, {left: "220px", top: "220px"}
  ];

  // Fonction pour filtrer les éléments par position et affichage
  function filterElementsWithPositionAndDisplay(elements, left, top, display) {
    return [...elements].filter(el => {
      const style = window.getComputedStyle(el);
      return style.left === left && style.top === top && style.display === display;
    });
  }

  // Fonction pour trouver l'élément avec le z-index le plus élevé
  function findHighestZIndexElement(elements) {
    return elements.reduce((maxEl, el) => {
      const zIndex = parseInt(window.getComputedStyle(el).zIndex) || -Infinity;
      return zIndex > (parseInt(window.getComputedStyle(maxEl).zIndex) || -Infinity) ? el : maxEl;
    }, elements[0]);
  }

  // Fonction pour prétraiter l'image avec OpenCV
  async function preprocessImage(img) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.crossOrigin = 'Anonymous'; // Autoriser les images cross-origin
      image.src = img.src;

      image.onload = () => {
        console.log('Image chargée avec succès:', img.src);
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        // Convertir en niveaux de gris
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const src = cv.matFromImageData(imageData);
        cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);

        // Appliquer un filtre gaussien
        const ksize = new cv.Size(5, 5);
        cv.GaussianBlur(src, src, ksize, 0, 0, cv.BORDER_DEFAULT);

        // Détecter et supprimer les lignes barrant les chiffres
        const edges = new cv.Mat();
        cv.Canny(src, edges, 50, 150);
        const lines = new cv.Mat();
        cv.HoughLinesP(edges, lines, 1, Math.PI / 180, 50, 30, 10);

        for (let i = 0; i < lines.rows; i++) {
          const line = lines.data32S.subarray(i * 4, (i + 1) * 4);
          cv.line(src, new cv.Point(line[0], line[1]), new cv.Point(line[2], line[3]), new cv.Scalar(255, 255, 255), 2);
        }

        // Appliquer un seuillage adaptatif
        cv.adaptiveThreshold(src, src, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 17, 5);

        // Afficher l'image prétraitée sur le canvas
        cv.imshow(canvas, src);

        // Convertir en URL de données
        const processedImageUrl = canvas.toDataURL();
        console.log('Image prétraitée avec succès:', processedImageUrl);
        resolve(processedImageUrl);

        // Libérer la mémoire
        src.delete();
        edges.delete();
        lines.delete();
      };

      image.onerror = (err) => {
        console.error('Échec du chargement de l\'image:', err);
        reject(err);
      };
    });
  }

  // Fonction pour vérifier si le texte correspond au nombre cible
  function isMatchingNumber(text, target) {
    const cleanedText = text.replace(/\D/g, '');
    if (cleanedText.length === 3) {
      return cleanedText === target;
    } else if (cleanedText.length > 3) {
      return cleanedText.includes(target);
    }
    return false;
  }

  // Parcourir les positions des images CAPTCHA
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
