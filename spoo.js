const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playPauseBtn");
const progressBar = document.querySelector(".progress-bar");
const currTime = document.querySelector(".curr-time");
const totalTime = document.querySelector(".tot-time");

let isPlaying = false;

// Format mm:ss
function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// Load duration
audio.addEventListener("loadedmetadata", () => {
  totalTime.textContent = formatTime(audio.duration);
});

// Play / Pause button
playBtn.addEventListener("click", () => {
  if (!audio.src) return;

  if (isPlaying) {
    audio.pause();
    playBtn.src = "./photos/player_icon3.png";
  } else {
    audio.play();
    playBtn.src = "./photos/player_icon4.png";
  }
  isPlaying = !isPlaying;
});

// Click song poster → play different song
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const song = card.getAttribute("data-song");
    if (!song) return; // ignore non-song cards

    audio.src = song;
    audio.play();

    playBtn.src = "./photos/player_icon4.png";
    isPlaying = true;
  });
});

// Progress update
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  progressBar.value = (audio.currentTime / audio.duration) * 100;
  currTime.textContent = formatTime(audio.currentTime);
});

// Seek
progressBar.addEventListener("input", () => {
  if (!audio.duration) return;
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});
