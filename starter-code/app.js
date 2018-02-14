const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

// needed for express layouts
// const expressLayouts = require('express-ejs-layouts');

// create our own server named "app"
// express server handling requests
// and responses 
//configure express layouts
// app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');

//create an absolute path pointing to a folder
// called "views"
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');






//Create a route using Express for the /random Web address. When a user visits 
//http://localhost:3000/random, the application should request a random joke using the chucknorris-io 
//package and show it in a p tag.

app.get('/random', (request, response, next)=> {
    
    // Retrieve a random chuck joke
    client.getRandomJoke()
    .then((jokes) => {
        console.log("response is this: ",response);
        response.render('random', {
            // joke im using in the views
            // jokes is my response
            joke: jokes.value
        })
    // use the response here
    })
    .catch((err) => {
    // handle error
    });    
});

// Create a new route /categories in your Express application. When a user visits 
// http://localhost:3000/categories, the application should show the full list of joke categories.
app.get('/categories', (request, response, next)=> {
    client.getJokeCategories()
    .then((response)=>  {
        console.log("Joke Categories: ", response);
        response.render('categories', {categories: response.value})
      // use the response here
    })
    .catch((err)=> {
      // handle error
    });

});

app.get('/categories/:category', (request, response)=> {
    const category = req.params.category;
     client.getRandomJoke(category)
     // client.getJokeCategories()
     .then((response)=>  {
         console.log("Joke is: ", response);
         response.render('joke-by-category', {categoryJoke: response.value})
       // use the response here
     })
     .catch((err)=> {
       // handle error
     });
 
 });


app.listen(3000, ()=>{
    console.log('Run this shit!');
    });