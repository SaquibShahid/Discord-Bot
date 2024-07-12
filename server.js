const express = require('express');

const app = express();
const PORT = process.env.PORT;

const urlRoutes = require('./routes/url.routes');

app.get('/', (req, res) =>{
    res.send("Welcome");
});

app.use('/url' , urlRoutes);

app.listen(PORT , ()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})