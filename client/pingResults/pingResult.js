import { PingStatus } from '../../imports/api/pingStatus.js';
import HighCharts from 'highcharts';

Template.pingResult.onCreated(function() {
    this.autorun(() => {
        this.subscribe("pingStatuses", Session.get("myUrl"));
    })
});

Template.pingResult.onRendered(function() {
    $('.modal').modal();

    let myUrl = Session.get("myUrl");
    this.data = [];
    this.autorun(() => {
        if (this.subscriptionsReady()) { // Whenever the data changes...
            this.data = PingStatus.find({})
            .map(doc => {
                return [doc.runOn, doc.pingTime]
            });
            // this.chart.series[0].setData(this.data);
            var myObj = this.data
        }
        
    });

    if (typeof myObj == 'undefined') {
        setTimeout(function() {
            console.log("Waiting for Object to be created.");
        }, 150);
    } else {
        console.log(myObj);
        
        HighCharts.chart('container', {
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
                            color: (HighCharts.theme && HighCharts.theme.contrastTextColor) || 'red'
                        },
                    }
                }
            },
            series: [{
                type: 'line',
                name: 'Days / Ping Times',
                data: myObj
            }]
        });
    }     
});

Template.pingResult.helpers({
    myUrl: function() {
        return Session.get("myUrl");
    },
});

Template.pingResult.events({
    'click .pingTimeModal' (event) {
        event.preventDefault();
        Session.set("myUrl", "");

        Session.set("pingVis", false);
        
        let thisModal = document.getElementById("modal-ping");
        thisModal.style.display = "none";
    }
});