var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  data = req.body;
  console.log(data)
  MyContract.methods.setStudent(data.rollno, data.firstname ,data.age, JSON.parse(data.disabled), data.course, data.roomno)
    .send({from:accountAddress, gas : 3000000})
    .then((txn) => {
        res.send(txn);
    })
});

module.exports = router;
