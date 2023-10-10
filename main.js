const T9 = {
    isT9Enabled: false,
    lastKey: null,
    lastKeyTime: 0,
    keyClickCount: 0,
    isUppercase: false,
    keysChars: {
        1: ['.', ',', '1'],
        2: ['a', 'b', 'c', '2'],
        3: ['d', 'e', 'f', '3'],
        4: ['g', 'h', 'i', '4'],
        5: ['j', 'k', 'l', '5'],
        6: ['m', 'n', 'o', '6'],
        7: ['p', 'q', 'r', 's', '7'],
        8: ['t', 'u', 'v', '8'],
        9: ['w', 'x', 'y', 'z', '9'],
        0: ['&nbsp;', '0'],
        '*': ['*', '+', '-'],
        '#': ['#', '##'],
    },
    keysCharsT9: {
        1: [],
        2: ['abc'],
        3: ['def'],
        4: ['ghi'],
        5: ['jkl'],
        6: ['mno'],
        7: ['pqrs'],
        8: ['tuv'],
        9: ['wxyz'],
        0: [' '],
        '*': [],
        '#': [],
    },
};
const keyboard = document.querySelector('.keyboard');
keyboard.addEventListener('click', e => {
    if (!e.target.matches('.key')) {
        return;
    }
    add(e.target.dataset.number);
});
const textInput = document.querySelector('.text .value');
const currentChar = document.querySelector('.current-char');

function setUppercase(val = true) {
    T9.isUppercase = val;
    if (val) {
        keyboard.classList.add('uppercase');
    } else {
        keyboard.classList.remove('uppercase');
    }
}

function add(key) {
    T9.isT9Enabled
        ? addT9(key)
        : addSimple(key);
}

function addSimple(key) {
    const isOverTime = Date.now() - T9.lastKeyTime > 1000;
    if (T9.lastKey !== key || isOverTime) {
        textInput.innerHTML += currentChar.innerHTML;
        T9.keyClickCount = 0;
    } else {
        T9.keyClickCount++;
    }
    T9.lastKey = key;
    T9.keyClickCount = T9.keyClickCount % T9.keysChars[key].length;
    const char = T9.keysChars[key][T9.keyClickCount];
    if (char === '##') {
        setUppercase();
        currentChar.innerHTML = '';
        return;
    }

    currentChar.innerHTML = T9.isUppercase ? char.toUpperCase() : char;
    T9.lastKeyTime = Date.now();
    setUppercase(false);
}

function addT9(key) {

}
