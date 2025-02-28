document.addEventListener('DOMContentLoaded', async () => {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');
    let apiUrl; // Declare apiUrl here

    try {
        // Fetch the configuration from the backend
        const response = await fetch('/supabase-config'); // Adjust path if needed
        if (!response.ok) {
            throw new Error(`Failed to fetch config: ${response.status} ${response.statusText}`);
        }
        const config = await response.json();
        apiUrl = config.apiUrl; // Extract apiUrl from config

        if (!apiUrl) {
            throw new Error('API_URL not found in configuration.');
        }
    } catch (error) {
        console.error('Error fetching API configuration:', error);
        messageDiv.textContent = 'Failed to load API configuration. Check console.';
        messageDiv.className = 'error';
        return; // Stop execution if config fails
    }

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;

        try {
            const response = await fetch(apiUrl + '/login', { // Use apiUrl here
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                messageDiv.textContent = data.message;
                messageDiv.className = 'success';
            } else {
                messageDiv.textContent = `Error: ${data.error}`;
                messageDiv.className = 'error';
            }
        } catch (error) {
            console.error('Error:', error);
            messageDiv.textContent = 'Ocurrió un error al enviar la solicitud.';
            messageDiv.className = 'error';
        }
    });
});