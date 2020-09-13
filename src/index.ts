import bodyParser from 'body-parser';
import spectatorLogger   from './utils/spectatorLogger';
import express from 'express';
import path from 'path';



const app = express();
const PORT: number = 8000;

// set body parser
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));


  app.use(spectatorLogger);

app.use(express.static('public'));

  app.get('/', (req, res) => {
    res.json({a:12})
});
app.get('/login', (req, res) => {
    res.render('pages/login', {title:   'Login to spectator'});
});

app.get('/test', (req, res) => {
    throw Error('error')
});




app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
