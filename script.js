
const title = document.getElementById('title');
const artist = document.getElementById('artist');

// const image = document.querySelector('img')
const image = document.getElementById('image')
const music = document.querySelector('audio');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
    {
        name: 'do-i-wanna-know',
        displayName: 'Do-i-wanna-know',
        artist: 'Arctic Monkey',
        image: 'do-i-wanna-know-img'
    },
    {
        name: 'godfather',
        displayName: 'Godfather',
        artist: 'Unknown',
        image: 'godfather-img'
    },
    {
        name: 'incir',
        displayName: 'Incir',
        artist: 'Ilyas Yalchindas',
        image: 'ilyas-yalchindas-img'
    }
];

let isPlaying = false;

//reserved keywords
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause(); //audio library
}

//CallBack
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
// playBtn.addEventListener('click', function() {( isPlaying ? pauseSong() : playSong() )});

//Ternary operator
// isPaidStudent ? hsahfaa : jsjfasnf;
// if else

// FAKE DB FUNCTION
function loadSong(mahni) {
    title.textContent = mahni.displayName;
    artist.textContent = mahni.artist;
    music.src = `./musics/${mahni.name}.mp3`  
};

function loadimage(sekil){
    image.src = `./images/${sekil.image}.jpg`
}

let songIndex = 0;

// PREVIOUS SONG
function prevSong() {
    songIndex--;
    // DECREMENT
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    };

    loadSong(songs[songIndex]);
    loadimage(songs[songIndex])
    playSong();
}

// NEXT SONG
function nextSong() {
    songIndex++;
    // INCREMENT
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    };

    loadSong(songs[songIndex]);
    loadimage(songs[songIndex])
    playSong();
}

//OOP - Object Destructuring
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement
        // Asaqidakilara beraberdir...
        // const x = e.srcElement.duration
        // const y = e.srcElement.currentTime
        const progressPercent = (currentTime/duration)*100
        progress.style.width = `${progressPercent}%`

        //Calculate display for duration
        const durationMinutes = Math.floor(duration/60)
        const durationSeconds = Math.floor(duration%60)
        //Const - Error

        if(durationSeconds<10){
            durationSeconds = `0${durationSeconds}`
        }
        
        if(durationSeconds){
            durationEl.innerText = `${durationMinutes}:${durationSeconds}`
        }

        //CurrentTime calculate

        const currentMinutes = Math.floor(currentTime/60)
        let currentSeconds = Math.floor(currentTime%60)
        // 0:9

        if(currentSeconds<10){
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`

    }
}

function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width) * duration;
}


// HADISE DINLEYICILERI
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar)