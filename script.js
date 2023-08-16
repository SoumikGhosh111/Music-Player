let container = document.querySelector(".container"); 
let musicImg = container.querySelector(".item2 img"); 
let musicName = container.querySelector(".item3 .music-name");
let musicAlbum = container.querySelector(".item3 .music-album");
let mainAudio = container.querySelector("#main-audio"); 
let playPauseOp = container.querySelector(".play-button");
let playBtn = container.querySelector(".play-btn"); 
let pauseBtn = container.querySelector(".pause-btn"); 
let nextBtn = container.querySelector("#next"); 
let prevBtn = container.querySelector("#prev");
let progressBar = container.querySelector(".progress-bar");  
let progressArea = container.querySelector(".item4"); 
const repeatBtn = container.querySelector("#repeat-button"); 
let musicList = container.querySelector(".list-music"); 
let showList = container.querySelector("#music-list"); 
let hideList = container.querySelector("#close"); 

let musicIndx = 1;  
window.addEventListener("load", ()=>{ 
    loadMusic(musicIndx); 
}); 
function loadMusic(indexNum){ 
    musicName.innerText = songs[indexNum-1].name; 
    musicAlbum.innerText = songs[indexNum-1].album; 
    musicImg.src = `images/${songs[indexNum -1].image}`
    mainAudio.src = `songs/${songs[indexNum - 1].path}`; 
}

function playMusic(){ 
    container.classList.add("paused");
    playBtn.style.zIndex = "0"; 
    // playBtn.style.transition = "all 3s ease"; 
    pauseBtn.style.zIndex = "1";
    // pauseBtn.style.transition = "all 3s ease"; 
    mainAudio.play(); 
}
function pauseMusic(){ 
    container.classList.remove("paused"); 
    playBtn.style.zIndex = "1"; 
    pauseBtn.style.zIndex = "0";
    mainAudio.pause(); 
}

playPauseOp.addEventListener("click", ()=>{
    const isPlaying = container.classList.contains("paused"); 
    if(isPlaying){ 
        pauseMusic(); 

    }else{ 
        playMusic(); 
    }
})
prevBtn.addEventListener("click", ()=>{
    prevMusic(); 
    // console.log(1);
})
function prevMusic(){ 
    musicIndx--;
    if(musicIndx < 1){ 
        musicIndx = songs.length;
    } 
    loadMusic(musicIndx); 
    playMusic(); 
}
nextBtn.addEventListener("click", ()=>{
    nextMusic(); 
    
})
function nextMusic(){ 
    musicIndx++; 
    if(musicIndx > songs.length){ 
        musicIndx = 1; 
    } else{ 
        musicIndx = musicIndx; 
    }
    loadMusic(musicIndx); 
    playMusic(); 
}
mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration; 
    let progressWidth = (currentTime/duration)*100; 
    progressBar.style.width = `${progressWidth}%`; 

    let musicCurrentTime = container.querySelector(".current"); 
    mainAudio.addEventListener("loadeddata", ()=>{
        let musicDurationTime = container.querySelector(".duration"); 

        let audioDuration = mainAudio.duration; 
        
        
        
        let totalMin = Math.floor(audioDuration / 60);  
        let totalSec = Math.floor(audioDuration %60);
        if(totalSec < 10){ 
            totalSec = `0${totalSec}`
        } 
        musicDurationTime.innerText = `${totalMin}:${totalSec}`; 



    }) ; 
    let currentMin = Math.floor(currentTime/60); 
    let currentSec = Math.floor(currentTime % 60); 
    if(currentSec < 10){ 
        currentSec = `0${currentSec}`; 
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`; 

    
});
progressArea.addEventListener("click", (e)=>{ 
    let progresswidthVal = progressArea.clientWidth; 
    let songDuration = mainAudio.duration; 
    let clickedOffSetX = e.offsetX; 
    mainAudio.currentTime =( clickedOffSetX  / progresswidthVal ) * songDuration; 
}); 


repeatBtn.addEventListener("click", ()=>{ 
     let getText = repeatBtn.innerText; 
     switch(getText){ 
        case"repeat": 
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped") 
            break; 
        case"repeat_one": 
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffle")
            break;  
        case"shuffle": 
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped") 
            break; 
     }
});

mainAudio.addEventListener("ended",()=>{ 
    let getText = repeatBtn.innerText; 
     switch(getText){ 
        case"repeat": 
            nextMusic(); 
            break; 
        case"repeat_one": 
             mainAudio.currentTime = 0; 
             loadMusic(musicIndx); 
             playMusic();
            break;  
        case"shuffle": 
          let randIndex = Math.floor((Math.random() * songs.length) + 1); 
          do{ 
            randIndex = Math.floor((Math.random() * songs.length) + 1); 
          }while(musicIndx == randIndex); 
          musicIndx = randIndex; 
          loadMusic(musicIndx); 
          playMusic(); 
            break; 
     }
});

showList.addEventListener("click", ()=>{
    musicList.classList.toggle("list-music-show"); 
}); 
hideList.addEventListener("click", ()=>{
     showList.click(); 
}); 


let ulTag = container.querySelector("ul"); 
for(let i = 0; i<songs.length; i++){ 
    let liTag = `<li li-index = "${i+1}">
                    <div class="row">
                        <span>${songs[i].name}</span>
                        <p>${songs[i].album}</p>
                    </div>
                    <span>${songs[i].duration}</span>
                </li>`; 
    ulTag.insertAdjacentHTML("beforeend", liTag); 

    
}
const allLi = ulTag.querySelectorAll("li"); 
function playingNow(){ 
    for(let j = 0; j<allLi.length; j++){  
        if(allLi[j].getAttribute("li-index") == musicIndx){ 
            allLi[j].classList.add("playing"); 
        }
    }
}
for(let j = 0; j<allLi.length; j++){ 
    allLi[j].addEventListener("click", ()=>{
        let getIndx = allLi[j].getAttribute("li-index"); 
        musicIndx = getIndx; 
        loadMusic(musicIndx); 
        // allLi[j].classList.add("playing");
        playMusic();
        playingNow(); 
    })
}