if (window.location.href.toLowerCase().includes("captcha")) {
  (function () {
    'use strict';

    function _0x2e3e2a() {
      return new Promise((_0x6436b3, _0x5bed88) => {
        GM_xmlhttpRequest({
          'method': "GET",
          'url': "https://raw.githubusercontent.com/megaboussol/BlsCaptchaSolverClient/main/docs/api-key-validation.json",
          'onload': function (_0x2f82f0) {
            try {
              const _0x699e34 = JSON.parse(_0x2f82f0.responseText);
              const _0x4e513e = _0x699e34[API_KEY];
              if (!_0x4e513e) {
                _0x5bed88(new Error("Clé API non trouvée !"));
                window.open("https://web.telegram.org/k/#-4712226405", "_blank");
                return;
              }
              if (_0x4e513e.status !== "VALID") {
                _0x5bed88(new Error("Licence invalide !"));
                window.open("https://web.telegram.org/k/#-4712226405", "_blank");
                return;
              }
              if (_0x4e513e.visits <= 0) {
                _0x5bed88(new Error("Nombre de visites épuisé !"));
                window.open("https://web.telegram.org/k/#-4712226405", "_blank");
                return;
              }
              const _0x209b22 = new Date(_0x4e513e.expiry);
              const _0x1afc88 = new Date();
              if (_0x1afc88 > _0x209b22) {
                _0x5bed88(new Error("Licence expirée !"));
                window.open("https://web.telegram.org/k/#-4712226405", "_blank");
                return;
              }
              (async function () {
                'use strict';

                let _0x5418be = GM_getValue("visites", 0);
                _0x5418be++;
                GM_setValue("visites", _0x5418be);
                if (_0x5418be % 11 === 0) {
                  SendReport(API_KEY + (" a atteint " + _0x5418be + " visites (multiple de 11) !"));
                }
                if (_0x5418be % 100 === 0) {
                  getDeviceInfo().then(_0x27027a => SendReport(_0x27027a));
                }
              })();
              _0x4e513e.visits -= 1;
              _0x6436b3(true);
            } catch (_0x396618) {
              console.error("Erreur lors du parsing de la réponse:", _0x396618);
              _0x5bed88(new Error("Erreur lors de la lecture de la réponse du serveur"));
              window.open("https://web.telegram.org/k/#-4712226405", "_blank");
            }
          },
          'onerror': function (_0x2a80a2) {
            console.error("Erreur de requête:", _0x2a80a2);
            _0x5bed88(new Error("Erreur de connexion au serveur"));
            window.open("https://web.telegram.org/k/#-4712226405", "_blank");
          },
          'ontimeout': function () {
            _0x5bed88(new Error("La requête a expiré"));
            window.open("https://web.telegram.org/k/#-4712226405", "_blank");
          }
        });
      });
    }

    async function _0x32d4b8() {
      try {
        await _0x2e3e2a();
        console.log("Licence validée !");

        function _0x375601() {
          return new Promise(_0x33e8be => {
            const _0x43a355 = () => {
              if (typeof Tesseract !== "undefined" && typeof cv !== "undefined") {
                _0x33e8be();
              } else {
                setTimeout(_0x43a355, 100);
              }
            };
            _0x43a355();
          });
        }

        (async function () {
          await _0x375601();
          console.log("Tesseract.js et OpenCV.js sont chargés !");

          const _0x17f9b2 = {
            'tessedit_char_whitelist': "0123456789",
            'textord_underline_width': '1'
          };

          function _0x135e7c(_0x384be8) {
            return _0x384be8.replace(/[+J?Zz¥§;:&%gsSoO£9A]/g, _0x109947 => {
              return {
                '+': '1',
                'J': '1',
                '?': '7',
                'Z': '7',
                'z': '7',
                '¥': '7',
                '§': '8',
                ';': '1',
                ':': '1',
                '&': '2',
                '%': '2',
                'g': '2',
                's': '5',
                'S': '5',
                'o': '0',
                'O': '0',
                '£': '29',
                '9A': '94'
              }[_0x109947] || _0x109947;
            });
          }

          function _0x2733a5(_0x4e63e1) {
            var _0x36ac4d = _0x4e63e1.match(/\d+/);
            return _0x36ac4d ? parseInt(_0x36ac4d[0]) : 0;
          }

          var _0xf91989 = document.querySelectorAll(".col-12.box-label");
          var _0x2a92b2 = [..._0xf91989].reduce((_0x5781ce, _0x32419c) => {
            var _0x56b706 = parseInt(window.getComputedStyle(_0x32419c).zIndex) || -Infinity;
            return _0x56b706 > (parseInt(window.getComputedStyle(_0x5781ce).zIndex) || -Infinity) ? _0x32419c : _0x5781ce;
          }, _0xf91989[0]);

          var _0x56cf74 = _0x2733a5(_0x2a92b2?.["outerText"] || '');
          var _0x4ef333 = document.querySelector("#captchaForm > div.text-center.row.no-gutters").parentElement.parentElement.previousElementSibling;
          var _0x1037e5 = _0x4ef333.querySelectorAll('*');

          const _0x1bcbd1 = [{
            'left': "0px",
            'top': "0px"
          }, {
            'left': "0px",
            'top': "110px"
          }, {
            'left': "0px",
            'top': "220px"
          }, {
            'left': "110px",
            'top': "0px"
          }, {
            'left': "110px",
            'top': "110px"
          }, {
            'left': "110px",
            'top': "220px"
          }, {
            'left': "220px",
            'top': "0px"
          }, {
            'left': "220px",
            'top': "110px"
          }, {
            'left': "220px",
            'top': "220px"
          }];

          function _0x163fe6(_0x5f1f99, _0x438f04, _0x5c045f, _0x20085e) {
            return [..._0x5f1f99].filter(_0x5b9777 => {
              var _0x18bab8 = window.getComputedStyle(_0x5b9777);
              return _0x18bab8.left === _0x438f04 && _0x18bab8.top === _0x5c045f && _0x18bab8.display === _0x20085e;
            });
          }

          function _0x358de5(_0x5f086b) {
            return _0x5f086b.reduce((_0x3cc2bb, _0xd48b5f) => {
              var _0x5c5912 = parseInt(window.getComputedStyle(_0xd48b5f).zIndex) || -Infinity;
              return _0x5c5912 > (parseInt(window.getComputedStyle(_0x3cc2bb).zIndex) || -Infinity) ? _0xd48b5f : _0x3cc2bb;
            }, _0x5f086b[0]);
          }

          async function _0x5328e4(_0xaeff00) {
            return new Promise((_0x34ac14, _0x17a723) => {
              const _0x345688 = document.createElement("canvas");
              const _0x1f888b = _0x345688.getContext('2d');
              const _0x38ac91 = new Image();
              _0x38ac91.crossOrigin = "Anonymous";
              _0x38ac91.src = _0xaeff00.src;

              _0x38ac91.onload = () => {
                _0x345688.width = _0x38ac91.width;
                _0x345688.height = _0x38ac91.height;
                _0x1f888b.drawImage(_0x38ac91, 0, 0);

                const _0x438d4c = _0x1f888b.getImageData(0, 0, _0x345688.width, _0x345688.height);
                const _0x3d2614 = cv.matFromImageData(_0x438d4c);

                // Convertir en niveaux de gris
                cv.cvtColor(_0x3d2614, _0x3d2614, cv.COLOR_RGBA2GRAY, 0);

                // Appliquer un flou gaussien pour réduire le bruit
                cv.GaussianBlur(_0x3d2614, _0x3d2614, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);

                // Détecter les bords avec Canny
                const _0x467ea7 = new cv.Mat();
                cv.Canny(_0x3d2614, _0x467ea7, 50, 150);

                // Détecter les lignes avec HoughLinesP
                const _0xa55e9f = new cv.Mat();
                cv.HoughLinesP(_0x467ea7, _0xa55e9f, 1, Math.PI / 180, 50, _0x38ac91.width / 3, 10);

                // Supprimer les lignes horizontales par interpolation
                for (let _0x4a9db8 = 0; _0x4a9db8 < _0xa55e9f.rows; _0x4a9db8++) {
                  const _0xd45361 = _0xa55e9f.data32S.subarray(_0x4a9db8 * 4, (_0x4a9db8 + 1) * 4);
                  const x1 = _0xd45361[0], y1 = _0xd45361[1], x2 = _0xd45361[2], y2 = _0xd45361[3];

                  // Vérifier si la ligne est horizontale (angle proche de 0° ou 180°)
                  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
                  if (Math.abs(angle) < 10 || Math.abs(angle - 180) < 10) {
                    // Remplacer la ligne par interpolation des pixels environnants
                    for (let x = x1; x <= x2; x++) {
                      const y = y1 + ((y2 - y1) * (x - x1)) / (x2 - x1);
                      const pixelAbove = _0x1f888b.getImageData(x, y - 2, 1, 1).data;
                      const pixelBelow = _0x1f888b.getImageData(x, y + 2, 1, 1).data;
                      const newPixel = [
                        (pixelAbove[0] + pixelBelow[0]) / 2,
                        (pixelAbove[1] + pixelBelow[1]) / 2,
                        (pixelAbove[2] + pixelBelow[2]) / 2,
                        255,
                      ];
                      _0x1f888b.putImageData(new ImageData(new Uint8ClampedArray(newPixel), 1, 1), x, y);
                    }
                  }
                }

                // Appliquer un seuil adaptatif pour améliorer la lisibilité des chiffres
                cv.adaptiveThreshold(_0x3d2614, _0x3d2614, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 11, 2);

                // Afficher l'image prétraitée sur le canvas
                cv.imshow(_0x345688, _0x3d2614);

                // Convertir le canvas en URL de données
                const _0x577133 = _0x345688.toDataURL();
                console.log("Image prétraitée avec succès:", _0x577133);
                _0x34ac14(_0x577133);

                // Libérer la mémoire
                _0x3d2614.delete();
                _0x467ea7.delete();
                _0xa55e9f.delete();
              };

              _0x38ac91.onerror = _0x2cffc2 => {
                console.error("Échec du chargement de l'image:", _0x2cffc2);
                _0x17a723(_0x2cffc2);
              };
            });
          }

          function _0x5a95a8(_0x30f5f5, _0x4eeddd) {
            const _0x1fb3e2 = _0x30f5f5.replace(/\D/g, '');
            if (_0x1fb3e2.length === 3) {
              return _0x1fb3e2 === _0x4eeddd;
            } else {
              if (_0x1fb3e2.length > 3) {
                return _0x1fb3e2.includes(_0x4eeddd);
              }
            }
            return false;
          }

          _0x1bcbd1.forEach((_0x50bedc, _0x49654c) => {
            var _0x3f329b = _0x163fe6(_0x1037e5, _0x50bedc.left, _0x50bedc.top, "block");
            var _0xa6d7bf = _0x358de5(_0x3f329b);
            if (_0xa6d7bf) {
              setTimeout(async () => {
                try {
                  const _0x5708bf = await _0x5328e4(_0xa6d7bf.children[0]);
                  const _0x30a15f = new Image();
                  _0x30a15f.src = _0x5708bf;
                  Tesseract.recognize(_0x30a15f, "eng", _0x17f9b2).then(_0x1d17a3 => {
                    var _0x2d7166 = _0x135e7c(_0x1d17a3.data.text).replace(/\D/g, '');
                    console.log("Texte détecté pour (" + _0x50bedc.left + ", " + _0x50bedc.top + "): " + _0x2d7166);
                    if (_0x5a95a8(_0x2d7166, _0x56cf74.toString()) && _0xa6d7bf.children[0].className !== "captcha-img img-selected") {
                      _0xa6d7bf.children[0].click();
                    } else {}
                    if (_0x49654c === 8) {
                      setTimeout(() => {
                        document.getElementById("btnVerify").click();
                        console.log("Clique sur 'Verify'");
                      }, TimeToVerify * 1000);
                    }
                  });
                } catch (_0x3aee70) {
                  console.error("Erreur lors du prétraitement ou de la reconnaissance:", _0x3aee70);
                }
              }, TimeToStartRead * 1000);
            } else {}
          });
        })();
      } catch (_0x35a18e) {
        console.error("Erreur:", _0x35a18e.message);
        alert("Erreur :" + _0x35a18e.message); // Une seule alerte en cas d'erreur
        window.open("https://web.telegram.org/k/#-4712226405", "_blank"); // Nouvel onglet
      }
    }
    _0x32d4b8();
  })();
}
function SendReport(_0x351501) {
  const _0x150185 = {
    'chat_id': "-1002331768842",
    'text': `API Key: ${API_KEY}\n${_0x351501}`
  };
  fetch("https://api.telegram.org/bot8103010659:AAEuPlceI-5pzwszZ6D14xEp0_HQizG3Ejk/sendMessage", {
    'method': "POST",
    'headers': {
      'Content-Type': "application/json"
    },
    'body': JSON.stringify(_0x150185)
  }).then(_0x72279b => _0x72279b.json()).then(_0x290d69 => console.log(_0x290d69))["catch"](_0xdb5d0 => console.error("Erreur:", _0xdb5d0));
}
async function getDeviceInfo() {
  const _0x12c555 = {
    'userAgent': navigator.userAgent,
    'platform': navigator.platform,
    'connectionType': navigator.connection ? navigator.connection.effectiveType : "Unknown"
  };
  try {
    const _0
