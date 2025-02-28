import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

console.log('Archivo app.js se está ejecutando en el navegador');

document.addEventListener('DOMContentLoaded', async () => {
    const logoutButton = document.getElementById('logoutButton');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const bookListContainer = document.getElementById('bookListContainer');

    // Obtener las variables de entorno de Vercel
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    console.log('supabaseUrl:', supabaseUrl);
    console.log('supabaseKey:', supabaseKey);

    if (supabaseUrl && supabaseKey) {
        supabase = createClient(supabaseUrl, supabaseKey);
        console.log('Supabase inicializado correctamente:', supabase);
    } else {
        console.error('Las credenciales de Supabase no se cargaron correctamente.');
        alert('Error al cargar la configuración. Revisa la consola.');
        return; // Detener la ejecución si no se puede obtener la configuración
    }

    // **AQUÍ PEGASTE EL CÓDIGO DE login.js**
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    if (loginForm) { // Verifica si el formulario existe en la página actual
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;

            try {
                const response = await fetch(apiUrl + '/login', {
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
    }
    // ----------------------------------------

    // Función para mostrar los libros en el contenedor
    async function displayBooks(books) {
        console.log('Función displayBooks ejecutándose con los libros:', books);
        bookListContainer.innerHTML = ''; // Limpiar la lista anterior
    
        if (books && books.length > 0) {
            books.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.classList.add('book-item');
    
                const downloadUrl = `${supabaseUrl}/storage/v1/object/public/books/${book.file_path}`; // Generar la URL de descarga
    
                bookElement.innerHTML = `
                    <h3>${book.title}</h3>
                    <p>Autor: ${book.author}</p>
                    <p>Género: ${book.genre}</p>
                    <img src="${book.cover_url}" alt="Portada de ${book.title}" style="max-width: 150px;">
                    <p>${book.description}</p>
                    <a href="${downloadUrl}" target="_blank" rel="noopener noreferrer">Descargar Libro</a> <!-- Agrega esto -->
                `;
                bookListContainer.appendChild(bookElement);
            });
        } else {
            bookListContainer.textContent = 'No hay libros disponibles.';
        }
    }

    // Función para buscar los libros en Supabase
    async function searchBooks(searchTerm) {
        console.log('Función searchBooks ejecutándose con el término:', searchTerm);
    
        try {
            const { data: books, error } = await supabase
                .from('books')
                .select('*')
                .or(`title.ilike.%${searchTerm}%,author.ilike.%${searchTerm}%,genre.ilike.%${searchTerm}%`); // Busca por título, autor y género
    
            console.log('Resultado de la consulta a Supabase:', books);
            console.log('Error de la consulta a Supabase:', error);
    
            if (error) {
                console.error('Error al buscar los libros:', error);
                bookListContainer.textContent = 'Error al buscar los libros.';
                return;
            }
    
            console.log('Libros encontrados:', books);
            displayBooks(books); // Muestra los resultados
        } catch (error) {
            console.error('Error al buscar los libros:', error);
            bookListContainer.textContent = 'Error al buscar los libros.';
        }
    }

    // Agrega un event listener al botón de búsqueda
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        console.log('Botón de búsqueda clickeado. Término de búsqueda:', searchTerm);

        if (searchTerm) {
            searchBooks(searchTerm);
        } else {
            displayBooks([]); // Muestra todos los libros (o un mensaje)
        }
    });

    logoutButton.addEventListener('click', async () => {
        if (supabase) {
            const { error } = await supabase.auth.signOut();

            if (error) {
                console.error('Error al cerrar sesión:', error);
            } else {
                console.log('Cierre de sesión exitoso. Redirigiendo a index.html');
                window.location.href = '/index.html';
            }
        } else {
            console.warn('Supabase no se inicializó correctamente. No se puede cerrar sesión.');
            alert('No se puede cerrar sesión porque Supabase no se inicializó correctamente.');
        }
    });

    async function checkSession() {
        if (supabase) {
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                window.location.href = '/index.html';
            }
        } else {
            console.warn('Supabase no se inicializó correctamente. No se puede verificar la sesión.');
        }
    }

    if (supabase) {
        checkSession();
    }
});