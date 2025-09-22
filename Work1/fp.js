const pairInput = document.getElementById('pairInput');
const pairList = document.getElementById('pairList');
const addBtn = document.getElementById('addBtn');
const sortNameBtn = document.getElementById('sortNameBtn');
const sortValueBtn = document.getElementById('sortValueBtn');
const deleteBtn = document.getElementById('deleteBtn');
function addPair() {
    const inputValue = pairInput.value;
    const splitInput = inputValue.split('=');
    if (splitInput.length !== 2) {
        alert('Invalid format. Use Name = Value');
    } else {
        const name = splitInput[0].trim();
        const value = splitInput[1].trim();
        if (!name || !value) {
            alert('Name or Value cannot be empty');
            return;
        }
        const regex = /^[a-zA-Z0-9]+$/;
        if (!regex.test(name) || !regex.test(value)) {
            alert('Only Latin letters and digits are allowed');
            return;
        }
        const liList = document.createElement('li');
        liList.textContent = name + '=' + value;
        liList.addEventListener('click', function() {
            liList.classList.toggle('selected');
        });
        pairList.append(liList)
        pairInput.value = '';
    }
}
pairInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addPair();
    }
});
function sortNamePair() {
    const names = Array.from(pairList.getElementsByTagName('li'));
    names.sort((a, b) => {
        const aName = a.textContent.split('=')[0];
        const bName = b.textContent.split('=')[0];
        if (aName > bName) return 1;
        if (aName < bName) return -1;
        return 0;
    });
    pairList.innerHTML = '';
    names.forEach(name => pairList.appendChild(name));
}
function sortValuePair() {
    const values = Array.from(pairList.getElementsByTagName('li'));
    values.sort((a, b) => {
        const aValue = a.textContent.split('=')[1];
        const bValue = b.textContent.split('=')[1];
        if (aValue > bValue) return 1;
        if (aValue < bValue) return -1;
        return 0;
    });
    pairList.innerHTML = '';
    values.forEach(value => pairList.appendChild(value));
}
function deletePair() {
    const items = pairList.getElementsByTagName('li');
    let anySelected = false;
    for (let i = items.length - 1; i >= 0; i--) {
        if (items[i].classList.contains('selected')) {
            pairList.removeChild(items[i]);
            anySelected = true;
        }
    }
    if (!anySelected) {
        pairList.innerHTML = '';
    }
}
sortNameBtn.addEventListener('click', sortNamePair);
sortValueBtn.addEventListener('click', sortValuePair);
deleteBtn.addEventListener('click', deletePair);
addBtn.addEventListener('click', addPair);