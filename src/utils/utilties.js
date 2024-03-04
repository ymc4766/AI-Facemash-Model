export const drawMesh = (predictions, ctx) => {
  if (predictions && predictions.length > 0) {
    predictions.forEach((el) => {
      const keypoints = el.scaledMesh; // Corrected property name

      if (keypoints && keypoints.length) {
        for (let i = 0; i < keypoints.length; i++) {
          const x = keypoints[i][0];
          const y = keypoints[i][1];
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, 3 * Math.PI);
          ctx.fillStyle = "orange";
          ctx.fill();
        }
      }
    });
  }
};
