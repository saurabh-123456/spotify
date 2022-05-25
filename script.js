console.log("welcome to spotify");


//initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');

let myProgress = document.getElementById('myProgress');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: "Kar Har Maidaan Fateh", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "aashayein-mere-dil-ki", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Besabriyaan", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Brothers Anthem", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Chak Lein De", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Kar Khud Ko Taiyaar Zara", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Lakshya", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Yahan Ke Ham Sikandar", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Yun Hi Chala Chal", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Zindagi Ki Yhi Reet", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
]

songItem.forEach((Element, i) => {
    // console.log(Element, i);
    Element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    Element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
// audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;

        masterPlay.classList.remove('fa-play-circle-o');
        masterPlay.classList.add('fa-pause-circle-o');
        gif.style.opacity = 1;

        let studentPlay = document.getElementById(songIndex);
        studentPlay.classList.remove('fa-play-circle-o');
        studentPlay.classList.add('fa-pause-circle-o');

    }
    else {
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.remove('fa-pause-circle-o');
        masterPlay.classList.add('fa-play-circle-o');
        gif.style.opacity = 0;

    }
})

// listen to events
audioElement.addEventListener('timeupdate', () => {
    //update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgress.value = progress;
    if (audioElement.currentTime == audioElement.duration) {
        makeAllPlays();
        if (songIndex >= 9) {
            songIndex = 0;

        }
        else {
            songIndex += 1;
        }
        audioElement.src = `songs/${songIndex + 1}.mp3`;

        let studentPlay = document.getElementById(songIndex);
        studentPlay.classList.remove('fa-play-circle-o');
        studentPlay.classList.add('fa-pause-circle-o');

        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-play-circle-o');
        masterPlay.classList.add('fa-pause-circle-o');
    }

})
myProgress.addEventListener('change', () => {
    audioElement.currentTime = (myProgress.value) * audioElement.duration / 100;

})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle-o');
        element.classList.add('fa-play-circle-o');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        songIndex = parseInt(e.target.id);
        makeAllPlays();
        if (audioElement.paused || audioElement.currentTime <= 0) {
            e.target.classList.remove('fa-play-circle-o');
            e.target.classList.add('fa-pause-circle-o');
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterSongName.innerText = songs[songIndex].songName;
            masterPlay.classList.remove('fa-play-circle-o');
            masterPlay.classList.add('fa-pause-circle-o');
        }
       else{  if (audioElement.src != `songs/${songIndex+1}.mp3`) {
           makeAllPlays();
           audioElement.src = `songs/${songIndex + 1}.mp3`;
           audioElement.play();
           e.target.classList.remove('fa-play-circle-o');
           e.target.classList.add('fa-pause-circle-o');
           gif.style.opacity = 1;
           masterSongName.innerText = songs[songIndex].songName;
           masterPlay.classList.remove('fa-play-circle-o');
           masterPlay.classList.add('fa-pause-circle-o');
           
        }
        else {
            
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle-o');
            e.target.classList.add('fa-play-circle-o');
            masterPlay.classList.remove('fa-pause-circle-o');
            masterPlay.classList.add('fa-play-circle-o');
            gif.style.opacity = 0;
        }}

    })
})
document.getElementById('next').addEventListener('click', () => {
    makeAllPlays();
    if (songIndex >= 9) {
        songIndex = 0;

    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;

    let studentPlay = document.getElementById(songIndex);
    studentPlay.classList.remove('fa-play-circle-o');
    studentPlay.classList.add('fa-pause-circle-o');

    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle-o');
    masterPlay.classList.add('fa-pause-circle-o');

})
document.getElementById('previous').addEventListener('click', () => {
    makeAllPlays();
    if (songIndex <= 0) {
        songIndex = 9;

    }
    else {
        songIndex -= 1;
    }

    let studentPlay = document.getElementById(songIndex);
    studentPlay.classList.remove('fa-play-circle-o');
    studentPlay.classList.add('fa-pause-circle-o');

    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle-o');
    masterPlay.classList.add('fa-pause-circle-o');

})
