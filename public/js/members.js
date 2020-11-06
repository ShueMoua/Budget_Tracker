$(document).ready(function () {

    $.get("/api/user_data").then(function (data) {
        $(".member-name").text("Welcome " + data.email);

        
        let sumIncomeJan = 0;
        let sumIncomeFeb = 0;
        let sumIncomeMar = 0;
        let sumIncomeApr = 0;
        let sumIncomeMay = 0;
        let sumIncomeJun = 0;
        let sumIncomeJul = 0;
        let sumIncomeAug = 0;
        let sumIncomeSept = 0;
        let sumIncomeOct = 0;
        let sumIncomeNov = 0;
        let sumIncomeDec = 0;

        let sumIncomeMonthsArray = [];

        for (let i = 0; i < data.Incomes.length; i++) {
            let date = new Date(data.Incomes[i].day.replace(/-/g, '\/'));

            // console.log(parseInt(date.getMonth() + 1));
            let monthNumber = parseInt(date.getMonth() + 1)

            if (monthNumber === 1) {
                // console.log("there is one");
                // console.log(data.Incomes[i].amount);
                // console.log(parseFloat(data.Incomes[i].amount));

                sumIncomeJan = sumIncomeJan + parseFloat(data.Incomes[i].amount);
            } else if (monthNumber === 2) {
                sumIncomeFeb = sumIncomeFeb + parseFloat(data.Incomes[i].amount);
            } else if (monthNumber === 3) {
                sumIncomeMar = sumIncomeMar + parseFloat(data.Incomes[i].amount);
            } else if (monthNumber === 4) {
                sumIncomeApr = sumIncomeApr + parseFloat(data.Incomes[i].amount);
            } else if (monthNumber === 5) {
                sumIncomeMay = sumIncomeMay + parseFloat(data.Incomes[i].amount);
            } else if (monthNumber === 6) {
                sumIncomeJun = sumIncomeJun + parseFloat(data.Incomes[i].amount);
            } else if (monthNumber === 7) {
                sumIncomeJul = sumIncomeJul + parseFloat(data.Incomes[i].amount);
            } else if (monthNumber === 8) {
                sumIncomeAug = sumIncomeAug + parseFloat(data.Incomes[i].amount);
            } else if (monthNumber === 9) {
                sumIncomeSept = sumIncomeSept + parseFloat(data.Incomes[i].amount);
            } else if (monthNumber === 10) {
                sumIncomeOct = sumIncomeOct + parseFloat(data.Incomes[i].amount);
            } else if (monthNumber === 11) {
                sumIncomeNov = sumIncomeNov + parseFloat(data.Incomes[i].amount);
            } else if (monthNumber === 12) {
                sumIncomeDec = sumIncomeDec + parseFloat(data.Incomes[i].amount);
            }

        }

        sumIncomeMonthsArray.push(sumIncomeJan, sumIncomeFeb, sumIncomeMar, sumIncomeApr, sumIncomeMay, sumIncomeJun, sumIncomeJul, sumIncomeAug, sumIncomeSept, sumIncomeOct, sumIncomeNov, sumIncomeDec)

        // console.log(sumIncomeMonthsArray);

        let sumExpenseJan = 0;
        let sumExpenseFeb = 0;
        let sumExpenseMar = 0;
        let sumExpenseApr = 0;
        let sumExpenseMay = 0;
        let sumExpenseJun = 0;
        let sumExpenseJul = 0;
        let sumExpenseAug = 0;
        let sumExpenseSept = 0;
        let sumExpenseOct = 0;
        let sumExpenseNov = 0;
        let sumExpenseDec = 0;

        let sumExpenseMonthsArray = [];

        for (let i = 0; i < data.Expenses.length; i++) {
            let date = new Date(data.Expenses[i].day.replace(/-/g, '\/'));

            // console.log(parseInt(date.getMonth() + 1));
            let monthNumber = parseInt(date.getMonth() + 1)

            if (monthNumber === 1) {
                // console.log("there is one");
                // console.log(data.Expenses[i].amount);
                // console.log(parseFloat(data.Expenses[i].amount));

                sumExpenseJan = sumExpenseJan + parseFloat(data.Expenses[i].amount);
            } else if (monthNumber === 2) {
                sumExpenseFeb = sumExpenseFeb + parseFloat(data.Expenses[i].amount);
            } else if (monthNumber === 3) {
                sumExpenseMar = sumExpenseMar + parseFloat(data.Expenses[i].amount);
            } else if (monthNumber === 4) {
                sumExpenseApr = sumExpenseApr + parseFloat(data.Expenses[i].amount);
            } else if (monthNumber === 5) {
                sumExpenseMay = sumExpenseMay + parseFloat(data.Expenses[i].amount);
            } else if (monthNumber === 6) {
                sumExpenseJun = sumExpenseJun + parseFloat(data.Expenses[i].amount);
            } else if (monthNumber === 7) {
                sumExpenseJul = sumExpenseJul + parseFloat(data.Expenses[i].amount);
            } else if (monthNumber === 8) {
                sumExpenseAug = sumExpenseAug + parseFloat(data.Expenses[i].amount);
            } else if (monthNumber === 9) {
                sumExpenseSept = sumExpenseSept + parseFloat(data.Expenses[i].amount);
            } else if (monthNumber === 10) {
                sumExpenseOct = sumExpenseOct + parseFloat(data.Expenses[i].amount);
            } else if (monthNumber === 11) {
                sumExpenseNov = sumExpenseNov + parseFloat(data.Expenses[i].amount);
            } else if (monthNumber === 12) {
                sumExpenseDec = sumExpenseDec + parseFloat(data.Expenses[i].amount);
            }

        }

        sumExpenseMonthsArray.push(sumExpenseJan, sumExpenseFeb, sumExpenseMar, sumExpenseApr, sumExpenseMay, sumExpenseJun, sumExpenseJul, sumExpenseAug, sumExpenseSept, sumExpenseOct, sumExpenseNov, sumExpenseDec)

        // console.log(sumExpenseMonthsArray);

        const ctx = document.getElementById('myChart').getContext('2d');

        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"], //use ajax call and grab the description from each table, and insert the variable here(this is the x-axis and will be the name of the data within the chart)
                datasets: [{
                    //your own label here
                    label: "Expenses",
                    data: [...sumExpenseMonthsArray], //use ajax call and grab the amount and insert it the variable here(this is the y-axis)
                    backgroundColor: 'red',
                    borderWidth: 1
                },
                {
                    //your own label here
                    label: "Income",
                    data: [...sumIncomeMonthsArray], //use ajax call and grab the amount and insert it the variable here(this is the y-axis)
                    backgroundColor: 'green',
                    borderWidth: 1
                }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            },
        });

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        $("#budgetAmountGoesHere").append(formatter.format(data.Budgets[0].amount))

        let sumYearExpenses = 
        sumExpenseJan + 
        sumExpenseFeb + 
        sumExpenseMar + 
        sumExpenseApr + 
        sumExpenseMay + 
        sumExpenseJun + 
        sumExpenseJul + 
        sumExpenseAug + 
        sumExpenseSept + 
        sumExpenseOct + 
        sumExpenseNov + 
        sumExpenseDec;

        $("#expenseAmountGoesHere").append(formatter.format(sumYearExpenses))

        $("#leftoverAmountGoesHere").append(formatter.format((data.Budgets[0].amount - sumYearExpenses)))

    });
});