import React from "react";
import { DishesCard } from './DishesCard';
import {ListOfDishes} from './ListOfDishes'

let renderDishes = (tabType) => {
    let data = []
    for (const dish of ListOfDishes) {
        switch (tabType) {
            case 1:
                if (dish.category === 'Food') data.push(dish);
                break;
            case 2:
                if (dish.category === 'Drink') data.push(dish);
                break;
            case 3:
                if (dish.category === 'Dessert') data.push(dish);
                break;
            default:
                data.push(dish);
                break;
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