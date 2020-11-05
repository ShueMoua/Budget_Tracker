$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function (data) {
        $(".member-name").text("Welcome " + data[0].email);
        console.log(data);

        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Something', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], //use ajax call and grab the description from each table, and insert the variable here(this is the x-axis and will be the name of the data within the chart)
                datasets: [{
                    //your own label here
                    label: 'Expenses',
                    data: [12, 19, 3, 5, 2, 3], //use ajax call and grab the amount and insert it the variable here(this is the y-axis)
                    fill: false,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1
                }]
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
    });



});
