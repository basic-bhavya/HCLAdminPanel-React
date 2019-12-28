import * as Towers from './data/TowerLocs';
import * as plots from './data/plots';
import { action } from 'easy-peasy';

export default {
    towers: {
        selected: Towers.TowerList[0],
        towerList: Towers.TowerList,
        towerCount: 4,
        setTower: action((state, payload) => {
            state.selected = payload;
        }),
    },
    plots: {
        selected: plots.data1,
        allData: plots.dataArr,
        setData: action((state,payload)=>{
            state.selected = payload; 
        })
    }
}