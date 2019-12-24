import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import plots from './data/plots';

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

const DrawGraph = ({towerID, name}) => {
  var plotData;
  if(towerID===1) plotData = plots.data1;
  if(towerID===2) plotData = plots.data2;
  if(towerID===3) plotData = plots.data3;
  if(towerID===4) plotData = plots.data4;
  console.log(plotData);
  
  return <Line data={plotData} options={optns} />
  // return <p>Hello</p>
}

export default DrawGraph;