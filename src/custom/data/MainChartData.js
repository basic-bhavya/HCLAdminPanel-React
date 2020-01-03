// import React from 'react';
import { useStoreState } from 'easy-peasy';
// import * as plots from '../data/plots';

// var data;

// const MainChartData = () => {
//     var allData = useStoreState(state => state.data);
//     var allPredicted = allData.map(p => {
//         return p.predicted_Usage;
//     });

//     data = {
//         labels: plots.labels,
//         datasets: [
//             {
//                 label: 'Tower A',
//                 backgroundColor: 'transparent',
//                 borderColor: 'rgb(255,0,0)',
//                 pointHoverBackgroundColor: '#fff',
//                 borderWidth: 3,
//                 data: allPredicted[0],
//             },
//             {
//                 label: 'Tower B',
//                 backgroundColor: 'transparent',
//                 borderColor: 'rgb(0,255,0)',
//                 pointHoverBackgroundColor: '#fff',
//                 borderWidth: 3,
//                 data: allPredicted[1],
//             },
//             {
//                 label: 'Tower C',
//                 backgroundColor: 'transparent',
//                 borderColor: 'rgb(0,0,255)',
//                 pointHoverBackgroundColor: '#fff',
//                 borderWidth: 3,
//                 // borderDash: [8, 5],
//                 data: allPredicted[2],
//             },
//             {
//                 label: 'Tower D',
//                 backgroundColor: 'transparent',
//                 borderColor: 'rgb(255,0,255)',
//                 pointHoverBackgroundColor: '#fff',
//                 borderWidth: 3,
//                 // borderDash: [8, 5],
//                 data: allPredicted[3],
//             }
//         ]
//     }

//     console.log(data);

//     return null;
    
// }

// export {data};

// export default MainChartData;