import { PingStatus } from '../../imports/api/pingStatus.js';

Template.pingResult.onCreated(function() {
    this.subscribe("pingStatuses", Session.get("myUrl"));
});

Template.pingResult.onRendered(function() {
    $('.modal').modal();
});

Template.pingResult.helpers({
    myUrl: function() {
        return Session.get("myUrl");
    },
    pingTimeChart: function() {
        let pingTimeObj = Session.get("pingObj");

        // console.log(pingTimeObj);
        return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: "Ping Times"
            },
            tooltip: {
                pointFormat: '<b>{point.y} ms</b>'
            },
            plotOptions: {
                line: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: null,
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'red'
                        },
                    }
                }
            },
            series: [{
                type: 'line',
                name: 'Days / Ping Times',
                data: pingTimeObj
            }]
        };
    },
});

Template.pingResult.events({
    'click .pingTimeModal' (event) {
        event.preventDefault();

        let thisModal = document.getElementById("modal-ping");
        thisModal.style.display = "none";
    }
});