import React from "react";

import { DishesCard } from './DishesCard';

export function TabContent(props) {


    let renderDishes = (tab, dishes) => {
        let data = [];
        for (const dish of dishes) {
            if (dish?.remain > 0) {
                switch (tab) {
                    case 1:
                        if (dish?.category === 0) data.push(dish);
                        break;
                    case 2:
                        if (dish?.category === 1) data.push(dish);
                        break;
                    case 3:
                        if (dish?.category === 2) data.push(dish);
                        break;
                    default:
                        data.push(dish);
                        break;
                }
            }
        }

        return (
            <div class="row ${1| ,row-cols-2,row-cols-3, auto,justify-content-md-center,|}">
                {data.map((dish) => {
                    return <DishesCard dish={dish} />;
                })}
            </div>
        );
    }

    return (
        <div>
            {renderDishes(props.tabType, props.dishes)}
        </div>
    );
}