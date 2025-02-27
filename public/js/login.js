document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                messageDiv.textContent = data.message;
                messageDiv.className = 'success'; // Agrega la clase 'success'
            } else {
                messageDiv.textContent = `Error: ${data.error}`;
                messageDiv.className = 'error'; // Agrega la clase 'error'
            }
        } catch (error) {
            console.error('Error:', error);
            messageDiv.textContent = 'Ocurrió un error al enviar la solicitud.';
            messageDiv.className = 'error'; // Agrega la clase 'error'
        }
    });
});