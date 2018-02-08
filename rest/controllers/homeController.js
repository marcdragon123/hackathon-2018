// gene controller routes
var express = require('express');
var router = express.Router();

// get /api/gene/
router.get('/',(req,res) => {
  res.send('GET response from home');
});

// post /api/gene/
router.post('/',(req,res) => {
  res.send('POST response');
});

// put /api/gene/
router.put('/',(req,res) => {
  res.send('PUT response');
});

// delete /api/gene/
router.delete('/',(req,res) => {
  res.send('DELETE response');
});

module.exports = router;
