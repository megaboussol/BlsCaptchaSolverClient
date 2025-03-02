// main.js
(function() {
    'use strict';
  
    // Charger les dépendances
    const scriptUrls = [
      'https://raw.githubusercontent.com/megaboussol/BlsCaptchaSolverByMeGa/main/docs/TessereactByMeGaV6.js',
      'https://raw.githubusercontent.com/megaboussol/BlsCaptchaSolverByMeGa/main/docs/openCvByMeGaV6.js',
      'https://raw.githubusercontent.com/megaboussol/BlsCaptchaSolverClient/main/docs/config.js',
      'https://raw.githubusercontent.com/megaboussol/BlsCaptchaSolverClient/main/docs/utils.js',
      'https://raw.githubusercontent.com/megaboussol/BlsCaptchaSolverClient/main/docs/imageProcessing.js',
      'https://raw.githubusercontent.com/megaboussol/BlsCaptchaSolverClient/main/docs/captchaSolver.js'
    ];
  
    scriptUrls.forEach(url => {
      const script = document.createElement('script');
      script.src = url;
      document.head.appendChild(script);
    });
  })();
