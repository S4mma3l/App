// server.js
require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const cors = require('cors'); // Agrega esto

const app = express();
const port = process.env.PORT || 3000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const apiUrl = process.env.API_URL;

const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware para servir archivos estáticos desde la carpeta "public"
// Configuración de CORS
const whitelist = [
  'http://localhost:3000', // Para desarrollo local
  'https://app-bay-beta.vercel.app', // Tu dominio de Vercel (Asegúrate de que sea el correcto)
  'https://app-s4mma3ls-projects.vercel.app/', // Tu dominio de Vercel (Asegúrate de que sea el correcto)
  'https://app-git-main-s4mma3ls-projects.vercel.app/', // Tu dominio de Vercel (Asegúrate de que sea el correcto)
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', async (req, res) => {
  const { email } = req.body;

  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: `${req.protocol}://${req.get('host')}/app.html`,
    },
  });

  if (error) {
    console.error('Error al enviar el Magic Link:', error);
    return res.status(500).json({ error: error.message });
  }

  console.log('Magic Link enviado correctamente:', data);
  res.json({ message: 'Magic Link enviado. Revisa tu correo electrónico.' });
});

app.get('/auth/confirm', async (req, res) => {
  const { token_hash, type } = req.query;

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });

    if (error) {
      console.error('Error al verificar el OTP:', error);
      return res.status(500).send('Error al verificar el código. Revisa la consola del servidor.');
    }

    return res.redirect('/app.html');
  } else {
    return res.status(400).send('Faltan parámetros token_hash o type.');
  }
});

// Endpoint para exponer la configuración al frontend
app.get('/supabase-config', (req, res) => {
  console.log('Endpoint /supabase-config llamado');
  res.json({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_ANON_KEY,
    apiUrl: process.env.API_URL
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  console.error(err);
  res.status(500).send('Algo salió mal!');
});

app.get('/books', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*');

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
  console.log(`Servidor escuchando en el puerto ${port}`);
});