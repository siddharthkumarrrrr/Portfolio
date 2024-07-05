
function sendEmail(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        number: document.getElementById('number').value,
        comments: document.getElementById('comments').value,
    };

    fetch('https://portfolio-ydbj.onrender.com/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
        alert('Email sent successfully');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send email');
    });
}
