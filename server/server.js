const express = require('express');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const proxy = require('http-proxy-middleware');

app.use(morgan('dev'));
app.use('/rooms/:roomid', express.static('./public'));

app.use('/rooms/:id/photos', proxy({target: 'http://localhost:1337'}));
app.use('/api/reviews/rooms/:roomid', proxy({target: 'http://localhost:3124'}));
app.use('/api/ratings/rooms/:roomid', proxy({target: 'http://localhost:3124'}));
app.use('/api/rooms/:id', proxy({target: 'http://localhost:8080'}));
app.use('/house', proxy({target: 'http://localhost:3123'}));

app.listen(port, () => {
  console.log(`server running at: htttp://localhost:${port}`);
});