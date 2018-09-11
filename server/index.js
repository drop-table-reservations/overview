const express = require('express');
let app = express();
const { findOverview } = require('../database/index.js')

app.use(express.static(__dirname + '/../public'));

app.get('/restaurants/:restaurantId/overview', function (req, res) {
  const { restaurantId } = req.params;
  findOverview(restaurantId, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.send('Error: ', err)
    } else {
      res.status(200);
      res.send(data);
    }

  })
});

let port = 8008;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
