const express = require('express');
//setup path
const path = require('path');
const port = 8000;

//connecting mongoose
const db = require('./config/mongoose');
//we will use this Todo to create entry or collections of our db
const Todo = require('./models/todo');

const app = express();


//telling express that ejs will be the view engine or temolate engine
app.set('view engine', 'ejs');



//telling where we are going to  place our views
app.set('views', path.join(__dirname, 'views'));

//settting parser to read data from form
app.use(express.urlencoded());

//creating static middleware to beautify page
app.use(express.static('assets'));


//creating todolist array
var todoList = [
    //     {
    //     desc: "online class",
    //     category: "work",
    //     date: "25-24-2005"
    // }
]



//returning to serrver on some request
app.get('/', function(req, res) {

    //fetching all data from database using find and storing in variable lists
    Todo.find({},function(err, lists) {
        if(err) {
            console.log('error in fetching data from database');
            return;
        }
        return res.render('home', {
            title : "my major project",
            //passing our contact list to homepage
            todo_list: lists
        });
    });
    
});

//submititng our form to another page
app.post('/create-todolist', function(req, res){
    //checking that data recognized as object or not by parser
    // console.log(req.body);
    // console.log(req.body.desc);
    // console.log(req.body.date);
    // console.log(req.body.category);

    //appending our data into array
    // todoList.push({
    //     desc: req.body.desc,
    //     date:  req.body.date,
    //     category: req.body.category
    // });
    //APPENDING DATA TO OUR ARRAY USING SCHEMA
    console.log(req.body);
    Todo.create({
        desc: req.body.desc,
        date:  req.body.date,
        category: req.body.category
  //whenever we create something we need a callback function to tell that it is created or having error during creation
    },function(err, newTodolist){
        if(err){
            console.log('err in creating contact');
            return;
        }
        console.log('*****',newTodolist);
        //returning back to homepage after appending data to arary
        return res.redirect('back');
    });

});




//deleting todo-task

    app.post('/deletetask', function(req, res) {
    
    let id = req.body.checkbox;
    console.log(req.query.id);
    Todo.findByIdAndDelete(id, function(err, todo) {
        if(err) {
            console.log('err in finding and deleting obj from databse');
            return;
         }
    });
    return res.redirect("/");
});


 
app.listen(port, function(err){
    if(err) {
        console.log('err in returning to the server', err);
    }
    console.log('YUPP!! my server is running on port', port);
});