import * as Towers from './data/TowerLocs';
import * as plots from './data/plots';
import { action, thunk } from 'easy-peasy';

export default {
    //thunk
    fetchTest: thunk(async actions=>{
        const res = await fetch('http://127.0.0.1:8000/tower/details?name=towerone');
        const allData = await res.json();
        actions.plots.setTestData(allData);
        console.log(allData);
    
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

    //plots model
    plots: {
        selected: plots.data1,
        allData: plots.dataArr,
        setData: action((state,payload)=>{
            state.selected = payload; 
        }),
        setTestData: action((state,payload)=>{
            state.testData = payload;
        })
    }
}