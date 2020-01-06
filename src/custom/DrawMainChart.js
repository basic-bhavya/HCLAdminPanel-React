import React from 'react';
import 'chartjs-plugin-zoom';
import 'chartjs-plugin-streaming';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { Line } from 'react-chartjs-2';
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

const DrawMainChart = () => {
    // const allData = useStoreState(state => state.data);
    // const fetchTest = useStoreActions(action => action.fetchTest);

    var a = 0;

    var mainChartData = {
        datasets: [
            {
                label: 'Tower A',
                backgroundColor: hexToRgba(brandInfo, 10),
                borderColor: brandInfo,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 3,
                data: [],
            },
            {
                label: 'Tower B',
                backgroundColor: 'transparent',
                borderColor: brandSuccess,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 3,
                data: [],
            },
            {
                label: 'Tower C',
                backgroundColor: 'transparent',
                borderColor: brandDanger,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 3,
                // borderDash: [8, 5],
                data: [],
            },
            {
                label: 'Tower D',
                backgroundColor: 'transparent',
                borderColor: brandWarning,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 3,
                // borderDash: [8, 5],
                data: [],
            },
        ],
    };

    var mainChartOptns = {
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
                    type: 'realtime',
                    realtime: {
                        duration: 20000,
                        refresh: 1000,
                        delay: 2000,
                        ttl: 100000,
                        onRefresh: function (chart) {
                            var xhr = new XMLHttpRequest();

                            xhr.open('GET', 'http://127.0.0.1:8000/tower/bhavya');
                            xhr.onload = function () {
                                if (xhr.readyState === 4 && xhr.status === 200) {
                                    // assume the response is an array of {x: timestamp, y: value} objects
                                    var rawData = JSON.parse(xhr.responseText);

                                    var allPredicted = rawData.predicted_Usage.map(tower => {
                                        return tower.data;
                                    })

                                    var allActual = [rawData.actual_Usage.map(tower => {
                                        return tower.data;
                                    })]

                                    var allDiff = [rawData.difference.map(tower => {
                                        return tower.data;
                                    })]

                                    chart.data.datasets[0].data.push({
                                        x: Date.now(),
                                        y: allPredicted[0][a]
                                    })
                                    chart.data.datasets[1].data.push({
                                        x: Date.now(),
                                        y: allPredicted[1][a]
                                    })
                                    chart.data.datasets[2].data.push({
                                        x: Date.now(),
                                        y: allPredicted[2][a]
                                    })
                                    chart.data.datasets[3].data.push({
                                        x: Date.now(),
                                        y: allPredicted[3][a]
                                    })

                                    a += 1;
                                    if (a >= allPredicted[0].length) a = 0;

                                    // append the new data array to the existing chart data
                                    // chart.data.datasets[0].data.push(data1);
                                    // chart.data.datasets[1].data.push(data2);
                                    // chart.data.datasets[2].data.push(data3);

                                    // update chart datasets keeping the current animation
                                    chart.update({
                                        preservation: true
                                    });
                                }
                            };
                            xhr.send();
                            // chart.data.datasets.forEach(function (dataset) {
                            //   dataset.data.push({
                            //     x: Date.now(),
                            //     y: Math.random()
                            //   })
                            // })

                        },
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
                    }
                }],
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Bandwidth (TB/s)'
                    },

                    ticks: {
                        beginAtZero: true,
                        //   maxTicksLimit: 5,
                        //   stepSize: Math.ceil(120 / 5),
                        //   max: 120,
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

    // return <Line data={mainChartData} options={mainChartOptns} height={300} />
    return <Line data={mainChartData} options={mainChartOptns} height={300} />
}

export default DrawMainChart;

