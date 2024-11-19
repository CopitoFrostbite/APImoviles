const express = require('express');
const connectDB = require('./database/mongoose');
const UserRoutes = require('./routes/UserRoutes');
const JournalRoutes = require('./routes/JournalRoutes');
const ImageRoutes = require('./routes/ImageRoutes');
const port = process.env.PORT || 4000;

const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

// Conectarse a la base de datos
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', UserRoutes); 
app.use('/api', JournalRoutes);
app.use('/api', ImagelRoutes);  

app.listen(port, ()=> console.log(`comenzando ${port}`));


