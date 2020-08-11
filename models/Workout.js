  
const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    workoutName:{
        type:String,
    },
    workoutDate: {
        type: String,
        default:moment().format('DD-MM-YYYY')
    },
    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        }
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;