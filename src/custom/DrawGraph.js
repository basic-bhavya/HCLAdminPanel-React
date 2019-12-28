import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
// import plots from './data/plots';
import { useStoreState, useStoreActions } from 'easy-peasy';

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

const DrawGraph = () => {

  const selTowerID = useStoreState(state => state.towers.selected.id);
  const plotData = useStoreState(state => state.plots.selected);
  const setData = useStoreActions(action => action.plots.setData);
  const plots = useStoreState(state => state.plots.allData);

  if(selTowerID===1) setData(plots[0]);
  if(selTowerID===2) setData(plots[1]);
  if(selTowerID===3) setData(plots[2]);
  if(selTowerID===4) setData(plots[3]);

  console.log(plotData);
  return <Line data={plotData} options={optns} />
  return <p>Hello</p>
}

export default DrawGraph;