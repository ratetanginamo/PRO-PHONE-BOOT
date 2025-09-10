const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const snapBtn = document.getElementById('snap');
const gallery = document.getElementById('gallery');
const gotoViewer = document.getElementById('gotoViewer');

// Start camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream)
  .catch(err => alert("Camera error: " + err));

// Add ChatGPT watermark
function addWatermark() {
  const logo = new Image();
  logo.src = "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg";
  logo.onload = () => {
    ctx.globalAlpha = 0.7;
    ctx.drawImage(logo, canvas.width - 60, canvas.height - 60, 50, 50);
    ctx.globalAlpha = 1;
    ctx.font = "14px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("ChatGPT", canvas.width - 120, canvas.height - 20);
  };
}

// Take photo
snapBtn.addEventListener('click', () => {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  addWatermark();

  const imgData = canvas.toDataURL();
  const img = new Image();
  img.src = imgData;
  gallery.appendChild(img);

  // Save to localStorage gallery
  let saved = JSON.parse(localStorage.getItem("myGallery") || "[]");
  saved.push(imgData);
  localStorage.setItem("myGallery", JSON.stringify(saved));
});

// Go to viewer
gotoViewer.addEventListener('click', () => {
  window.location.href = "viewer.html";
});
