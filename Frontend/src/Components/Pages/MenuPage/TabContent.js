import React from "react";
// import axios from 'axios';
import { DishesCard } from './DishesCard';
import {ListOfDishes} from './ListOfDishes'

let getLishOfDishes = () => {
    // try {
    //     axios.get('/view-menu').then((res)=>{
    //         if(res.status===200)
    //             return res.data;
    //         else
    //             return [];
    //     });
    // } 
    // catch (error) {
    //     return ListOfDishes;
    // }
    return ListOfDishes;
}

let renderDishes = (tabType) => {
    let data = [];
    let dishes = getLishOfDishes();
    for (const dish of dishes) {
        if(dish.remain>0){
            switch (tabType) {
                case 1:
                    if (dish.cate === 'Food') data.push(dish);
                    break;
                case 2:
                    if (dish.cate === 'Drink') data.push(dish);
                    break;
                case 3:
                    if (dish.cate === 'Dessert') data.push(dish);
                    break;
                default:
                    data.push(dish);
                    break;
            }
        }
    }
    return (
        <div class="row ${1| ,row-cols-2,row-cols-3, auto,justify-content-md-center,|}">
            {data.map((dish,index)=>{
                return <DishesCard dish={dish}/>;
            })}
        </div>
    );
}

export function TabContent(props) {
    return (
        <div>
            {renderDishes(props.tabType)}
        </div>
    );
}