const reels = document.querySelectorAll(".innerScroller");
const buttons = document.querySelectorAll("button");
const h2 = document.querySelector("h2");

const symbols = ['cherry', 'blueberry', 'orange', 'bell', 'bar', 'lemon', 'watermelon', 'banana', 'seven'];

let results;
let tokens = 100;
let bet = 0;

const getRandomItem = () => symbols[Math.floor(Math.random() * symbols.length)];
const didWin = () => results.every((i) => i === results[0]) && (tokens += bet * 1000) && alert('You Won!!')
const stopButtons = () => buttons.forEach( item => item.disabled = true);
const activateButtons = () => buttons.forEach( item => item.disabled = false);

const getResults = () => { 
    results = [];
    reels.forEach( item => results.push(getRandomItem()));
}

const activateReels = () => {
    reels.forEach(reelElement => {
        reelElement.animate([
            { transform: 'translateY(-100%)' },
            { transform: 'translateY(0%)' }
        ], {
            duration: 1000,
            iterations: 2
        })
    });
}

buttons.forEach( buttonNode => {
    buttonNode.addEventListener('click', (e) => {
        e.target.classList.contains('minButton') ? bet = 1 : bet = 20;
        if (tokens - bet < 0) { h2.innerText = 'NOT ENOUGH TOKENS!'; return; }
        e.target.classList.contains('minButton') ? tokens -= 1 : tokens -= 20;
        document.querySelector('span').innerText = `YOU GOT ${tokens} TOKENS`;
        stopButtons();
        getResults();
        activateReels();

        setTimeout(() => {
            reels.forEach( (reelElement, i) => {
                reelElement.classList.remove(...symbols);
                reelElement.classList.add(results[i]);
            });
            if (tokens > 0) {
                didWin();
            } else {
                h2.innerText = 'YOU LOST!!';
            }
            activateButtons();
        }, 2000)
    });
})

