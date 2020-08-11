  
// On page load / PASSED TESTING
    // get route for all exercises for specific workout > render in exercises column
    $(window).on("load", () => {
        let workoutId = window.location.hash.substring(1)
        $.ajax({
            url: `/exercises/${workoutId}`,
            method: "GET"
        }).done((workout) => {
            $(".workout-name").text(`${workout.workoutName}`)
            for (let i = 0; i < workout.exercises.length; i++) {
                let nameDiv = $("<h5>");
                nameDiv.attr("class", "text-center bold-text");
                nameDiv.text(`${workout.exercises[i].exerciseName}`);
                $(".exerciseList").append(nameDiv);
    
                if (workout.exercises[i].distance) {
                    let distance = $("<p>");
                    distance.attr("class", "text-center no-margin")
                    distance.text(`Distance: ${workout.exercises[i].distance}`);
                    nameDiv.after(distance)
                }
                if (workout.exercises[i].duration) {
                    let duration = $("<p>");
                    duration.attr("class", "text-center no-margin")
                    duration.text(`Duration: ${workout.exercises[i].duration}`);
                    nameDiv.after(duration)
                }
                if (workout.exercises[i].reps) {
                    let reps = $("<p>");
                    reps.attr("class", "text-center no-margin")
                    reps.text(`Reps: ${workout.exercises[i].reps}`);
                    nameDiv.after(reps)
                }
                if (workout.exercises[i].sets) {
                    let sets = $("<p>");
                    sets.attr("class", "text-center no-margin")
                    sets.text(`Sets: ${workout.exercises[i].sets}`);
                    nameDiv.after(sets)
                }
                if (workout.exercises[i].weight) {
                    let weight = $("<p>");
                    weight.attr("class", "text-center no-margin")
                    weight.text(`Weight: ${workout.exercises[i].weight}lbs`);
                    nameDiv.after(weight)
                }
            }
        }).fail((err) => err)
    })
    
    // Combined Weight Button
      // listener > get route to add up exercise weights
    $("#statBtn").on("click", () => {
        let workoutId = window.location.hash.substring(1)
        $.ajax({
            url: `/exercises/${workoutId}`,
            method: "GET"
        }).done((workout) => {
            let weightArr = []
            for (let i = 0; i < workout.exercises.length; i++) {
                weightArr.push(workout.exercises[i].weight)
            }
            console.log(weightArr);
            if (weightArr !== []) {
                let totalWeight = weightArr.reduce((total,num)=>{
                    return total + num
                });
                $("#totalWeight").text(`    ${totalWeight}lbs`)
            } else{
                $("#totalWeight").text(`    0lbs`)
            }
        }).fail((err) => err)
    })
    
    // Submit Exercise Button / PASSED TESTING
        // listener > post route to add exercise and reload page
    $("#newExerciseForm").on("submit", (event) => {
        event.preventDefault();
        let workout_id = window.location.hash.substring(1)
        let exerciseName = $("#exerciseName").val()
        let weight = $("#weight").val()
        let sets = $("#sets").val()
        let reps = $("#reps").val()
        let duration = $("#duration").val()
        let distance = $("#distance").val()
        let exerciseData = {
            exerciseName,
            weight,
            sets,
            reps,
            duration,
            distance,
            workout_id
        }
        $.ajax("/create/exercise", {
            type: "POST",
            data: exerciseData
        }).then(() => {
            location.reload()
        })
    })
    
    // Complete Workout
        // listener > update route for workout's date (needs to be created)
    $("#completeWorkout").on("click", (event) => {
        event.preventDefault();
        let id = window.location.hash.substring(1);
        let data = {
            id
        }
        $.ajax("/update/workout", {
            type: "POST",
            data: data
        }).then(() => {
            location.href = "/workout.html"
        })
    })