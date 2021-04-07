
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const workoutSchema = new Schema({
  day: {
    type: Date,
    default: new Date().setDate(new Date().getDate())
  },
  exercises: Array},
  {
    toJSON: {
      // include any virtual properties when data is requested
      virtuals: true
    }
  }
);
workoutSchema.virtual("totalDuration").get(function () {
  const duration = this.exercises.reduce((acc, cur) => {
    return acc + cur.duration;
  }, 0);
  return duration;
});
const Workout = mongoose.model('Workouts', workoutSchema);
module.exports = Workout;

