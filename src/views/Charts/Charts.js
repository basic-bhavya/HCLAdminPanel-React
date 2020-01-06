import React, { Component, useEffect } from 'react';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { useStoreState, useStoreActions } from 'easy-peasy';
import * as plots from '../../custom/data/plots';
import * as Towers from '../../custom/data/TowerLocs';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

var pieT = [1, 2, 3, 4];

var xhr = new XMLHttpRequest();

const line = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const bar = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const mainChart = {
  // labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  // labels: ['1AM','2AM','3AM','4AM','5AM','6AM','7AM','8AM','9AM','10AM','11AM','12AM','1AM','2AM','3AM','4AM','5AM','6AM','7AM','8AM','9AM','10AM','11AM','12AM'],
  labels: plots.labels,
  datasets: [
    {
      label: 'Tower A',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 3,
      data: plots.plot1y,
    },
    {
      label: 'Tower B',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 3,
      data: plots.plot2y,
    },
    {
      label: 'Tower C',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 3,
      // borderDash: [8, 5],
      data: plots.plot3y,
    },
    {
      label: 'Tower D',
      backgroundColor: 'transparent',
      borderColor: brandWarning,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 3,
      // borderDash: [8, 5],
      data: plots.plot4y,
    },
  ],
};

var a = 0;

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

// function updateChart(pieChart){
//   chart.data.datasets[0].data = pieT;
// }

export default function Charts() {

  const dataArr = useStoreState(state => state.pieData);
  const setPie = useStoreActions(action => action.setPie);

  function drawPie(index) {
    xhr.open('GET', 'http://127.0.0.1:8000/tower/bhavya');
    xhr.onload = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // assume the response is an array of {x: timestamp, y: value} objects
        var rawData = JSON.parse(xhr.responseText);
        var pieTower = [rawData.actual_Usage.map((tower, i, towerArr) => {
          return tower.data[index];
          // tower.data.map((value,index,dataArr) => {
          //   pieTower.push(dataArr[index]);
          // });
          // totsum += sum;
          // return tower.actual_Usage[index].toPrecision(5)
        })]

        setPie(pieTower);

      }

    }
    xhr.send();
  }

  // const fetchTest = useStoreActions(action => action.fetchTest);
  // const TowerList = useStoreState(state => state.towers.towerList);
  // const data = useStoreState(state => state.data);

  const pie = {
    labels: Towers.TowerList.map(tower => tower.title),

    datasets: [
      {
        data: dataArr[0],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#00AE55'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#00AE55'
        ],
      }],
  };

  const mainChartOpts = {
    events: ['click'],
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
    onHover: function (e, item) {
      if (item.length) {
        drawPie(item[0]._index);
        console.log(dataArr[0]);
      }
    },
    axisX: {
      interval: 1000
    },
    maintainAspectRatio: false,
    legend: {
      display: true,
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
            }
          }
        }],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Bandwidth (TB/s)'
          },
          // {
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

  var PieChart = <Pie data={pie} options={{
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var meta = dataset._meta[Object.keys(dataset._meta)[0]];
          var total = meta.total;
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat((currentValue / total * 100).toFixed(1));
          return currentValue + ' TB/s' + ' (' + percentage + '%)';
        },
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        }
      }
    }
  }
  } />

  // render() {
  return (
    <div className="animated fadeIn">
      <CardColumns className="cols-2">
        <Card>
          <CardHeader>
            Percentage utilization of hardware
              <div className="card-header-actions">
              <a href="http://www.chartjs.org" className="card-header-action">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            <div className="chart-wrapper">
              {/* <Bar data={bar} options={options} /> */}
              <Line data={mainChart} options={mainChartOpts} height={300} />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            Bandwidth Distribution (Daily average)
              <div className="card-header-actions">
              <a href="http://www.chartjs.org" className="card-header-action">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            <div className="chart-wrapper">
              {PieChart}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            Bar Chart
              <div className="card-header-actions">
              <a href="http://www.chartjs.org" className="card-header-action">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            <div className="chart-wrapper">
              <Bar data={bar} options={options} />
            </div>
          </CardBody>
        </Card>
      </CardColumns>
    </div>
  );
}
// }

// export default Charts;
