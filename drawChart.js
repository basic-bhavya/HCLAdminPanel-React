import React from 'react';
import Chart from 'chart.js';
import { useStoreState, useStoreActions } from 'easy-peasy';

function drawChart() {
    const Name = useStoreState(state => state.markers.name);
    
}

export default drawChart;