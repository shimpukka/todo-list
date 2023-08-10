const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false })); // for handling post request
app.use(express.static('public'));

const items = ['Drink coffe', 'Meditate'];
const workItems = [];


app.get('/', function(req, res){
    const day = date.getDate();

    // passing text variable to template file (list.ejs)
    res.render('list', { 
        category: 'General',
        items: items,
        description: day,
    });
});

app.get('/about', (req, res)=>{
    res.render('about');
});

app.get('/work', (req, res)=> {
    res.render('list', {
        category: 'Work',
        items: workItems,
        description: 'This is a work-related task list',
    });
});

app.post('/', function(req, res){
    if(req.body.category === 'Work'){
        workItems.push(req.body.newItem);
        res.redirect('/work');
    } else {
        items.push(req.body.newItem);
        res.redirect('/');
    } 
});

app.listen(3000, function(){
    console.log('Server started on port 3000');
});