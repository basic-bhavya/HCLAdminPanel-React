import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Fileplots from './data/plots';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

const DrawGraph = ({ height }) => {

  const selTowerID = useStoreState(state => state.towers.selected.id);
  // const plotData = useStoreState(state => state.plots.selected);
  const predicted = useStoreState(state => state.plots.selected.predicted);
  const actual = useStoreState(state => state.plots.selected.actual);
  const diff = useStoreState(state => state.plots.selected.diff);

  const selected = useStoreState(state => state.selected);
  const setThis = useStoreActions(action => action.setThis);

  const plots = useStoreState(state => state.plots.allData);
  const name = useStoreState(state => state.towers.selected.title);
  //TEST
  const testData = useStoreState(state => state.plots.testData);
  // const setTestData = useStoreActions(action=>action.plots.setTestData);
  const fetchTest = useStoreActions(action => action.fetchTest);
  const data = useStoreState(state=>state.data);
  const setData = useStoreActions(action => action.plots.setData);

  console.log('=========BEFORE EFFECT======');
  console.log(selected);
  // console.log(actual);
  // console.log(diff);
  console.log('====================================');

  useEffect(() => {
    fetchTest();
    data.map(d=>{
      if(selTowerID === d.id){
        setThis(d);
      }
    });
    //eslint-disable-next-line
  }, [selTowerID]);

  console.log('============AFTER EFFECT==========');
  console.log(data);
  // console.log(actual);
  // console.log(diff);
  console.log('====================================');

  var plotData = {
    labels: Fileplots.labels,
    datasets: [
      {
        label: 'Predicted',
        backgroundColor: 'transparent',
        borderColor: 'rgba(0,255,0)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: selected[0],
      },
      {
        label: 'Actual',
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,0,0)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: selected[1],
      },
      {
        label: 'Difference',
        backgroundColor: 'transparent',
        borderColor: 'rgba(0,0,255)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: selected[2],
      },
    ],
  }

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
      display: false,
    },
    title: {
      display: true,
      text: JSON.stringify(name),

      fontSize: 18
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Time'
          },
          gridLines: {
            drawOnChartArea: false,
          },
          ticks: {
            maxTicksLimit: 24,
            callback: function (value, index, values) {
              if (value < 1200) {
                var front = value.toString().substring(0, 2);
                var end = "AM";
              } else {
                var front = ((value / 100).toPrecision(2) - 12).toString().substring(0, 2);
                var end = "PM";
              }
              var back = value.toString().substring(2, 4);
              return front + ":" + back + end;
              // var back = (value%100)===0.0? "00" : (value%100).toPrecision(2);
              // if(value==="0000")
              //   return "00:00 AM";
              // else if(value==="1200")
              //   return "00:00 PM"
              // if(value<1200)
              //   return (value/1).toPrecision(2)+":"+back + " AM";
              // else return (value/1).toPrecision(2)-12+":"+back + " PM";

            }
          }
        }],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Bandwidth (TB/s)'
          },
          ticks: {
            // beginAtZero: true,
            // maxTicksLimit: 5,
            // stepSize: Math.ceil(120 / 5),
            // max: 120,
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
  };

  // setData(plots[selTowerID - 1]);
  // if (selTowerID === 1) setData(plots[0]);
  // else if (selTowerID === 2) setData(plots[1]);
  // else if (selTowerID === 3) setData(plots[2]);
  // else if (selTowerID === 4) setData(plots[3]);

  return <Line data={plotData} options={optns} height={height} />;
}

export default DrawGraph;