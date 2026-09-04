const audio = document.getElementById("audio");
const title = document.getElementById("title");
const gallery = document.getElementById("gallery");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

let songs = [];

// 🔥 نربط كل صورة مع أغنية بنفس الرقم
for (let i = 1; i <= 50; i++) {
  songs.push({
    title: "Song " + i,
    src: "أناشيد كشفية  شدو الرحال النسخة الأصلية + الكلمات.mp3" + i + ".mp3",
    cover: "tp1" + i + ".tp1.png"
  });
}

let current = 0;

// 🔥 إنشاء الكروت (image + title)
songs.forEach((song, index) => {
  let div = document.createElement("div");
  div.className = "card";
  div.onclick = () => selectSong(index);

  div.innerHTML = `
    <img src="${song.cover}">
    <p>${song.title}</p>
  `;

  gallery.appendChild(div);
});

// select song
function selectSong(index) {
  current = index;
  audio.src = songs[current].src;
  title.innerText = songs[current].title;
  audio.play();
}

// play / pause
function togglePlay() {
  if (audio.paused) audio.play();
  else audio.pause();
}

// next
function next() {
  current = (current + 1) % songs.length;
  selectSong(current);
}

// prev
function prev() {
  current = (current - 1 + songs.length) % songs.length;
  selectSong(current);
}

// progress
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

progress.oninput = () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
};

// volume
volume.oninput = () => {
  audio.volume = volume.value / 100;
};