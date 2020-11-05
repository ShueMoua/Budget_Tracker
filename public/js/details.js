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
                <td>${newAmount}</td>
                <td>${newDate}</td>
                <td>${data[i].description}</td>
                <td><button type="button" class="btn btn-primary editIncome" data-toggle="modal" data-target="#incomeModal${data[i].id}">Edit</button></td>
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
                                <form id="incomeOrExpense">
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="amount">Amount</label>
                                                <input type="number" class="form-control" id="amount" aria-describedby="amountHelp" step=".01" value="${data[i].amount}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="validationDefault04">Date</label>
                                                <input type="date" id="day" name="day"  value="${data[i].day}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="exampleFormControlTextarea1">Description</label>
                                                <input class="form-control" id="exampleFormControlTextarea1" rows="3" value="${data[i].description}"></input>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary saveEditIncome">Save changes</button>
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
                <td><button type="button" class="btn btn-primary editIncome" data-toggle="modal" data-target="#expenseModal${data[i].id}">Edit</button></td>
                <td><button class="delete-income btn btn-primary" value="${data[i].id}">Delete</button></td>
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
                                <form id="incomeOrExpense">
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="amount">Amount</label>
                                                <input type="number" class="form-control" id="amount" aria-describedby="amountHelp" step=".01" value="${data[i].amount}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="validationDefault04">Date</label>
                                                <input type="date" id="day" name="day"  value="${data[i].day}">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="exampleFormControlTextarea1">Description</label>
                                                <input class="form-control" id="exampleFormControlTextarea1" rows="3" value="${data[i].description}"></input>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary saveEditExpense">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>`
            )
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
