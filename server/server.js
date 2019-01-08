const express = require('express');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const proxy = require('http-proxy-middleware');

app.use(morgan('dev'));
app.use('/rooms/:roomid', express.static('./public'));

app.use('/rooms/:id/photos', proxy({target: 'http://54.175.98.175/'}));
app.use('/api/reviews/rooms/:roomid', proxy({target: 'http://54.202.111.150'}));
app.use('/api/ratings/rooms/:roomid', proxy({target: 'http://54.202.111.150'}));
app.use('/api/rooms/:id', proxy({target: 'http://54.67.99.254/'}));
app.use('/house', proxy({target: 'http://18.223.185.89'}));

app.listen(port, () => {
  console.log(`server running at: htttp://localhost:${port}`);
});