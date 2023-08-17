// Variables
const musicTitle = document.querySelector(".music-info");

// playpause previous next
const prevBtn = document.querySelector(".previous-btn-wrapper");
const nextBtn = document.querySelector(".next-btn-wrapper");
const playPauseBtn = document.querySelector(".play-pause-btn-wrapper");
const repeat = document.querySelector("#repeat-plist");


// timer config
let currentTime = document.querySelector(".current-time");
let musicSlider = document.querySelector(".music-slider");
let endTime = document.querySelector(".total-duration");

// volume
let volumeSlider = document.querySelector(".volume-slider");

// flag for play pause
let isPlaying = false;

// create new music object and set default music
let musicObj = document.createElement("audio");
musicObj.src =
  "vaathi.mp3";

// Update music slider
setInterval(updateMusicSlider, 500);

// update color for prev and next btn
changePrevNextColor();

/* ** Event Listner for various events ** */

// event listner for play pause
playPauseBtn.addEventListener("click", () => {
  // console.log(musicObj.duration);
  playpauseTrack();
});

// event listner for next music button
nextBtn.addEventListener("click", () => {
  isPlaying = false;
  const resultObj = dll.traverse(1);

  if (resultObj != 0) {
    musicObj.src = resultObj.path;
    playpauseTrack();
  }
  changeMusicTitle(resultObj.name);
  changePrevNextColor();
});

// event listner for previous button
prevBtn.addEventListener("click", () => {
  isPlaying = false;
  const resultObj = dll.traverse(-1);

  if (resultObj != 0) {
    musicObj.src = resultObj.path;
    playpauseTrack();
  }
  changeMusicTitle(resultObj.name);
  changePrevNextColor();
});

repeat.addEventListener("click", () => {
  let getText = repeat.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      repeat.innerText = "repeat_one";
      repeat.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeat.innerText = "repeat";
      repeat.setAttribute("title", "Playlist looped");
      break;
  }});
  musicObj.addEventListener("ended", ()=>{
    // we'll do according to the icon means if user has set icon to
    // loop song then we'll repeat the current song and will do accordingly
    let getText = repeat.innerText; //getting this tag innerText
    switch(getText){
      case "repeat":
        
          const resultObj = dll.traverse(1);
          musicObj.src = resultObj.path;
          playTrack();
          changeMusicTitle(resultObj.name);
        
        
        break;
      case "repeat_one":
        isPlaying= true; //setting audio current time to 0
         //calling loadMusic function with argument, in the argument there is a index of current song
        playTrack(); //calling playMusic function
        break;
  }});
  const shuffle = document.querySelector("#shuffle-plist");
  shuffle.addEventListener("click", () => {
    let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //genereting random index/numb with max range of array length
      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      }while(MusicPos == randIndex); //this loop run until the next random number won't be the same of current musicIndex
      MusicPos = randIndex; //passing randomIndex to musicIndex
   
      playpauseTrack();
      

  });
// event listner for changing volume of music
volumeSlider.addEventListener("change", () => {
  musicObj.volume = volumeSlider.value / 100;
});

// event listner for changing position of music
musicSlider.addEventListener("change", () => {
  changeMusicPos();
});
