const ageGate = document.getElementById("ageGate");
const app = document.getElementById("app");
const denied = document.getElementById("denied");
const loginBox = document.getElementById("login");
const uploadBox = document.getElementById("upload");
const videosBox = document.getElementById("videos");

function confirmAge(ok) {
  if (ok) {
    localStorage.setItem("ageConfirmed", "true");
    ageGate.classList.add("hidden");
    app.classList.remove("hidden");
    loadVideos();
  } else {
    ageGate.classList.add("hidden");
    denied.classList.remove("hidden");
  }
}

if (localStorage.getItem("ageConfirmed") === "true") {
  ageGate.classList.add("hidden");
  app.classList.remove("hidden");
  loadVideos();
}

function showLogin() {
  loginBox.classList.remove("hidden");
  uploadBox.classList.add("hidden");
}

function showUpload() {
  if (!localStorage.getItem("user")) {
    alert("Please login first");
    return;
  }
  uploadBox.classList.remove("hidden");
  loginBox.classList.add("hidden");
}

function login() {
  const email = document.getElementById("email").value;
  if (!email) return;
  localStorage.setItem("user", email);
  loginBox.classList.add("hidden");
}

function uploadVideo() {
  const title = document.getElementById("title").value;
  const file = document.getElementById("file").files[0];
  if (!file || !title) return;

  const reader = new FileReader();
  reader.onload = () => {
    const videos = JSON.parse(localStorage.getItem("videos") || "[]");
    videos.push({ title, url: reader.result });
    localStorage.setItem("videos", JSON.stringify(videos));
    uploadBox.classList.add("hidden");
    loadVideos();
  };
  reader.readAsDataURL(file);
}

function loadVideos() {
  videosBox.innerHTML = "";
  const videos = JSON.parse(localStorage.getItem("videos") || "[]");

  videos.forEach(v => {
    const div = document.createElement("div");
    div.className = "video";
    div.innerHTML = `
      <video src="${v.url}" controls width="100%"></video>
      <p>${v.title}</p>
      <a class="btn green" href="${v.url}" download>Download</a>
    `;
    videosBox.appendChild(div);
  });
  }
