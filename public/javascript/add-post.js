const postBodyEl = document.querySelector('#post-body');
const postTitleEl = document.querySelector('#post-title');

const handleNewPost = async function (event) {
    event.preventDefault();
    
    if (postBodyEl.value && postTitleEl.value) {
        const response = await fetch('api/posts', {
            method: 'post',
            body: JSON.stringify({
                title: postTitleEl.value,
                post_body: postBodyEl.value
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