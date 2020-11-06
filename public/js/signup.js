$(document).ready(function () {
    const signUpForm = $("form.signup");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");

    signUpForm.on("submit", function (event) {
        event.preventDefault();
        const userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }
        signUpUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password) {
        $.post("/api/signup", {
            email: email,
            password: password
        })
            .then(function (data) {

                $.post("api/budget", { amount: 0 }).then(function () {
                    console.log("Budget created");
                });

                window.location.replace("/members");
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text("This email is already registered. Please use a different email.");
        $("#alert").fadeIn(500);
    }
});
