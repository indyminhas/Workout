// On Page Load / PASSED TESTING
// Get route for all user workouts > render in 'my workouts' div
$(window).on("load", () => {   
    $.ajax({
        url: "/workouts",
        method: "GET"
    }).done((workouts) => {
        for (let i = 0; i < workouts.length; i++) {
            let nameDiv = $("<div>");
            nameDiv.attr("class", "text-center bold-text");
            nameDiv.text(`${workouts[i].workoutName}`);
            $(".pastWorkoutList").prepend(nameDiv);
            let dateDiv = $("<div>");
            dateDiv.attr("class", "text-center")
            dateDiv.text(`Last Done: ${workouts[i].workoutDate}`);
            nameDiv.after(dateDiv)
            let btnDiv = $("<div>");
            btnDiv.attr("class", "grid-x align-center");
            dateDiv.after(btnDiv)
            let goBtn = $("<button>");
            goBtn.attr("class", "goBtn button")
            goBtn.attr("id", `${workouts[i]._id}`)
            goBtn.text("Go!")
            btnDiv.append(goBtn)
        }
    }).fail((err) => err)
})


// Submit Workout Button / PASSED TESTING
// Listener > post route to add workout and reload page
$("#newWorkoutForm").on("submit", () => {
    event.preventDefault();
    let workoutName = $("#workoutName").val()
    let workoutDate = $("#workoutDate").val()
    let workoutData = {
        workoutName,
        workoutDate
    }
    $.ajax("/create/workout", {
        type: "POST",
        data: workoutData
    }).then((res) => {
        location.reload()
    })
})

// Go Workout button / NOT PASSING TESTING
// Listener > route to grab workout _id and load exercise page with it as hash
$(document).ready(function() {
    $(".pastWorkoutList").on("click", ".goBtn", function (event) {
        event.preventDefault();
        console.log("goBtn working");
        let workoutId = this.id;
        location.href = `/exercise.html#${workoutId}`
    })
})