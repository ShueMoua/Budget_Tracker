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
                `<tr class="incomeRow">
                <td class="incomeAmount" value="${newAmount}">${newAmount}</td>
                <td>${newDate}</td>
                <td>${data[i].description}</td>
                <td><button type="button" onClick={this.showModal} class="btn btn-primary editIncome" data-toggle="modal" data-target="#incomeModal${data[i].id}">Edit</button></td>
                <td><button class="delete-income btn btn-primary" value="${data[i].id}">Delete</button></td>
                </tr>`
            );

            $("#modalDataGoesHere").append(
                `<div class="modal fade" id="incomeModal${data[i].id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Edit Income</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form class="editForm" name="editForm${data[i].id}">
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="amount">Amount</label>
                                                <input type="number" class="form-control" id="income-amount-${data[i].id}" aria-describedby="amountHelp" step=".01" name="amount" value="${data[i].amount}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="validationDefault04">Date</label>
                                                <input type="date" id="income-day-${data[i].id}" name="day"  value="${data[i].day}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="exampleFormControlTextarea1">Description</label>
                                                <input name="description" class="form-control" id="income-description-${data[i].id}" rows="3" value="${data[i].description}"></input>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary saveEditIncome" data-value="${data[i].id}">Save changes</input>
                            </div>
                        </div>
                    </div>
                </div>`
            )
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
                <td>${newAmount}</td>
                <td>${newDate}</td>
                <td>${data[i].description}</td>
                <td><button type="button" class="btn btn-primary editExpense" data-toggle="modal" data-target="#expenseModal${data[i].id}">Edit</button></td>
                <td><button class="delete-expense btn btn-primary" value="${data[i].id}">Delete</button></td>
                </tr>`
            );

            $("#modalDataGoesHere").append(
                `<div class="modal fade" id="expenseModal${data[i].id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Edit Expense</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form class="editForm" name="editForm${data[i].id}">
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="amount">Amount</label>
                                                <input type="number" class="form-control" id="expense-amount-${data[i].id}" aria-describedby="amountHelp" step=".01" name="amount" value="${data[i].amount}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="validationDefault04">Date</label>
                                                <input type="date" id="expense-day-${data[i].id}" name="day"  value="${data[i].day}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="exampleFormControlTextarea1">Description</label>
                                                <input name="description" class="form-control" id="expense-description-${data[i].id}" rows="3" value="${data[i].description}"></input>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary saveEditExpense" data-value="${data[i].id}">Save changes</input>
                            </div>
                        </div>
                    </div>
                </div>`
            )
        }
    })


    $(document).on("click", ".saveEditIncome", function (event) {
        event.preventDefault();

        idNum = $(this).data().value;

        const newObj =
        {
            id: idNum,
            amount: $("#income-amount-" + idNum).val(),
            day: $("#income-day-" + idNum).val(),
            description: $("#income-description-" + idNum).val()
        }

        $.ajax({
            method: "PUT",
            url: "/api/income/",
            data: newObj
        }).then(function () {
            alert("Successfully updated");
            window.location.href = "/details";
        });
    });

    $(document).on("click", ".saveEditExpense", function (event) {
        event.preventDefault();

        idNum = $(this).data().value;

        const newObj =
        {
            id: idNum,
            amount: $("#expense-amount-" + idNum).val(),
            day: $("#expense-day-" + idNum).val(),
            description: $("#expense-description-" + idNum).val()
        }

        $.ajax({
            method: "PUT",
            url: "/api/expense/",
            data: newObj
        }).then(function () {
            alert("Successfully updated");
            window.location.href = "/details";
        });
    });


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


    $(document).on("click", ".delete-income", function (event) {
        event.preventDefault();
        if (confirm("Are you sure you want to delete that record?") === true) {
            $.ajax({
                method: "DELETE",
                url: "/api/income/" + $(this).val()
            })
                .then(function () {
                    alert("Successfully deleted the income");
                    window.location.href = "/details";
                });
        }
        return;
    });

    $(document).on("click", ".delete-expense", function (event) {
        event.preventDefault();
        if (confirm("Are you sure you want to delete that record?") === true) {
            $.ajax({
                method: "DELETE",
                url: "/api/expense/" + $(this).val()
            })
                .then(function () {
                    alert("Successfully deleted the expense");
                    window.location.href = "/details";
                });
        }
        return;
    });

}); 
