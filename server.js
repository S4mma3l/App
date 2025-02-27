// server.js
require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const cors = require('cors'); // Agrega esto

const app = express();
const port = process.env.PORT || 3000;

//console.log('Cargando variables de entorno...');
//console.log('NODE_ENV:', process.env.NODE_ENV);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

//console.log('SUPABASE_URL:', supabaseUrl);
//console.log('SUPABASE_ANON_KEY:', supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(cors()); // Agrega esto (para desarrollo, luego ajusta)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Para parsear el body de las peticiones POST

// Ruta explícita para servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint para el login (Magic Link)
app.post('/login', async (req, res) => {
  const { email } = req.body;

  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: `${req.protocol}://${req.get('host')}/app.html`, // Corrige esto
    },
  });

  if (error) {
    console.error('Error al enviar el Magic Link:', error);
    return res.status(500).json({ error: error.message });
  }

  console.log('Magic Link enviado correctamente:', data);
  res.json({ message: 'Magic Link enviado. Revisa tu correo electrónico.' });
});

// Endpoint para verificar el OTP (PKCE Flow - si lo usas)
app.get('/auth/confirm', async (req, res) => {
  const { token_hash, type } = req.query;

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });

    if (error) {
      console.error('Error al verificar el OTP:', error);
      return res.status(500).send('Error al verificar el código.  Revisa la consola del servidor.');
    }

    // Redirige a la página principal después de la verificación exitosa
    return res.redirect('/app.html'); // O a donde quieras redirigir
  } else {
    return res.status(400).send('Faltan parámetros token_hash o type.');
  }
});

// Endpoint para exponer la configuración de Supabase al frontend
app.get('/supabase-config', (req, res) => {
  console.log('Endpoint /supabase-config llamado');
  res.json({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_ANON_KEY
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

app.get('/books', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*'); // Obtener todas las columnas

    if (error) {
      console.error('Error al obtener los libros:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Error inesperado:', error);
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`); // Corrige esto
});