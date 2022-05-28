const commentBodyEl = document.querySelector('textarea[name="comment-body"]');

const handleCommentForm = async function (event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ].split('?')[0]

    if (commentBodyEl.value) {
        const response = await fetch('/api/comments', {
            method: 'post',
            body: JSON.stringify({
                comment_body: commentBodyEl.value,
                post_id: post_id
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    } else {
        alert('Please enter a comment before submitting.');
    }
}

document.querySelector('.comment-form').addEventListener('submit', handleCommentForm);