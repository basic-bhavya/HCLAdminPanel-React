import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

var optns = {
    tooltips: {
      enabled: false,
      // custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function (tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
        }
      }
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
          ticks: {
            callback: function (value, index, values) {
              return value + "AM";
  
            }
          }
        }],
      yAxes: [
        {
          // ticks: {
          //   beginAtZero: true,
          //   maxTicksLimit: 5,
          //   stepSize: Math.ceil(120 / 5),
          //   max: 120,
          // },
        }],
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
  };

export default function DrawGraph(){
    // var id = props.tower.id;
    // var ChartHere = React.findDOMNode(this.refs.indiChart).value;
    // console.log(ChartHere);
    
    // return <Line data={props.data} options={optns}/>
}
