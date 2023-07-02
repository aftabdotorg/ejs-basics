const express = require('express');
const path = require('path');
const redditData = require('./data.json');

const app = express();
const PORT = 5000;

// * public folder - static files
app.use(express.static(path.join(__dirname, 'public')));

// * view folder - recognition of ejs files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// ! api
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/fetch-random', (req, res) => {
  {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { num });
  }
});

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  let title = subreddit;
  if (data) {
    res.render('sbreddit', { ...data, title });
  } else {
    res.render('notfound', { subreddit });
  }
});

app.get('/cats', (req, res) => {
  const catList = ['Mrs Norris', 'Tom', 'Tiger', 'Luna'];
  const title = 'cats';
  res.render('cats', { catList, title });
});

// * server
app.listen(PORT, () => {
  console.log(`Started Server on port : ${PORT}`);
});
