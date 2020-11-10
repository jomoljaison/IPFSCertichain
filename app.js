var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var searchStudentRouter = require("./routes/searchStudent");
var setStudent = require("./routes/setStudent");
var getStudent = require("./routes/getStudent");

//-------------------WEB3 Integration starts-----------------------

var path            = require('path');
var MyContractJSON  = require(path.join(__dirname, 'build/contracts/Student.json'));

var Web3 = require("web3");

const web3 = new Web3('http://localhost:7545');

// accountAddress = "0x64b38ebcc61e54d9c97671311852ada7c2a23db9"; // rinkeby
// const contractAddress = MyContractJSON.networks['4'].address;

// accountAddress = "0x3D2Cf517B33F2217D7822442Ec8eaeF1398684c6"; //private dev mode
accountAddress = "0xa2D47702fDeaC06284B87F9B29d2bcB207d215eE"; //Ganache
const contractAddress = MyContractJSON.networks['5777'].address;
const contractAbi = MyContractJSON.abi;

MyContract = new web3.eth.Contract(contractAbi, contractAddress);

//-------------------WEB3 Integration Stops------------------------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/search', searchStudentRouter);
app.use('/setStudent', setStudent);
app.use('/getStudent', getStudent);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
