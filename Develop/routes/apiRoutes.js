const db = require("../models");

module.exports = function (app) {
    app.get("/api/exercise", function (req, res) {
        db.Workout.find({}).then(function (dbWorkouts) {
            res.json(dbWorkouts);
        });
    });

    app.post("/api/exercise", function ({ body }, res) {
        db.Workout.create(body)
        .then(dbworkout => res.json(dbworkout))
        .catch(err => res.json(err));
    })

    app.put("/api/workouts/:id", function (req, res) {
        console.log(req.body);
        db.Workout.updateOne({ _id: req.params.id }, { rating: req.body.rating }).then(function (dbWorkout) {
            res.json(dbWorkout);
        });
    });
};


// app.post("/submit", ({ body }, res) => {
//     User.create(body)
//       .then(dbUser => {
//         res.json(dbUser);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });