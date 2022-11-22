//Express
const express = require('express');
const cookieParser = require('cookie-parser');
const bluebird = require('bluebird');
const cors = require('cors');

//instancio el servidor
const app = express();

//engine que permite renderizar paginas web
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(cookieParser());

//importo router
const indexRouter = require('./routes/index.route');
const userRouter = require('./routes/users.route');
const teacherRouter = require('./routes/teachers.route');
const studentRouter = require('./routes/students.route');
const classRouter = require('./routes/classes.route');
const commentRouter = require('./routes/comments.route');
const qualificationRouter = require('./routes/qualifications.route');

//Indico las rutas de los endpoint
app.use('/', indexRouter);
app.use('/users', userRouter);
/*
app.use('/teachers', teacherRouter);
app.use('/students', studentRouter);
app.use('/classes', classRouter);
app.use('/comments', commentRouter);
app.use('/qualifications', qualificationRouter);
*/

if (process.env.NODE_ENV === 'Development') {
  require('./config').config();
}

const URL= 'mongodb+srv://matias:matigonza@cluster0.wrjdamk.mongodb.net/TusClases?retryWrites=true&w=majority'

//Database connection --
const mongoose = require('mongoose')
mongoose.Promise = bluebird;
let url = `${process.env.DATABASE1}${process.env.DATABASE2}=${process.env.DATABASE3}=${process.env.DATABASE4}`
console.log("BD",url);
let opts = {
  useNewUrlParser : true, 
  connectTimeoutMS:20000, 
  useUnifiedTopology: true
  };

mongoose.connect(URL,opts)
  .then(() => {
    console.log(`Succesfully Connected to theMongodb Database..`)
  })
  .catch((e) => {
    console.log(`Error Connecting to the Mongodb Database...`),
    console.log(e)
  })


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  
});

// Setup server port
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log('Servidor de iniciado en el puerto ',port);
});


module.exports = app;