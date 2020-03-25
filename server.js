const express = require('express');
const app = express();

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Added middleware for handling CORS requests from index.html
var cors = require('cors');
 
app.use(cors());
 
app.get('/hello/:id', function (req, res, next) {
  res.json({msg: 'Hello world, we are CORS-enabled!'});
});
 
app.listen(80, function () {
  console.log('CORS-enabled web server is listening on port 80');
});

// Added middware for parsing request bodies here:
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Mounted the existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

// This conditional is here for testing purposes:
if (!module.parent) { 
  // Added code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  })
}
