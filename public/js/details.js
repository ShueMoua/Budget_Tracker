$(document).ready(function () {

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    $.get("api/income", function (data) {
        for (let i = 0; i < data.length; i++) {

            let date = new Date(data[i].day.replace(/-/g, '\/'));
            let newDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

            let amount = data[i].amount;
            let newAmount = formatter.format(amount)

            $("#incomeTableBody").append(
                `<tr>
                <th>${data[i].id}</th>
                <td>${newAmount}</td>
                <td>${newDate}</td>
                <td>${data[i].description}</td>
                </tr>`
            );
        }
    })

    $.get("api/expense", function (data) {

        for (let i = 0; i < data.length; i++) {

            let date = new Date(data[i].day.replace(/-/g, '\/'));
            let newDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

            let amount = data[i].amount;
            let newAmount = formatter.format(amount)

            $("#expenseTableBody").append(
                `<tr>
                <th>${data[i].id}</th>
                <td>${newAmount}</td>
                <td>${newDate}</td>
                <td>${data[i].description}</td>
                </tr>`
            );
        }
    })

    $("#incomeOrExpense").on("submit", function (event) {
        event.preventDefault();
        if (
            !$("#amount").val().trim() ||
            !$("#day").val().trim() ||
            !$("#exampleFormControlTextarea1").val().trim() ||
            !$("#incomeExpense").val().trim()
        ) {
            alert("ALL FIELDS ARE REQUIRED");
        } else {

            // console.log("clicked");

            let newExpenseOrIncome = {
                amount: $("#amount").val().trim(),
                description: $("#exampleFormControlTextarea1").val().trim(),
                day: $("#day").val().trim()
            }

            // console.log(newExpenseOrIncome);
            // console.log($("#incomeExpense").val());

            if ($("#incomeExpense").val() === 'Income') {
                $.post("/api/income/", newExpenseOrIncome, function () {
                    alert("Successfully added income");
                    window.location.href = "/details";
                });
            } else {
                $.post("/api/expense/", newExpenseOrIncome, function () {
                    alert("Successfully added expense");
                    window.location.href = "/details";
                });
            }
        }
    })

});