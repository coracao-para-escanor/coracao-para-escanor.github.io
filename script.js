let heart = document.querySelector('.heart');
let joke  = heart.querySelector('.joke');
let img   = document.querySelector('.image');
let hasJoke = false;
let isDragging = false;
let alertTrigger = true;
const hasParent = (element, ...parents) => parents.some((parent) => parent.contains(element));

function addClassToHeart (e) {
    if (hasParent(e.target, heart.querySelector('.front'))) {
        heart.classList.add('touch-active');
    } else if (hasParent(e.target, joke)) {

    } else {
        heart.classList.remove('touch-active');
    };
};

function addClassToImg (e) {
    if (hasParent(e.target, img)) {
        img.classList.add('touch-active');
    } else {
        img.classList.remove('touch-active');
    };
};

function changeJoke (e) {
    if (e.target == joke) {
        if (hasJoke) {
            joke.textContent = 'estudar com você!';
            hasJoke = false;
        } else {
            joke.textContent = 'degustar sua esposa!';
            hasJoke = true;
        };
    };
};

function dragHeart (e) {
    let touch;
    if (e.touches) {
        touch = e.touches[0];
    } else {
        touch = e;
    } 

    let rect = heart.getBoundingClientRect();
    let x = touch.clientX;
    let y = touch.clientY;

    e.preventDefault();

    if (isDragging) {
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        img.style.display = 'block';
        alertTrigger = false;
    };
}

function changeGifs () {
    let ulquiorra = document.querySelector('#ulquiorra');
    let escanor   = document.querySelector('#escanor');
    let gifs      = document.querySelectorAll('body > img');

    let width = window.innerWidth;
    let height = window.innerHeight;

    if (width < height) {
        gifs.forEach((gif) => {
            gif.style.left = '50%'
            gif.style.transform = 'translate(-50%, 0)'
        });
        ulquiorra.style.top = '1vh'
        escanor.style.bottom = '1vh'
    } else {
        gifs.forEach((gif) => {
            gif.style.top = '50%'
            gif.style.transform = 'translate(0%, -50%)'
        });
        ulquiorra.style.left = '1vw'
        escanor.style.right = '1vw'
    };
}

document.addEventListener('click', (pointer) => {
    if (pointer.pointerType === 'touch') {
        addClassToHeart(pointer);
        // addClassToImg(pointer);
        changeJoke(pointer);
    };
});

joke.addEventListener('mouseenter', changeJoke);
joke.addEventListener('mouseleave', changeJoke);

heart.addEventListener('mousedown', () => {isDragging = true});
heart.addEventListener('touchstart', () => {isDragging = true});
document.addEventListener('mousemove', dragHeart);
document.addEventListener('touchmove', dragHeart);
heart.addEventListener('mouseup', () => {isDragging = false});
heart.addEventListener('touchend', () => {isDragging = false});
heart.addEventListener('mouseleave', () => {isDragging = false});

setInterval(() => {
    let title = document.title;
    if (title == 'De: Ulquiorra') {
        document.title = 'Para: Escanor';
    } else {
        document.title = 'De: Ulquiorra';
    }
}, 2000);

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (alertTrigger) {
            // alert('Que tal olhar atrás do cartão?')
        }
    }, 15000);
    changeGifs();
});

window.addEventListener('resize', changeGifs);
