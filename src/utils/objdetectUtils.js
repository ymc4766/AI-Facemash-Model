export const drawDetect = (detections, ctx, divRef) => {
  detections.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];

    const text = prediction["class"];

    // Check if divRef and divRef.current are available

    // Calculate new coordinates relative to the div

    // set styling
    const color = "green";
    ctx.strokeStyle = color;
    ctx.font = "18px bold";

    ctx.beginPath();
    //   ctx.fillText(prediction["class"], newX, newY - 5); // Adjust text position
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};
