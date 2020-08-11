const router = require("express").Router();
const db = require("../models");
const moment = require("moment");
const bcrypt = require("bcrypt");



// /////// USER ROUTES /////// //

// Create User / PASSED TESTING
router.post("/create/user", ({ body }, res) => {
  db.User.create(body)
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.status(400).json(err)
    })
})

// Login / PASSED TESTING
router.post("/login", (req, res) => {
  db.User.findOne({ username: req.body.username }, (error, user) => {
    if (!user) {
      return res.status(404).send("Account not found")
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.user = {
          id: user._id,
          username: user.username,
          email: user.email
        }
        res.json(user)
      } else {
        res.status(401).send("Incorrect password");
      }
    }
  }).catch(err => {
      res.status(400).json(err)
    })
})

// Logout / PASSED TESTING
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("You have been logged out!");
})

// Session Check / PASSED TESTING
router.get("/readsession", (req, res) => {
  if (!req.session.user) {
    res.send("Not logged in")
  } else {
    res.json(req.session.user)
  }
})

// Delete User / PASSED TESTING
router.delete("/account/delete", (req, res) => {
  db.User.remove({_id: req.session.user.id}, (err, user) => {
    if (err) throw err
    req.session.destroy();
    res.send("Your account has been deleted!");
  }).catch(err => {
      console.log(err);
      res.status(500).end()
  })
})



// /////// WORKOUT ROUTES /////// //

// Add Workout To Users' Workouts / PASSED TESTING
router.post("/create/workout", (req, res) => {
  db.Workout.create(req.body)
    .then(({ _id }) => db.User.findOneAndUpdate({ username: req.session.user.username }, { $push: { workouts: _id } }, { new: true }))
    .then(userData =>{
      res.json(userData);
    })
    .catch(err => {
      res.json(err);
    });
})

// View All User's Workouts / PASSED TESTING
router.get("/workouts", (req, res) => {
  db.User.find({ _id: req.session.user.id })
    .populate("workouts")
    .then(userData => {
      res.json(userData[0].workouts);
    })
    .catch(err => {
      res.json(err);
    });
});

// Update Last workoutDate / NOT PASSING TEST
router.post("/update/workout", (req, res) => {
  db.Workout.update({_id:req.body.id}, {$set: {workoutDate:moment().format('DD-MM-YYYY')}})
  .then(workout => {
    res.json(workout);
  })
  .catch(err => {
    res.json(err);
  });
})

// /////// EXERCISES ROUTES /////// //

// Add Excercise To Workout / PASSED TESTING
router.post("/create/exercise", (req, res) => {
  db.Exercise.create(req.body)
    .then(({ _id }) => db.Workout.findOneAndUpdate({ _id: req.body.workout_id }, { $push: { exercises: _id } }, { new: true }))
    .then(userData =>{
      res.json(userData);
    })
    .catch(err => {
      res.json(err);
    });
})

// View Exercises Within Specific Workout / PASSED TESTING
router.get("/exercises/:id", (req, res) => {
  db.Workout.find({ _id: req.params.id })
    .populate("exercises")
    .then(userData => {
      res.json(userData[0]);
    })
    .catch(err => {
      res.json(err);
    });
});

// View All Exercises / PASSED TESTING
router.get("/allexercises", (req, res) => {
  db.Exercise.find({})
    .then(userExercises => {
      res.json(userExercises);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;