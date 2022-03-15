const player = document.querySelector('.player');
const play = document.querySelector('.play');
const sound = document.getElementById('sound');
sound.volume = 0.75;

//      just FUN
let fly;
let vector = 100;
let x = 1;
let y = 1;
const ant = document.createElement("img");
ant.draggable = 'true';
ant.src = './assets/svg/red_ant.svg';
ant.classList.add('ant');
ant.style.transform = 'rotate(' + vector + 'deg)';
ant.style.left = 'calc(' + String(x) + 'vw - 90px)';
ant.style.top = 'calc(' + String(y) + 'vh - 260px)'
document.addEventListener('dragend', evnt => {
    x = 100 * (evnt.clientX + 35) / document.body.clientWidth;
    y = 100 * (evnt.clientY + 70) / document.body.clientHeight;
    ant.style.left = 'calc(' + String(x) + 'vw - 90px)';
    ant.style.top = 'calc(' + String(y) + 'vh - 220px)';
    //  console.log('drag  ' +evnt.clientX+' : '+evnt.clientY);
    console.log('drag  ' + x + ' : ' + y)
});
player.appendChild(ant);
function FUN(isRun = false) {
    if (isRun) {
        fly = setInterval(() => {
            x += 0.25;
            if (x > 99) x = 0;
            ant.style.left = 'calc(' + String(x) + 'vw - 90px)';
            let dy = (0.5 - Math.random()) * 0.5;
            y += 0.1 + dy;
            if (y > 100) y = 0;
            ant.style.top = 'calc(' + String(y) + 'vh - 220px)';
            vector = 100 + 6 * dy;
            ant.style.transform = 'rotate(' + vector + 'deg)';
        }, 20);
    } else {
        clearInterval(fly);
    }
}
//      END FUN


const PlayToggle = (isPlay = false) => {
    if (isPlay) {
        play.classList.remove('play_pause');
        sound.pause();
        FUN(false);             //for FUN
    } else {
        play.classList.add('play_pause');
        sound.play();
        FUN(true);              //for FUN
    }
};

play.addEventListener('click', event => {
    if (play.classList.contains('play_pause')) {
        PlayToggle(true);
    } else {
        PlayToggle(false);
    }
});

document.querySelectorAll('.birds_list').forEach((button) => {
    button.addEventListener('click', event => {
        play.style.width = '160px';
        play.style.height = '160px';
        PlayToggle(true);
        sound.src = './assets/sounds/audio_' + button.id + '.mp3';

        player.style.backgroundImage = "url('./assets/img/" + button.id + ".jpg')";

        document.querySelectorAll('.birds_list').forEach((button) => {
            button.classList.remove('birds_list_active');
        });
        button.classList.add('birds_list_active');
        setTimeout(PlayToggle(), 600);          //for autoplay

    });
});