async function editFormHandler(event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    const title_text = document.querySelector('input[name="post-title"]').value.trim();
    const body_text = document.querySelector('textarea[name="post-body"]').value.trim();

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: title_text,
            post_body: body_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);