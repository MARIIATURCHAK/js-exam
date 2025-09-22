const userId = localStorage.getItem('currentUserId');
const userInfoDiv = document.getElementById('userInfo');

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json())
    .then(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('userFullInfo');
        userDiv.innerHTML = `
            <h3>Id: ${user.id}</h3>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
        `;
        const addressDiv = document.createElement('div');
        addressDiv.classList.add('addressInfo');
        addressDiv.innerHTML = `
        <h4>Address:</h4>
            <p><strong>Street:</strong> ${user.address.street}</p>
            <p><strong>Suite:</strong> ${user.address.suite}</p>
            <p><strong>City:</strong> ${user.address.city}</p>
            <p><strong>Zipcode:</strong> ${user.address.zipcode}</p>
            <p><strong>Geo:</strong> Lat ${user.address.geo.lat}, Lng ${user.address.geo.lng}</p>
            `;
        const userContacts = document.createElement('div');
        userContacts.classList.add('userContacts');
        userContacts.innerHTML = `
        <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
            `;
        const companyDiv = document.createElement('div');
        companyDiv.classList.add('companyInfo');
        companyDiv.innerHTML = `
        <h4>Company:</h4>
            <p><strong>Name:</strong> ${user.company.name}</p>
            <p><strong>CatchPhrase:</strong> ${user.company.catchPhrase}</p>
            <p><strong>BS:</strong> ${user.company.bs}</p>
            `;
        const postsButton = document.createElement('button');
        postsButton.innerText = 'post of current user';
        postsButton.classList.add('postButton');
        postsButton.addEventListener('click', () => {
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                .then(response => response.json())
                .then(posts => {
                    const postsWrapper = document.createElement('div');
                    postsWrapper.classList.add('postsWrapper');
                    posts.forEach(post => {
                        const postDiv = document.createElement('div');
                        postDiv.classList.add('postDiv');
                        const title = document.createElement('h4');
                        title.innerText = post.title;
                        const postLink = document.createElement('button');
                        postLink.innerText = 'View Details';
                        postLink.classList.add('postLink');
                        postLink.addEventListener('click', () => {
                            localStorage.setItem('currentPostId', post.id);
                            location.href = 'post-details.html';
                        });
                        postDiv.append(title, postLink);
                        postsWrapper.appendChild(postDiv);
                    });
                    userInfoDiv.appendChild(postsWrapper);
                });
        })
        userInfoDiv.append(userDiv, addressDiv, userContacts, companyDiv, postsButton);
    });
