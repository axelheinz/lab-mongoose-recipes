const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");
const Recipe = require("./models/recipeschema.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// Recipe.create({
//   title: "Asian Glazed Chicken Thighs",
//   level: "Amateur Chef",
//   ingredients: [
//     "1/2 cup rice vinegar",
//     "5 tablespoons honey",
//     "1/3 cup soy sauce (such as Silver Swan®)",
//     "1/4 cup Asian (toasted) sesame oil",
//     "3 tablespoons Asian chili garlic sauce",
//     "3 tablespoons minced garlic",
//     "salt to taste",
//     "8 skinless, boneless chicken thighs"
//   ],
//   cuisine: "Asian",
//   dishType: ["Dish"],
//   image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
//   duration: 40,
//   creator: "Chef LePapu"
// })
//   .then(recipe => {
//     console.log("The recipe is saved: ", recipe);
//   })
//   .catch(err => {
//     console.log("An error happened:", err);
//   });

Recipe.remove().then(() => {
  Recipe.insertMany(data)
    .then(recipes => {
      recipes.forEach(recipe => {
        console.log("RECIPE TITLE: ", recipe.title);
      });
    })
    .then(() => {
      Recipe.updateOne(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 }
      ).then(console.log("DURATION CHANGED!"));
    })
    .then(() => {
      Recipe.remove({ title: "Carrot Cake" }).then(
        console.log("CARROT DELETED!")
      );
    })
});

// Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }).then(
//   console.log("DURATION CHANGED!")
// );
