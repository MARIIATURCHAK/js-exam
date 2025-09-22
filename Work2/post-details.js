const postId = localStorage.getItem('currentPostId');
const wrapperDiv = document.getElementById('wrapper');

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => response.json())
    .then(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('postInfo');
        postDiv.innerHTML = `
            <h2>Post Id: ${post.id}</h2>
            <p><strong>User Id:</strong> ${post.userId}</p>
            <p><strong>Title:</strong> ${post.title}</p>
            <p><strong>Body:</strong> ${post.body}</p>
        `;
        wrapperDiv.appendChild(postDiv);

        const commentsSection = document.createElement('div');
        commentsSection.classList.add('commentsSection');

        const commentsTitle = document.createElement('h3');
        commentsTitle.innerText = "Comments:";
        commentsSection.appendChild(commentsTitle);

        const commentsWrapper = document.createElement('div');
        commentsWrapper.classList.add('commentsWrapper');

        commentsSection.appendChild(commentsWrapper);
        wrapperDiv.appendChild(commentsSection);

        return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then(response => response.json())
            .then(comments => {
                comments.forEach(comment => {
                    const commentDiv = document.createElement('div');
                    commentDiv.classList.add('commentDiv');
                    commentDiv.innerHTML = `
                        <h4>${comment.name}</h4>
                        <p><strong>Email:</strong> ${comment.email}</p>
                        <p>${comment.body}</p>
                    `;
                    commentsWrapper.appendChild(commentDiv);
                });
            });
    });

        wrapperDiv.appendChild(commentsWrapper);