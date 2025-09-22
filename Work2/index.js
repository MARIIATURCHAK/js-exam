const wrapperDiv = document.getElementById('wrapper');

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        for (const {id, name} of users) {
            const userDiv = document.createElement('div');
            userDiv.classList.add('userDiv');
            const userId = document.createElement('p');
            userId.innerText = `ID: ${id}`;
            const userName = document.createElement('p');
            userName.innerText = `Name: ${name}`;
            const button = document.createElement('button');
            button.innerText = 'Info';
            button.classList.add('userButton');
            button.addEventListener('click', () => {
                localStorage.setItem('currentUserId', id);
                location.href = 'user-details.html';
            });
            userDiv.append(userId, userName, button);
            wrapperDiv.appendChild(userDiv);
        }
    });


