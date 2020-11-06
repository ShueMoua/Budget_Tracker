const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      res.json({});
    } else {
      db.User.findOne({
        where: { id: req.user.id },
        include: [
          {
            model: db.Budget
          },
          {
            model: db.Income,
          },
          {
            model: db.Expense
          }
        ],
        order: [
          [db.Income, 'day', 'ASC'],
          [db.Expense, 'day', 'ASC']
        ]
      }).then(function (data) {
        res.json(data);
      });
    }
  });

  app.post("/api/budget", function (req, res) {
    console.log(req.body);
    db.Budget.create({
      amount: req.body.amount,
      UserId: req.user.id
    })
      .then(function (data) {
        res.json(data);
      });
  });

  app.put("/api/budget/", function (req, res) {
    db.Budget.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (data) {
        res.json(data);
      });
  });

  app.get("/api/budget", function (req, res) {
    db.Budget.findAll({
      where: {
        UserId: req.user.id
      }
    })
      .then(function (data) {
        res.json(data);
      });
  });



  app.get("/api/expense", function (req, res) {
    db.Expense.findAll({
      where: {
        UserId: req.user.id
      },
      order: [
        ['day', 'DESC']
      ]
    })
      .then(function (data) {
        res.json(data);
      });
  });

  app.get("/api/income", function (req, res) {
    db.Income.findAll({
      where: {
        UserId: req.user.id
      },
      order: [
        ['day', 'DESC']
      ]
    })
      .then(function (data) {
        res.json(data);
      });
  });

  app.post("/api/expense", function (req, res) {
    console.log(req.body);
    db.Expense.create({
      amount: req.body.amount,
      description: req.body.description,
      day: req.body.day,
      UserId: req.user.id
    })
      .then(function (data) {
        res.json(data);
      });
  });

  app.post("/api/income", function (req, res) {
    console.log(req.body);
    db.Income.create({
      amount: req.body.amount,
      description: req.body.description,
      day: req.body.day,
      UserId: req.user.id
    })
      .then(function (data) {
        res.json(data);
      });
  });

  app.delete("/api/income/:id", function (req, res) {
    db.Income.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (data) {
        res.json(data);
      });
  });

  app.delete("/api/expense/:id", function (req, res) {
    db.Expense.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (data) {
        res.json(data);
      });
  });

  app.put("/api/income/", function (req, res) {
    db.Income.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (data) {
        res.json(data);
      });
  });

  app.put("/api/expense", function (req, res) {
    db.Expense.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (data) {
        res.json(data);
      });
  });
};


