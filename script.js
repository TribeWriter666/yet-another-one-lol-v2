document.addEventListener("DOMContentLoaded", function() {
  document.body.style.backgroundColor = "black";
  const input = document.querySelector("#emoji-input");
  const animateButton = document.querySelector("#animate-button");
  const addButton = document.querySelector("#add-button");
  const screenshotButton = document.querySelector("#screenshot-button");
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const slowDownButton = document.querySelector("#slow-down-button");
  const speedUpButton = document.querySelector("#speed-up-button");
  const backgroundColorSelect = document.querySelector("#background-color");
  const darkModeToggle = document.querySelector("#dark-mode-toggle");
  const recordButton = document.querySelector("#record-button");
  const removeLastButton = document.querySelector("#remove-last-button");

  // ------------------------testing area-----------------------------------------------START

  var emojiList = [];
  // ------------------------testing area-----------------------------------------------END

  let speed = 2;
  let x = canvas.width / 2;
  let y = canvas.height / 2;
  let dx = 2;
  let dy = 2;
  let emojiArray = [];
  let recording = false;
  let mediaRecorder;

  // ------------------------testing area-----------------------------------------------START

// creates a list of emojis to pick from & auto populates the input-containe
  const generateEmojiList = () => {
    const emojiTable = document.createElement("table");

    const emojiList = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😜", "😝", "😛", "🤑", "🤗", "🤓", "😎", "🤡", "🤠", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "😤", "😠", "😡", "😶", "😐", "😑", "😯", "😦", "😧", "😮", "😲", "😵", "😳", "😱", "😨", "😰", "😢", "😥", "🤤", "😭", "😓", "😪", "😴", "🙄", "🤔", "🤥", "🤢", "🤧", "😷", "🤒", "🤕", "😈", "👿", "👹", "👺", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "👐", "🙌", "👏", "🤝", "👍", "👎", "👊", "✊", "🤛", "🤜", "🤞", "✌️", "🤘", "👌", "👈", "👉", "👆", "👇", "☝️", "✋", "🤚", "🖐", "🖖", "👋", "🤙", "💪", "🖕", "✍️", "🙏", "💍", "💄", "💋", "👄", "👅", "👂", "👃", "👣", "👁", "👀", "🗣️", "👤", "👥", "👶", "👦", "👧", "👨", "👩", "👱‍♀️", "👱", "👴", "👵", "👲", "👳‍♀️", "👳", "👮‍♀️", "👮", "👷‍♀️", "👷", "💂‍♀️", "💂", "🕵️‍♀️", "🕵️", "👩‍⚕️", "👨‍⚕️", "👩‍🌾", "👨‍🌾", "👩‍🍳", "👨‍🍳", "👩‍🎨", "👨‍🎨", "👩‍🏭", "👨‍🏭", "👩‍💼", "👨‍💼", "👩‍🔧", "👨‍🔧", "👩‍🔬", "👨‍🔬", "👩‍🎤", "👨‍🎤", "👩‍🎨", "👨‍🎨", "👩‍🏫", "👨‍🏫", "👩‍🏭", "👨‍🏭", "👩‍💻", "👨‍💻", "👩‍💼", "👨‍💼", "👩‍🔬", "👨‍🔬", "👩‍🎨", "👨‍🎨", "👩‍🚀", "👨‍🚀", "👩‍⚖️", "👨‍⚖️", "👰", "🤵", "👸", "🤴", "🦸‍♀️", "🦸‍♂️", "🧙‍♀️", "🧙‍♂️", "🧝‍♀️", "🧝‍♂️", "🧛‍♀️", "🧛‍♂️", "🧟‍♀️", "🧟‍♂️", "🧞‍♀️", "🧞‍♂️", "🧜‍♀️", "🧜‍♂️", "🧚‍♀️", "🧚‍♂️", "👼", "🎅", "🤶", "🧑‍🎄", "⛄️", "🎁", "🎉", "🎂", "🎈", "🎊", "🎌", "🏮", "✨", "💫", "💥", "🎥", "🎬", "📹", "📼", "🔍", "🔎", "💡", "🔦", "🏮", "📔", "📕", "📖", "📗", "📘", "📙", "📚", "📓", "📒", "📃", "📜", "📄", "📰", "🗞️", "📑", "🔖", "🏷️", "💰", "💴", "💵", "💶", "💷", "💸", "💳", "🧾", "✉️", "📧", "📨", "📩", "📤", "📥", "📦", "📫", "📪", "📬", "📭"];

    let currentRow;
    emojiList.forEach((emoji, index) => {
      if (index % 6 === 0) {
        currentRow = document.createElement("tr");
        emojiTable.appendChild(currentRow);
      }

      const emojiCell = document.createElement("td");
      emojiCell.innerHTML = emoji;
      emojiCell.addEventListener("click", (event) => {
        input.value = emoji;
        emojiListDiv.style.display = "none";
      });
      currentRow.appendChild(emojiCell);
    });

    return emojiTable;
  };

  const emojiListDiv = document.querySelector(".emoji-list");
  emojiListDiv.appendChild(generateEmojiList());


  // ------------------------testing area-----------------------------------------------END


// sets background color of the canvas
  const setBackgroundColor = () => {
    canvas.style.backgroundColor = backgroundColorSelect.value;
  };

  //speed -
  const slowDown = () => {
    speed /= 2;
    for (let i = 0; i < emojiArray.length; i++) {
      emojiArray[i].dx /= 2;
      emojiArray[i].dy /= 2;
    }
  };

  // speed +
  const speedUp = () => {
    speed *= 2;
    for (let i = 0; i < emojiArray.length; i++) {
      emojiArray[i].dx *= 2;
      emojiArray[i].dy *= 2;
    }
  };

  // animates the emojis
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < emojiArray.length; i++) {
      const emoji = emojiArray[i];
      ctx.font = "64px Arial";
      ctx.fillText(emoji.value, emoji.x, emoji.y);

      if (emoji.x + emoji.dx > canvas.width || emoji.x + emoji.dx < 0) {
        emoji.dx = -emoji.dx;
      }

      if (emoji.y + emoji.dy > canvas.height || emoji.y + emoji.dy < 0) {
        emoji.dy = -emoji.dy;
      }

      emoji.x += emoji.dx;
      emoji.y += emoji.dy;
    }
    requestAnimationFrame(animate);
  };

  // randomises the start location of the animation
  const addEmoji = () => {
    emojiArray.push({
      value: input.value,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: 2,
      dy: 2
    });
  };

  // action listeners 
  backgroundColorSelect.addEventListener("change", setBackgroundColor);
  animateButton.addEventListener("click", animate);
  addButton.addEventListener("click", addEmoji);
  slowDownButton.addEventListener("click", slowDown);
  speedUpButton.addEventListener("click", speedUp);

  // ------------------------testing area-----------------------------------------------START

  input.addEventListener("click", (event) => {
    emojiListDiv.style.display = emojiListDiv.style.display === "none" ? "block" : "none";
  });

  // ------------------------testing area-----------------------------------------------END

  //screenshot function
  screenshotButton.addEventListener("click", () => {
    const screenshotCanvas = document.createElement("canvas");
    screenshotCanvas.width = canvas.width;
    screenshotCanvas.height = canvas.height;

    const screenshotCtx = screenshotCanvas.getContext("2d");
    screenshotCtx.fillStyle = backgroundColorSelect.value;
    screenshotCtx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < emojiArray.length; i++) {
      const emoji = emojiArray[i];
      screenshotCtx.font = "64px Arial";
      screenshotCtx.fillText(emoji.value, emoji.x, emoji.y);
    }

    const screenshot = screenshotCanvas.toDataURL();
    const link = document.createElement("a");
    link.href = screenshot;
    link.download = "screenshot.png";
    link.click();
  });


  //listens for record button click
  recordButton.addEventListener("click", record);

  //listens for change to dark mode toggle and swaps the background color
  darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    } else {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    }
  });

  // listening for remove last animation click
  removeLastButton.addEventListener("click", () => {
    emojiArray.pop();
  });

  //looks like this is listening for a reload of the page
  window.addEventListener("load", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.9;
  });

  // looks like its listening for a change of screen size
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.9;
  });
});

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