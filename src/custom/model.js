import * as Towers from './data/TowerLocs';
import * as plots from './data/plots';
import { action, thunk } from 'easy-peasy';

export default {
    //thunk
    fetchTest: thunk(async actions => {
        const t1 = await fetch('http://127.0.0.1:8000/tower/details?name=towerone');
        const t2 = await fetch('http://127.0.0.1:8000/tower/details?name=towertwo');
        const t3 = await fetch('http://127.0.0.1:8000/tower/details?name=towerthree');
        const t4 = await fetch('http://127.0.0.1:8000/tower/details?name=towerfour');

        const t1Data = await t1.json();
        const t2Data = await t2.json();
        const t3Data = await t3.json();
        const t4Data = await t4.json();

        // actions.plots.setData(allData);
        actions.setAll([t1Data, t2Data, t3Data, t4Data]);
    }),

    //towers model
    towers: {
        selected: Towers.TowerList[0],
        towerList: Towers.TowerList,
        towerCount: 4,
        setTower: action((state, payload) => {
            state.selected = payload;
        }),
    },

    data: [],
    selected: [plots.towerone.predicted_Usage, plots.towerone.actual_Usage, plots.towerone.difference],
    setAll: action((state, payload) => {
        state.data = [payload[0], payload[1], payload[2], payload[3]];
    }),
    setThis: action((state, payload) => {
        // state.accessThis = payload;
        state.selected = [payload.predicted_Usage,payload.actual_Usage,payload.difference];
    }),
    //plots model
    plots: {
        selected: {
            // predicted: plots.towerone.predicted_Usage,
            // actual: plots.towerone.actual_Usage,
            // diff: plots.towerone.difference
        },
        allData: plots.dataArr,
        setData: action((state, payload) => {
            state.selected = payload;
        }),
        setTestData: action((state, payload) => {
            state.testData = payload;
        })
    }
}