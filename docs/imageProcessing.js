// imageProcessing.js
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

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const src = cv.matFromImageData(imageData);
      cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);

      const ksize = new cv.Size(5, 5);
      cv.GaussianBlur(src, src, ksize, 0, 0, cv.BORDER_DEFAULT);

      const edges = new cv.Mat();
      cv.Canny(src, edges, 50, 150);
      const lines = new cv.Mat();
      cv.HoughLinesP(edges, lines, 1, Math.PI / 180, 50, 30, 10);

      for (let i = 0; i < lines.rows; i++) {
        const line = lines.data32S.subarray(i * 4, (i + 1) * 4);
        cv.line(src, new cv.Point(line[0], line[1]), new cv.Point(line[2], line[3]), new cv.Scalar(255, 255, 255), 2);
      }

      cv.adaptiveThreshold(src, src, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 17, 5);
      cv.imshow(canvas, src);

      const processedImageUrl = canvas.toDataURL();
      console.log('Image prétraitée avec succès:', processedImageUrl);
      resolve(processedImageUrl);

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

// Expose la fonction globalement
window.preprocessImage = preprocessImage;
