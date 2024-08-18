console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 1;

let audioElement = new Audio("Z-Assets/songs/1.mp3");

let masterPlay = document.getElementById("masterPlay");

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

function getAudioDuration(audioElement) {
  return new Promise((resolve) => {
    audioElement.onloadedmetadata = function () {
      let duration = Math.floor(audioElement.duration); // Get duration in seconds
      let minutes = Math.floor(duration / 60);
      let seconds = duration % 60;
      let formattedDuration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; // Format as minutes:seconds
      resolve(formattedDuration);
    };
  });
}

songItems.forEach((element, i) => {
  // Set the cover image and song name
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

  // Create a new audio element to get the duration
  const audioElement = new Audio(songs[i].filePath);
  audioElement.preload = "metadata"; // Ensure metadata is loaded

  // Get the duration and set it to the timestamp
  getAudioDuration(audioElement).then((duration) => {
    element.getElementsByClassName("timestamp")[0].innerText = duration;
  });
});

// Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
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

  

  if (audioElement.currentTime == audioElement.duration) {
    audioElement.pause();
    masterPlay.src = "Z-Assets/Icons/play.svg";
    gif.style.opacity = 0;
  }
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
    makeAllPlays();

    songIndex = parseInt(e.target.id);
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");

    audioElement.src = `Z-Assets/songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    progressBar.value = 0; // Reset progress bar
    masterSongName.innerText = songs[songIndex - 1].songName;

    audioElement.addEventListener("loadeddata", () => {
      playSong();
    });
  });
});

let next = document.getElementById("next");
let previous = document.getElementById("previous");

function playSong() {
  audioElement.play();
  masterPlay.src = "Z-Assets/Icons/pause.svg";
  gif.style.opacity = 1;
}

next.addEventListener("click", () => {
  if (songIndex >= 10) {
    songIndex = 1;
  } else {
    songIndex += 1;
  }

  audioElement.src = `Z-Assets/songs/${songIndex}.mp3`;
  audioElement.currentTime = 0;
  progressBar.value = 0; // Reset progress bar
  masterSongName.innerText = songs[songIndex - 1].songName;

  audioElement.addEventListener("loadeddata", () => {
    playSong();
  });
});

previous.addEventListener("click", () => {
  if (songIndex <= 1) {
    songIndex = 10;
  } else {
    songIndex -= 1;
  }

  audioElement.src = `Z-Assets/songs/${songIndex}.mp3`;
  audioElement.currentTime = 0;
  progressBar.value = 0; // Reset progress bar
  masterSongName.innerText = songs[songIndex - 1].songName;

  audioElement.addEventListener("loadeddata", () => {
    playSong();
  });
});

// progressBar.addEventListener("input", () => {
//   console.log(progressBar.value);
//   audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
//   audioElement.play();
// });
