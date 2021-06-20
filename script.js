const play = document.getElementById('play')
const img = document.querySelector("img")
const music = document.querySelector("audio")
const artist = document.getElementById("artist")
const title = document.getElementById("title")
const prev = document.getElementById("prev")
const next = document.getElementById("next")

let progress = document.getElementById("progress")
let total_duration = document.getElementById("duration")
let current_time = document.getElementById("curr_time")
const progress_div = document.getElementById("progress_div")

const songs = [
  {
    name: "music1",
    title: "song 1",
    artist: "artist 1"
  },
  {
    name: "music2",
    title: "song 2",
    artist: "artist 2"
  },
  {
    name: "music3",
    title: "song 3",
    artist: "artist 3"
  },
]

let isPlaying = false

const playMusic = () => {
  isPlaying = true
  music.play()
  play.classList.replace('fa-play', 'fa-pause')
  img.classList.add("anime")
}
const pauseMusic = () => {
  isPlaying = false
  music.pause()
  play.classList.replace('fa-pause', 'fa-play')
  img.classList.remove("anime")
}

play.addEventListener('click', () => {
  if (isPlaying) {
    pauseMusic()
  } else {
    playMusic()
  }
})

// **** Changing Songs Data ***** 
const loadSong = (songs) => {
  title.textContent = songs.title
  artist.textContent = songs.artist
  music.src = "music/" + songs.name + ".mp3"
  img.src = "images/" + songs.name + ".jpg"
}
songIndex = 0
// loadSong(songs[0])

const nextSong = () => {
  songIndex = (songIndex + 1) % songs.length
  loadSong(songs[songIndex])
  playMusic()
}
const prevSong = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length
  loadSong(songs[songIndex])
  playMusic()
}

// ***** PROGRESS BAR **** ------->>>>
music.addEventListener('timeupdate', (event) => {
  // console.log(event)
  const { currentTime, duration } = event.srcElement
  // console.log(currentTime)
  let progress_time = (currentTime / duration) * 100
  progress.style.width = `${progress_time}%`

  // ****** duration update ****
  let minute_duration = Math.floor(duration / 60)
  let secs_duration = Math.floor(duration % 60)

  let curr_total_duration = `${minute_duration}:${secs_duration}`
  if (duration) {
    total_duration.textContent = `${curr_total_duration}`
  }


  let minute_current_time = Math.floor(currentTime / 60)
  let secs_current_time = Math.floor(currentTime % 60)

  if (secs_current_time < 10) {
    secs_current_time = `0${secs_current_time}`
  }
  let currTime = `${minute_current_time}:${secs_current_time}`
  current_time.textContent = `${currTime}`
})
// ******Skip Functionality  --->>>>
progress_div.addEventListener('click', (event) => {
  // console.log(event)
  const { duration } = music

  let move_prog_bar = (event.offsetX / event.srcElement.clientWidth) * duration
  // console.log(duration, move_prog_bar)
  music.currentTime = move_prog_bar
})


music.addEventListener('ended', nextSong)      //Plays the next song automaticaly if current song ends 

next.addEventListener('click', nextSong)
prev.addEventListener('click', prevSong)