const postBodyEl = document.querySelector('#post-body').value;
const postTitleEl = document.querySelector('#post-title').value;

const handleNewPost = async function (event) {
    event.preventDefault();

    if (postBodyEl && postTitleEl) {
        const response = await fetch('api/posts', {
            method: 'post',
            body: JSON.stringify({
                title: postTitleEl,
                post_body: postBodyEl
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } else {
        alert('Please provide a valid title and body text.');
    }
}

document.querySelector('.new-post-form').addEventListener('submit', handleNewPost)