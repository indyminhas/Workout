// LOGIN/SIGNUP //

// Displays
$("#registration").hide()
// Listeners: Presenting Reg OR Sign up form
$("#login").click(function () {
    $("#registration").hide();
    $("#currentUser").show();
});
$("#signup").click(function () {
    $("#registration").show();
    $("#currentUser").hide();
});

// Login JS / PASSED TEST
$("#loginBtn").on("click", (event) => {
    event.preventDefault();
    const userObj = {
        username: $("#username").val(),
        password: $("#userPass").val()
    }
    $.ajax({
        url: "/login",
        method: "POST",
        data: userObj
    }).done(function (user) {
        console.log(`Login Successful: Welcome`);
        location.href = `/workout.html`
    }).fail(function (err) {
        console.log(err.responseText);
        // User Validations
        if (err.responseText === "Account not found") {
            $("#username").attr("class", "error");
            $("#username").val("User not found")
            $("#userPass").val("")
        } else if (err.responseText === "Incorrect password") {
            $("#userPass").attr("aria-describedby", "incorrectPass");
            $("#incorrectPass").hide()
            const errP = $("<p>");
            errP.attr("id", "incorrectPass")
            errP.attr("class", "help-text")
            errP.text("Incorrect password, please try again")
            $("#passwordLabel").after(errP)
            $("#userPass").val("")
            $("#userPass").attr("class", "error");
        }
    })
})

// Sign Up Request / PASSED TESTING
$("#signupBtn").on("click", (event) => {
    event.preventDefault();
    const userObj = {
        username: $("#newUsername").val(),
        email: $("#newEmail").val(),
        password: $("#newPassword").val()
    }
    $.ajax({
        url: "/create/user",
        method: "POST",
        data: userObj
    }).done(function (user) {
        alert('Signed up successfully')
        location.reload()
    }).fail(function (err) {
        console.log(err);
        location.reload();
    })
})

// Logout Button
$("#logoutBtn").on("click", (event) => {
    event.preventDefault();
    $.ajax({
        url: "/logout",
        method: "GET"
    }).then(() => {
        location.href = "/"
    })
})