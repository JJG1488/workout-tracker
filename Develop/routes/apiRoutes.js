const db = require("../models");

module.exports = function (app) {
    app.get("/api/workouts", function (req, res) {
        db.Workout.find({}).then(function (dbWorkouts) {
            res.json(dbWorkouts);
        })
        .catch(err => {res.json(err)});
    });

    app.post("/api/workouts", function ({ body }, res) {
        db.Workout.create(body)
        .then(dbworkout => res.json(dbworkout))
        .catch(err => res.json(err));
    })

    app.put("/api/workouts/:id", function (req, res) {
        console.log(req.body);
        db.Workout.findByIdAndUpdate(req.params.id,{
            $push: {
                exercises: req.body
            }
        }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => res.json(err));
     

    });

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({}).then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => res.json(err));
    })

    app.post("/api/workouts/range", function ({ body }, res) {
        db.Workout.create(body).then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => res.json(err));
    })

};


