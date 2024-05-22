'use strict';

/**
 * all music information
 */
const musicData = [
  {
    backgroundImage: "./assets/images/poster-1.jpg",
    posterUrl: "./assets/images/poster-1.jpg",
    title: "Faasle",
    album: "soon",
    year: 2000,
    artist: "FAV",
    musicPath: "./assets/music/music-1.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-2.jpg",
    posterUrl: "./assets/images/poster-2.jpg",
    title: "Agar Tum kaho",
    album: "soon",
    year: 2000,
    artist: "FAV",
    musicPath: "./assets/music/music-2.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-3.jpg",
    posterUrl: "./assets/images/poster-3.jpg",
    title: "HAR HAR GANGE",
    album: "SOON",
    year: 2000,
    artist: "FAV",
    musicPath: "./assets/music/music-3.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-4.jpg",
    posterUrl: "./assets/images/poster-4.jpg",
    title: "SINDEGATE",
    album: "SOON",
    year: 2000,
    artist: "FAV",
    musicPath: "./assets/music/music-4.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-5.jpg",
    posterUrl: "./assets/images/poster-5.jpg",
    title: "SAYAAH",
    album: "SOON",
    year: 2000,
    artist: "FAV",
    musicPath: "./assets/music/music-5.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-6.jpg",
    posterUrl: "./assets/images/poster-6.jpg",
    title: "PURNIMA KO CHANDRA",
    album: "SOON",
    year: 2000,
    artist: "FAV",
    musicPath: "./assets/music/music-6.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-7.jpg",
    posterUrl: "./assets/images/poster-7.jpg",
    title: "SHREE KRINA",
    album: "SOON",
    year: 2000,
    artist: "FAV",
    musicPath: "./assets/music/music-7.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-8.jpg",
    posterUrl: "./assets/images/poster-8.jpg",
    title: "MAT KAR MAYA KO ",
    album: "SOON",
    year: 2000,
    artist: "FAV",
    musicPath: "./assets/music/music-8.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-9.jpg",
    posterUrl: "./assets/images/poster-9.jpg",
    title: "AAFNO PRAN VANDA ",
    album: "SOON",
    year: 2000,
    artist: "FAV",
    musicPath: "./assets/music/music-9.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-10.jpg",
    posterUrl: "./assets/images/poster-10.jpg",
    title: "SUNA SUNA SUNDARE",
    album: "SOON",
    year: 2000,
    artist: "FAV",
    musicPath: "./assets/music/music-10.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-11.jpg",
    posterUrl: "./assets/images/poster-11.jpg",
    title: "GULABI SADI",
    album: "SOON",
    year: 2000,
    artist: "FAV",
    musicPath: "./assets/music/music-11.mp3",
  },
  {
    backgroundImage: "./assets/images/poster-12.jpg",
    posterUrl: "./assets/images/poster-12.jpg",
    title: "OH OH JANE WALA",
    album: "SOON",
    year: 2000,
    artist: "FAV",
    musicPath: "./assets/music/music-12.mp3",
  }
];

/**
 * add eventListnere on all elements that are passed
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

/**
 * PLAYLIST
 *
 * add all music in playlist, from 'musicData'
 */
const playlist = document.querySelector("[data-music-list]");

for (let i = 0, len = musicData.length; i < len; i++) {
  playlist.innerHTML += `
  <li>
    <button class="music-item ${i === 0 ? "playing" : ""}" data-playlist-toggler data-playlist-item="${i}">
      <img src="${musicData[i].posterUrl}" width="800" height="800" alt="${musicData[i].title} Album Poster"
        class="img-cover">

      <div class="item-icon">
        <span class="material-symbols-rounded">equalizer</span>
      </div>
    </button>
  </li>
  `;
}

/**
 * PLAYLIST MODAL SIDEBAR TOGGLE
 *
 * show 'playlist' modal sidebar when click on playlist button in top app bar
 * and hide when click on overlay or any playlist-item
 */
const playlistSideModal = document.querySelector("[data-playlist]");
const playlistTogglers = document.querySelectorAll("[data-playlist-toggler]");
const overlay = document.querySelector("[data-overlay]");

const togglePlaylist = function () {
  playlistSideModal.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("modalActive");
}

addEventOnElements(playlistTogglers, "click", togglePlaylist);

/**
 * PLAYLIST ITEM
 *
 * remove active state from last time played music
 * and add active state in clicked music
 */
const playlistItems = document.querySelectorAll("[data-playlist-item]");

let currentMusic = 0;
let lastPlayedMusic = 0;

const changePlaylistItem = function () {
  playlistItems[lastPlayedMusic].classList.remove("playing");
  playlistItems[currentMusic].classList.add("playing");
}

addEventOnElements(playlistItems, "click", function () {
  lastPlayedMusic = currentMusic;
  currentMusic = Number(this.dataset.playlistItem);
  changePlaylistItem();
});

/**
 * PLAYER
 *
 * change all visual information on player, based on current music
 */
const playerBanner = document.querySelector("[data-player-banner]");
const playerTitle = document.querySelector("[data-title]");
const playerAlbum = document.querySelector("[data-album]");
const playerYear = document.querySelector("[data-year]");
const playerArtist = document.querySelector("[data-artist]");

const audioSource = new Audio(musicData[currentMusic].musicPath);

const changePlayerInfo = function () {
  playerBanner.src = musicData[currentMusic].posterUrl;
  playerBanner.setAttribute("alt", `${musicData[currentMusic].title} Album Poster`);
  document.body.style.backgroundImage = `url(${musicData[currentMusic].backgroundImage})`;
  playerTitle.textContent = musicData[currentMusic].title;
  playerAlbum.textContent = musicData[currentMusic].album;
  playerYear.textContent = musicData[currentMusic].year;
  playerArtist.textContent = musicData[currentMusic].artist;

  audioSource.src = musicData[currentMusic].musicPath;

  audioSource.addEventListener("loadeddata", updateDuration);
  playMusic();
}

addEventOnElements(playlistItems, "click", changePlayerInfo);

/** update player duration */
const playerDuration = document.querySelector("[data-duration]");
const playerSeekRange = document.querySelector("[data-seek]");

/** pass seconds and get timcode formate */
const getTimecode = function (duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.ceil(duration - (minutes * 60));
  const timecode = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return timecode;
}

const updateDuration = function () {
  playerSeekRange.max = Math.ceil(audioSource.duration);
  playerDuration.textContent = getTimecode(Number(playerSeekRange.max));
}

audioSource.addEventListener("loadeddata", updateDuration);

/**
 * PLAY MUSIC
 *
 * play and pause music when click on play button
 */
const playBtn = document.querySelector("[data-play-btn]");

let playInterval;

const playMusic = function () {
  if (audioSource.paused) {
    audioSource.play();
    playBtn.classList.add("active");
    playInterval = setInterval(updateRunningTime, 500);
  } else {
    audioSource.pause();
    playBtn.classList.remove("active");
    clearInterval(playInterval);
  }
}

playBtn.addEventListener("click", playMusic);

/** update running time while playing music */
const playerRunningTime = document.querySelector("[data-running-time]");

const updateRunningTime = function () {
  playerSeekRange.value = audioSource.currentTime;
  playerRunningTime.textContent = getTimecode(audioSource.currentTime);

  updateRangeFill();
  isMusicEnd();
}

/**
 * RANGE FILL WIDTH
 *
 * change 'rangeFill' width, while changing range value
 */
const ranges = document.querySelectorAll("[data-range]");
const rangeFill = document.querySelectorAll("[data-range-fill]");

const updateRangeFill = function () {
  for (let i = 0, len = ranges.length; i < len; i++) {
    rangeFill[i].style.width = `${(ranges[i].value / ranges[i].max) * 100}%`;
  }
}

addEventOnElements(ranges, "input", updateRangeFill);

/**
 * SEEK MUSIC
 *
 * seek music while changing player seek range
 */
const seek = function () {
  audioSource.currentTime = playerSeekRange.value;
  playerRunningTime.textContent = getTimecode(playerSeekRange.value);
}

playerSeekRange.addEventListener("input", seek);

/**
 * MUSIC END
 *
 * if current music ends, then play next music
 */
const isMusicEnd = function () {
  if (audioSource.ended) {
    nextMusic();
  }
}

/**
 * REPEAT BUTTON
 *
 * repeat one music or all music when click repeat button
 */
const repeatBtn = document.querySelector("[data-repeat]");

let repeatMode = "repeat";

const repeat = function () {
  if (repeatMode === "repeat") {
    repeatMode = "repeat_one";
    repeatBtn.classList.add("active");
    repeatBtn.textContent = "repeat_one";
  } else {
    repeatMode = "repeat";
    repeatBtn.classList.remove("active");
    repeatBtn.textContent = "repeat";
  }
}

repeatBtn.addEventListener("click", repeat);

/**
 * SHUFFLE
 *
 * change music item randomly
 */
const shuffleBtn = document.querySelector("[data-shuffle]");

let isShuffled = false;

const shuffle = function () {
  isShuffled = !isShuffled;
  shuffleBtn.classList.toggle("active");
}

shuffleBtn.addEventListener("click", shuffle);

/**
 * SKIP NEXT MUSIC
 *
 * if 'repeatMode' is 'repeat_one', then repeat current music
 * if 'isShuffled' is 'true', then change random music
 * if last music ends, then play first music
 */
const nextBtn = document.querySelector("[data-skip-next]");

const nextMusic = function () {
  if (repeatMode === "repeat_one") {
    audioSource.currentTime = 0;
    playMusic();
  } else if (isShuffled) {
    let randomMusic = Math.floor(Math.random() * musicData.length);
    currentMusic = randomMusic;
    changePlayerInfo();
    changePlaylistItem();
  } else {
    lastPlayedMusic = currentMusic;
    currentMusic++;
    if (currentMusic === musicData.length) currentMusic = 0;
    changePlayerInfo();
    changePlaylistItem();
  }
}

nextBtn.addEventListener("click", nextMusic);

/**
 * SKIP PREVIOUS MUSIC
 */
const prevBtn = document.querySelector("[data-skip-prev]");

const prevMusic = function () {
  lastPlayedMusic = currentMusic;
  currentMusic--;
  if (currentMusic < 0) currentMusic = musicData.length - 1;
  changePlayerInfo();
  changePlaylistItem();
}

prevBtn.addEventListener("click", prevMusic);

/**
 * VOLUME
 *
 * mute volume when volumn button is clicked
 * and change volume when range is changed
 */
const volumeBtn = document.querySelector("[data-volume-btn]");
const volumeRange = document.querySelector("[data-volume]");

let lastVolume = 0.5;
audioSource.volume = lastVolume;

const changeVolume = function () {
  audioSource.volume = volumeRange.value;
  lastVolume = volumeRange.value;
  volumeBtn.textContent = (volumeRange.value === 0) ? "volume_off" : "volume_up";
}

volumeRange.addEventListener("input", changeVolume);

const muteVolume = function () {
  if (audioSource.volume === 0) {
    audioSource.volume = lastVolume;
    volumeRange.value = lastVolume;
    volumeBtn.textContent = "volume_up";
  } else {
    lastVolume = audioSource.volume;
    audioSource.volume = 0;
    volumeRange.value = 0;
    volumeBtn.textContent = "volume_off";
  }

  updateRangeFill();
}

volumeBtn.addEventListener("click", muteVolume); 

/**
 * DOWNLOAD BUTTON
 *
 * download the currently playing music when clicked
 */
const downloadBtn = document.createElement('button');
downloadBtn.classList.add('btn-icon');
downloadBtn.innerHTML = '<span class="material-symbols-rounded">download</span>';
document.querySelector('.player-control.wrapper').appendChild(downloadBtn);

const downloadMusic = function () {
  const link = document.createElement('a');
  link.href = musicData[currentMusic].musicPath;
  link.download = musicData[currentMusic].title;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

downloadBtn.addEventListener('click', downloadMusic);
