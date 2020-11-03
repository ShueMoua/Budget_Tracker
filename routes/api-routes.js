// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the expenses
  app.get("/api/expense", function(req, res) {
    db.Expense.findAll({})
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

   // GET route for getting all of the incomes
   app.get("/api/income", function(req, res) {
    db.Income.findAll({})
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // POST route for saving a new expense
  app.post("/api/expense", function(req, res) {
    console.log(req.body);
    db.Expense.create({
      amount: req.amount,
      description: req.description,
      day: req.day
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.post("/api/income", function(req, res) {
    console.log(req.body);
    db.Income.create({
      amount: req.amount,
      description: req.description,
      day: req.day
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

//   // DELETE route for deleting posts
//   app.delete("/api/posts/:id", function(req, res) {
//     db.Post.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//       .then(function(dbPost) {
//         res.json(dbPost);
//       });
//   });

//   // PUT route for updating posts
//   app.put("/api/posts", function(req, res) {
//     db.Post.update(req.body,
//       {
//         where: {
//           id: req.body.id
//         }
//       })
//       .then(function(dbPost) {
//         res.json(dbPost);
//       });
//   });
};