




function darkmode{

};


//record function, records 10s clip and saves it
function record() {
  recording = true;
  mediaRecorder = new MediaRecorder(canvas.captureStream(30));
  const chunks = [];

  mediaRecorder.ondataavailable = (event) => {
    chunks.push(event.data);
  };

  mediaRecorder.onstop = (event) => {
    const blob = new Blob(chunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "animation.webm";
    link.click();
  };

  mediaRecorder.start();

  setTimeout(() => {
    recording = false;
    mediaRecorder.stop();
  }, 10000);
};