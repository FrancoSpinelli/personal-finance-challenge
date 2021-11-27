const express = require ('express');
const app = express();
const path = require ('path');
const methodOverride = require ('method-override');
const cors = require('cors');


app.use(cors());


// METHODS CONFIG
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));


// LISTEN PORT 3003
app.listen(process.env.PORT || 3003, function(){
    console.log('Server running on port 3003');
});



// PUBLIC ROUTE
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));



//API ROUTE

let apiRoute = require ('./src/routes/api.js');
app.use('/api/', apiRoute);

