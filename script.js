console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 1;

let audioElement = new Audio("Z-Assets/songs/1.mp3");

let masterPlay = document.getElementById("masterPlay");
console.log(masterPlay);

let progressBar = document.getElementById("progressBar");

let gif = document.getElementById("gif");

let songItems = Array.from(document.getElementsByClassName("songItem"));

let masterSongName = document.getElementById("masterSongName");

let songs = [
  {
    songName: "Badra Bahaar",
    filePath: "Z-Assets/songs/1.mp3",
    coverPath: "Z-Assets/covers/1.jpg",
  },
  {
    songName: "Desi Girl",
    filePath: "Z-Assets/songs/2.mp3",
    coverPath: "Z-Assets/covers/2.jpg",
  },
  {
    songName: "Dholida",
    filePath: "Z-Assets/songs/3.mp3",
    coverPath: "Z-Assets/covers/3.jpg",
  },
  {
    songName: "Dilli-6",
    filePath: "Z-Assets/songs/4.mp3",
    coverPath: "Z-Assets/covers/4.jpg",
  },
  {
    songName: "Hey Shona",
    filePath: "Z-Assets/songs/5.mp3",
    coverPath: "Z-Assets/covers/5.jpg",
  },
  {
    songName: "Haan Tu Hai",
    filePath: "Z-Assets/songs/6.mp3",
    coverPath: "Z-Assets/covers/6.jpg",
  },
  {
    songName: "Happy Diwali",
    filePath: "Z-Assets/songs/7.mp3",
    coverPath: "Z-Assets/covers/7.jpg",
  },
  {
    songName: "Jugni",
    filePath: "Z-Assets/songs/8.mp3",
    coverPath: "Z-Assets/covers/8.jpg",
  },
  {
    songName: "Jugnu",
    filePath: "Z-Assets/songs/9.mp3",
    coverPath: "Z-Assets/covers/9.jpg",
  },
  {
    songName: "Mujhko Barsat Bana Lo",
    filePath: "Z-Assets/songs/10.mp3",
    coverPath: "Z-Assets/covers/10.jpg",
  },
];

songItems.forEach((element, i) => {
  // console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    console.log("Played");
    masterPlay.src = "Z-Assets/Icons/pause.svg";
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.src = "Z-Assets/Icons/play.svg";
    gif.style.opacity = 0;
  }
});

// Listen to Events
audioElement.addEventListener("timeupdate", () => {
  //   update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  progressBar.value = progress;
});

progressBar.addEventListener("input", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));

const makeAllPlays = () => {
  songItemPlay.forEach((element) => {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  });
};

songItemPlay.forEach((element) => {
  element.addEventListener("click", (e) => {
    makeAllPlays(); //sbko play ka icon de dega

    songIndex = parseInt(e.target.id);
    // console.log(songIndex);

    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");

    audioElement.src = `Z-Assets/songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex - 1].songName;

    masterPlay.src = "Z-Assets/Icons/pause.svg";
  });
});

let previous = document.getElementById("previous");

let next = document.getElementById("next");

next.addEventListener("click", (e) => {
  if (songIndex >= 10) {
    songIndex = 1;
  } else {
    songIndex += 1;
  }

  audioElement.src = `Z-Assets/songs/${songIndex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  //   console.log(songIndex);
  masterSongName.innerText = songs[songIndex - 1].songName;

  masterPlay.src = "Z-Assets/Icons/pause.svg";
});

previous.addEventListener("click", () => {
  if (songIndex <= 1) {
    songIndex = 10;
  } else {
    songIndex -= 1;
  }

  audioElement.src = `Z-Assets/songs/${songIndex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  //   console.log(songIndex);

  masterSongName.innerText = songs[songIndex - 1].songName;

  masterPlay.src = "Z-Assets/Icons/pause.svg";
});

// progressBar.addEventListener("input", () => {
//   console.log(progressBar.value);
//   audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
//   audioElement.play();
// });
