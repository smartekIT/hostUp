import { PingStatus } from '../../imports/api/pingStatus.js';
import HighCharts from 'highcharts';

Template.pingResult.onCreated(function () {
  this.autorun(() => {
    this.subscribe("pingStatuses", Session.get("myUrl"));
  });
});

Template.pingResult.onRendered(function () {
  $('.modal').modal();

  this.autorun(() => {
    let myUrl = Session.get("myUrl"); // will redraw the base chart if the url changes (if you don't want to do this, move this line above the autorun)
    this.chart = HighCharts.chart('container', { // draw the base chart
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
        data: this.data // the data will eventually appear here
      }]
    });

    if (this.subscriptionsReady()) { // Whenever the data changes or is first available...
      this.data = PingStatus.find({}) // (re)generate the series data
        .map(doc => {
          return [doc.runOn, doc.pingTime]
        });
      this.chart.series[0].setData(this.data); // and give it to be re-rendered
    }
  });
});

Template.pingResult.helpers({
  myUrl: function () {
    return Session.get("myUrl");
  },
});

Template.pingResult.events({
  'click .pingTimeModal'(event) {
    event.preventDefault();
    Session.set("myUrl", "");

    let thisModal = document.getElementById("modal-ping");
    thisModal.style.display = "none";
  }
});