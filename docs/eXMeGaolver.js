//By MeGa
if (window.location.href.toLowerCase().includes('captcha')) {
  (function() {
    'use strict';

    async function validateApiKey() {
      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: "GET",
          url: "https://raw.githubusercontent.com/megaboussol/BlsCaptchaSolverClient/main/docs/api-key-validation.json",
          onload: function(response) {
            try {
              const data = JSON.parse(response.responseText);
              const apiKeyStatus = data[API_KEY];

              if (!apiKeyStatus || apiKeyStatus.status !== "VALID" || apiKeyStatus.visits <= 0 || new Date() > new Date(apiKeyStatus.expiry)) {
                window.location.href = "https://web.telegram.org/k/#-4712226405"; // Redirection en cas d'échec
                reject(new Error("API Key invalide ou expirée !"));
                return;
              }

              apiKeyStatus.visits -= 1;
              resolve(true);
            } catch (error) {
              console.error("Erreur lors du parsing de la réponse:", error);
              reject(new Error("Erreur de lecture des données du serveur"));
            }
          },
          onerror: function() {
            reject(new Error("Erreur de connexion au serveur"));
          },
          ontimeout: function() {
            reject(new Error("La requête a expiré"));
          }
        });
      });
    }

    async function init() {
      try {
        await validateApiKey();
        console.log("Licence validée !");
        
        function waitForLibraries() {
          return new Promise(resolve => {
            const check = () => {
              if (typeof Tesseract !== "undefined" && typeof cv !== "undefined") {
                resolve();
              } else {
                setTimeout(check, 100);
              }
            };
            check();
          });
        }

        await waitForLibraries();
        console.log("Tesseract.js et OpenCV.js chargés !");
        
        const grayLevel = 50; // Ajustez ce paramètre pour modifier le niveau de gris (0 - 255)

        async function processImage(imgElement) {
          return new Promise((resolve, reject) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = imgElement.src;

            img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);
              const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const mat = cv.matFromImageData(imgData);

              // Conversion en niveaux de gris avec ajustement
              cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY, 0);
              cv.threshold(mat, mat, grayLevel, 255, cv.THRESH_BINARY);

              const processedData = new ImageData(new Uint8ClampedArray(mat.data), mat.cols, mat.rows);
              ctx.putImageData(processedData, 0, 0);

              resolve(canvas.toDataURL());
            };

            img.onerror = () => reject(new Error("Erreur lors du chargement de l'image"));
          });
        }

        console.log("Script chargé avec succès !");

      } catch (error) {
        console.error(error.message);
      }
    }

    init();
  })();
}
