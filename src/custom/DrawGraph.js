import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import Fileplots from './data/plots';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

var a = 0;

const DrawGraph = ({ height }) => {

  const selTowerID = useStoreState(state => state.towers.selected.id);
  // const plotData = useStoreState(state => state.plots.selected);

  const selected = useStoreState(state => state.selected);
  const setThis = useStoreActions(action => action.setThis);

  const name = useStoreState(state => state.towers.selected.title);

  // const setTestData = useStoreActions(action=>action.plots.setTestData);
  const fetchTest = useStoreActions(action => action.fetchTest);
  const allData = useStoreState(state => state.data);

  const getlink = () => {
    var link;
    if (selTowerID === 1) return 'http://127.0.0.1:8000/tower/details?name=towerone';
    else if (selTowerID === 2) return 'http://127.0.0.1:8000/tower/details?name=towertwo';
    else if (selTowerID === 3) return 'http://127.0.0.1:8000/tower/details?name=towerthree';
    else if (selTowerID === 4) return 'http://127.0.0.1:8000/tower/details?name=towerfour';

  }

  useEffect(() => {
    fetchTest();
    allData.map(d => {
      if (selTowerID === d.id) {
        setThis(d);
      }
    });
    //eslint-disable-next-line
  }, [selTowerID]);

  var plotData = {
    // labels: Fileplots.labels,
    datasets: [
      {
        label: 'Predicted',
        backgroundColor: 'transparent',
        borderColor: 'rgba(0,255,0)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        // data: selected[0],
        data: []
      },
      {
        label: 'Actual',
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,0,0)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        // data: selected[1],
        data: []
      },
      {
        label: 'Difference',
        backgroundColor: 'transparent',
        borderColor: 'rgba(0,0,255)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        // data: selected[2],
        data: []
      },
    ],
  }

  var a = 0;

  var optns = {
    responsive: true,
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
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
      display: true,
    },
    title: {
      display: true,
      text: JSON.stringify(name),

      fontSize: 18
    },
    scales: {
      xAxes: [
        {
          type: 'realtime',
          realtime: {
            duration: 10000,
            refresh: 1000,
            delay: 2000,
            onRefresh: function (chart) {
              // chart.data.datasets.forEach(function (dataset) {
              //   dataset.data.push({
              //     x: Date.now(),
              //     y: Math.random()
              //   })
              // })
              var xhr = new XMLHttpRequest();

              xhr.open('GET', getlink());
              xhr.onload = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                  // assume the response is an array of {x: timestamp, y: value} objects
                  var rawData = JSON.parse(xhr.responseText);

                  var data1 = {
                    x: Date.now(),
                    y: rawData.predicted_Usage[a]
                  }
                  var data2 = {
                    x: Date.now(),
                    y: rawData.actual_Usage[a]
                  }
                  var data3 = {
                    x: Date.now(),
                    y: rawData.difference[a]
                  }

                  a += 1;

                  if (a >= rawData.predicted_Usage.length) a = 0;
                  // append the new data array to the existing chart data
                  chart.data.datasets[0].data.push(data1);
                  chart.data.datasets[1].data.push(data2);
                  chart.data.datasets[2].data.push(data3);

                  // update chart datasets keeping the current animation
                  chart.update({
                    preservation: true
                  });
                }
              };
              xhr.send();

            }

          }
        }],
      // scaleLabel: {
      //   display: true,
      //   labelString: 'Time'
      // },
      // gridLines: {
      //   drawOnChartArea: false,
      // },
      // ticks: {
      //   maxTicksLimit: 24,
      //   callback: function (value, index, values) {
      //     if (value < 1200) {
      //       var front = value.toString().substring(0, 2);
      //       var end = "AM";
      //     } else {
      //       var front = ((value / 100).toPrecision(2) - 12).toString().substring(0, 2);
      //       var end = "PM";
      //     }
      //     var back = value.toString().substring(2, 4);
      //     return front + ":" + back + end;
      //     // var back = (value%100)===0.0? "00" : (value%100).toPrecision(2);
      //     // if(value==="0000")
      //     //   return "00:00 AM";
      //     // else if(value==="1200")
      //     //   return "00:00 PM"
      //     // if(value<1200)
      //     //   return (value/1).toPrecision(2)+":"+back + " AM";
      //     // else return (value/1).toPrecision(2)-12+":"+back + " PM";

      //   }
      // }
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Bandwidth (TB/s)'
          },
          ticks: {
            beginAtZero: true,
            // maxTicksLimit: 5,
            // stepSize: Math.ceil(120 / 5),
            // max: 100,
          },
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
    pan: {
      enabled: true,    // Enable panning
      mode: 'x',        // Allow panning in the x direction
      rangeMin: {
        x: null       // Min value of the delay option
      },
      rangeMax: {
        x: null       // Max value of the delay option
      }
    },
    zoom: {
      enabled: true,    // Enable zooming
      mode: 'x',        // Allow zooming in the x direction
      rangeMin: {
        x: null       // Min value of the duration option
      },
      rangeMax: {
        x: null       // Max value of the duration option
      }
    }
  };

  // setData(plots[selTowerID - 1]);
  // if (selTowerID === 1) setData(plots[0]);
  // else if (selTowerID === 2) setData(plots[1]);
  // else if (selTowerID === 3) setData(plots[2]);
  // else if (selTowerID === 4) setData(plots[3]);

  return <Line data={plotData} options={optns} height={height} />;
}

export default DrawGraph;