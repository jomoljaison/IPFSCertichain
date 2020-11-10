var express = require('express');
var router = express.Router();

var ipfsAPI = require('ipfs-api');

/* GET users listing. */
router.get('/', function (req, res, next) {
  data = req.query;
  console.log(data);
  MyContract.methods.getDetails(data.rollno)
    .call({ from: accountAddress })
    .then((result) => {
      console.log(result);
      res.render("studentView", { result: result, rollno : data.rollno });
    })
});

router.post('/', function (req, res, next) {

  const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

  uid = req.body.rollno;
  myFileBuffer = req.files.uploadFile.data;
  console.log(myFileBuffer);
  ipfs.files.add(myFileBuffer, function (err, file) {
    if (err) throw err;

    let url = `https://ipfs.io/ipfs/${file[0].hash}`;
    console.log(`Url --> ${url}`);

    MyContract.methods.setIfpsUrl(uid,file[0].hash)
    .send({from:accountAddress})
    .then((txn) => {
        res.redirect("getStudent?rollno="+uid);
    });
  });
});

module.exports = router;
