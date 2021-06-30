const els = {
    score: null,
    answer: null,
    choices: null
};

const words = [
    'PATIN',
    'MERLE',
    'BRETZEL',
    'LOUTRE',
    'BON ENDROIT',
    'CENSURER',
    'MAUVAIS ENDROIT',
    'CANARD',
    'ENFERMES',
    'CASSE MOULES',
    'FAIS SKIER',
    'SALE FLUTE',
    'GALOPE',
    'SONNERIE',
    'MERLER',
    'DESONNER',
    'COLLE',


];

let choices = [];
let word = '';
let wordMapping = [];
let choicesMapping = [];
let scoreCount = 0;
let maxScore = 10;

const init = () => {
    //  test console.log('>> #init');

    // rattacher les éléments
    els.score = document.getElementById("score");
    els.answer = document.querySelector('#answer');
    els.choices = document.querySelector('#choices');


    // Choisir un mot
    word = pickWord();
    //  test console.log('word', word);
    //      - créer un word mapping
    wordMapping = getWordMapping(word);
    //  test console.log('wordMapping', wordMapping);
    // Générer des choix
    choices = generateChoices();
    //  test console.log(choices);
    //      - créer un mapping des choix
    choicesMapping = getChoicesMapping(choices);
    //  test console.log(choicesMapping);
    // Display le mot
    displayWord(wordMapping);
    // Display les choix
    displayChoices(choicesMapping);
    // Display le score
    displayScore();
    // listen events
    //      - mouse events
    els.choices.addEventListener('click', ({target}) => {
        //evt:MouseEvent evt.target => { target }
        if (target.matches('li')) {
            checkLetter(target.innerHTML);
        }
    });
    //      - keyboard events
    document.addEventListener('keydown', ({ keyCode }) => {
    // evt:KeyboardEvent evt.keyCode => { keyCode }
    //   test console.log('keyCode', keyCode);
        const letter = String.fromCharCode(keyCode);
    //   test console.log('letter', letter);
    if(keyCode >= 65 && keyCode <= 90) {
     checkLetter(letter); 
    }
    });

    // check les lettres
    //      - if pas dans le mot : add score
    //      - if dans le mot : display la lettre
    //      - endGame
    //          - if score == max : loseGame
    //          - if les lettres sont toutes visibles : winGame
};

const checkLetter = (letter) => {
    console.log(letter);
    let isLetterInWord = false;
    let isAllLettersFound = true;
    //   test console.log('isLetterInWord before loop', isLetterInWord);
    wordMapping.forEach((letterMapping) => {
        if (letterMapping.letter === letter) {
            letterMapping.isVisible = true;
            isLetterInWord = true;
        }
        if (!letterMapping.isVisible) {
            isAllLettersFound = false;
        }
    });

    choicesMapping.forEach((letterMapping) => {
        if (letterMapping.letter === letter) {
            letterMapping.isChosen = true;
        }   
     });

     displayChoices(choicesMapping);
    if (isLetterInWord === true) {
        displayWord(wordMapping);
    } else { 
        scoreCount++;

        displayScore();
    }  
    
    if(scoreCount === maxScore) {
        endGame();
    }
    if (isAllLettersFound) {
        winGame();
    }
    //  test console.log('isLetterInWord after loop', isLetterInWord);
};

const displayChoices = (choicesMapping) => {
    const choicesHtml = choicesMapping.map((letterMapping) => {
        if (letterMapping.isChosen === false) {
            return `<li>${letterMapping.letter}</li>`;
        } else {
            return `<li class='disabled'>${letterMapping.letter}</li>`;
        }
    });

    els.choices.querySelector('ul').innerHTML = choicesHtml.join('');
};

const displayScore = () => { 
    document.querySelector('body').style.backgroundImage = "url(https://cinefusion.files.wordpress.com/2014/02/the-conjuring.jpg)";
    els.score.innerHTML = `${scoreCount} / ${maxScore}`;
    
};

const displayWord = (wordMapping) => {
   const wordHtml = wordMapping.map((letterMapping) => {
       if (letterMapping.isVisible === true) {
           return `<li>${letterMapping.letter}</li>`;
       } else {
           return `<li>_</li>`;
       }
   });
   els.answer.querySelector('ul').innerHTML = wordHtml.join('');
};

const endGame = () => {
    wordMapping.forEach(w => w.isVisible = true);
    displayWord(wordMapping);
    document.querySelector('body').style.backgroundImage = "url(http://4.bp.blogspot.com/-biJ1NY-cIxE/UG9Kpspzc_I/AAAAAAAABSE/jlaoDsnwqHA/s1600/sini2.gif";
    els.choices.innerHTML = `<h1 style= color:red;> You died !</h1>`;
    
};
const winGame = () => {
    document.querySelector('body').style.backgroundImage = "url(https://64.media.tumblr.com/cfa9c1e494e008ee7e638115789d13c1/tumblr_o7dvaeoxgh1rp0vkjo1_500.gif";
    els.choices.innerHTML = `<h1 style= color:green;> Félicitations, Tu es en vie.... pour le moment ! </h1>`;
}

const generateChoices = () => {
    const choices = [];
        for(let index = 65; index <= 90; index++) {
            choices.push(String.fromCharCode(index));
    }
        return choices;
};

const getChoicesMapping = (choices) => {
    const choicesMapping = choices.map((letter) => {
        return { 
            letter,
            isChosen: false
        };
    });

        return choicesMapping;
};

const getWordMapping = () => {
    const wordArr = word.split('');
    //  test console.log('word', word);
    //  test console.log('wordArr', wordArr);
    const wordMapping = wordArr.map((letter, index) =>{
        let isVisible = false;
        if (index === 0 || index == wordArr.length -1 || letter ==" ")  {
            isVisible = true;
        }
        return {
            letter,
            isVisible
        };
    });
        return wordMapping;
};

const pickWord = () => {
    const randomIndex = getRandomInt(0, words.length - 1);
        return words[randomIndex];
};

window.addEventListener('load', () => {
    init();
});

function play () {
    init();
}

function exit() {
    window.close();
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}