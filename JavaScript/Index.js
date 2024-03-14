const shuffler = document.getElementById('shuffleBtn');
const pictures = document.getElementById('pictures');
counter = 0;
chechedCounter = 0;

document.addEventListener('DOMContentLoaded', () => createPictures());

shuffler.addEventListener('click', () => createPictures());

function createPictures() {
    const numbers = [...Array(9).keys()].map(x => x + 1);
    const double = numbers.concat(numbers);

    shuffleArray(double);

    if (pictures.hasChildNodes()) {
        pictures.innerHTML = '';
        counter = 0;
        for (let i = 0; i < 18; i++) {
            const picture = document.createElement('div');
            picture.classList.add('picture', `flipped-${double[i]}`);
            pictures.appendChild(picture);
        }
    } else {
        for (let i = 0; i < 18; i++) {
            const picture = document.createElement('div');
            picture.classList.add('picture', `flipped-${double[i]}`);
            pictures.appendChild(picture);
        }
    }

    for (const picture of pictures.children) {
        picture.onclick = () => {
            if (counter < 2) {
                if (!picture.classList.contains('clicked')) {
                    picture.classList.add('clicked');
                    counter++;
                } else {
                    picture.classList.remove('clicked');
                    counter--;
                }
            } 
            if (counter === 2) {
                setTimeout(() => {
                    checkMatch();
                    resetPictures();
                }, 1500);
            }
        };
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function resetPictures() {
    for (const picture of pictures.children) {
        picture.classList.remove('clicked');
    }
    counter = 0;
}

function checkMatch() {
    const clicked = document.querySelectorAll('.clicked');
    const first = clicked[0].classList[1];
    const second = clicked[1].classList[1];

    if (first === second) {
        for (const picture of clicked) {
            picture.style.opacity = 0;
            picture.style.cursor = 'default'
            chechedCounter++;
            console.log(chechedCounter);
            wonGame();
        }
    }
}

function wonGame() {
    if (chechedCounter === 18) {
        const win = document.createElement('h1');
        win.classList.add('win');
        win.innerHTML = 'You won!';
        pictures.innerHTML = '';
        pictures.appendChild(win);
        chechedCounter = 0;
    }
}