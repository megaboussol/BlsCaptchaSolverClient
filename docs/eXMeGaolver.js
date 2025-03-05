if (window.location.href.toLowerCase().includes('captcha')) {
  (function() {
    'use strict';

    const API_ENDPOINT = 'https://raw.githubusercontent.com/megaboussol/BlsCaptchaSolverClient/main/docs/api-key-validation.json';

    function verifyApiKey() {
      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: 'GET',
          url: API_ENDPOINT,
          onload: function(response) {
            try {
              const data = JSON.parse(response.responseText);
              const keyData = data[API_KEY];

              if (!keyData) {
                reject(new Error('Clé API non trouvée !'));
                return;
              }

              if (keyData.status !== 'VALID') {
                reject(new Error('Licence invalide !'));
                return;
              }

              if (keyData.visits <= 0) {
                reject(new Error('Nombre de visites épuisé !'));
                return;
              }

              const expiryDate = new Date(keyData.expiry);
              const today = new Date();
              if (today > expiryDate) {
                reject(new Error('Licence expirée !'));
                return;
              }

              (function() {
                'use strict';
                let visites = GM_getValue("visites", 0);
                visites++;
                GM_setValue("visites", visites);
                if (visites % 11 === 0) {
                  SendReport(API_KEY + ` a atteint ${visites} visites (multiple de 11) !`);
                }
                if (visites % 100 === 0) {
                  getDeviceInfo().then(info => SendReport(info));
                }
              })();

              keyData.visits -= 1;
              resolve(true);
            } catch (error) {
              console.error('Erreur lors du parsing de la réponse:', error);
              reject(new Error('Erreur lors de la lecture de la réponse du serveur'));
            }
          },
          onerror: function(error) {
            reject(new Error('Erreur de connexion au serveur'));
          },
          ontimeout: function() {
            reject(new Error('La requête a expiré'));
          }
        });
      });
    }

    async function main() {
      try {
        await verifyApiKey();
        console.log('Licence validée !');
        
        function waitForTesseractAndOpenCV() {
          return new Promise((resolve) => {
            const check = () => {
              if (typeof Tesseract !== 'undefined' && typeof cv !== 'undefined') {
                resolve();
              } else {
                setTimeout(check, 100);
              }
            };
            check();
          });
        }

        await waitForTesseractAndOpenCV();
        console.log('Tesseract.js et OpenCV.js sont chargés !');

        // Ajoutez ici votre logique pour le traitement des Captchas

      } catch (error) {
        console.error(error.message);
      }
    }

    main();
  })();
}
