$(document).ready(function () {
    var url = "https://api.covid19india.org/state_district_wise.json"; 

    $.getJSON(url , function (data) {
        var stateData = data['Gujarat']
        var districtData = stateData['districtData']
        var districtList = Object.keys(districtData);
        console.log(districtList);
        
        var total_active = 0;
        var total_recovered = 0;
        var total_deaths = 0;
        var total_confirmed = 0;

        var districtwise = [];
        var confirmed = [];
        var recovered = [];
        var deaths = [];
        var active = [];
        
        districtList.forEach(function(district){
            districtwise.push(district);
            var activeCount = districtData[district]['active'];
            var recoveredCount = districtData[district]['recovered'];
            var deathsCount = districtData[district]['deceased'];
            var confirmedCount = districtData[district]['confirmed'];
            confirmed.push(confirmedCount)
            recovered.push(recoveredCount)
            deaths.push(deathsCount)
            active.push(activeCount)

            total_active += activeCount
            total_confirmed += confirmedCount
            total_recovered += recoveredCount
            total_deaths += deathsCount

        });

        districtwise.shift();
        confirmed.shift();
        recovered.shift();
        deaths.shift();
        
        $("#active").append(total_active);
        $("#recovered").append(total_recovered);
        $("#deaths").append(total_deaths);
        $("#confirmed").append(total_confirmed);

        var ctx = document.getElementById("myChart").getContext('2d');

        var myChart = new Chart(ctx,{
            type:'line',
            data:{
                labels: districtwise,
                datasets:[
                    {
                         label:"Confirmed Cases",
                         data :confirmed,
                         backgroundColor:"#f1c40f",
                         minBarLength:100
                    },
                    {
                        label: "Recovered Cases",
                        data: recovered,
                        backgroundColor: "#2ec771",
                        minBarLength: 100
                    },
                    {
                        label: "Deceased",
                        data: deaths,
                        backgroundColor: "#e74c3c",
                        minBarLength: 100
                    }  
                ]
            },
            options:{}
        });

    })
})

