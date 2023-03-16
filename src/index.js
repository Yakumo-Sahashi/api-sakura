const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.use(cors());

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//route
app.use('/api/sakura/',require('./routes/index'))

//inicar servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en puerto ${app.get('port')}`);
});

