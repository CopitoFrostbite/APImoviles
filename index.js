const express = require('express');
const connectDB = require('./database/mongoose');
const UserRoutes = require('./routes/UserRoutes');
const JournalRoutes = require('./routes/JournalRoutes');
const fileUpload = require('express-fileupload')
const port = 3000;

const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

// Conectarse a la base de datos
connectDB();

app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/uploads/'
}))

app.use('/api', UserRoutes); // Usamos las rutas definidas
app.use('/api', JournalRoutes); // Usamos las rutas definidas

app.listen(port, ()=> console.log(`comenzando ${port}`));