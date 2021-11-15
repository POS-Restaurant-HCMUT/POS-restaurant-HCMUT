import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { TabContent } from './TabContent'
import './ViewMenu.css';

function ViewMenu() {
    const [toggleState, setToggleState] = useState(0);
    const [dishes, getListOfDish] = useState([]);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    useEffect(()=>{
        axios.get('/api/menu').then((res) => {
            if (res.status === 200) {
                getListOfDish(res.data);
            }
        }).catch(err => console.log(err));
    }, []);

    return (
        <div className="menu-content">
            <div className="tabs-container">
                <div className="bloc-tabs">
                    <div className={toggleState === 0 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(0)}>
                        <h4>All</h4>
                    </div>
                    <div className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(1)}>
                        <h4>Food</h4>
                    </div>
                    <div className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(2)}>
                        <h4>Drink</h4>
                    </div>
                    <div className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(3)}>
                        <h4>Dessert</h4>
                    </div>
                </div>

                <div className="content-tabs">
                    <div className={toggleState === 0 ? "content  active-content" : "content"}>
                        <TabContent tabType={toggleState} dishes={dishes} />
                    </div>
                    <div className={toggleState === 1 ? "content  active-content" : "content"}>
                        <TabContent tabType={toggleState} dishes={dishes} />
                    </div>
                    <div className={toggleState === 2 ? "content  active-content" : "content"}>
                        <TabContent tabType={toggleState} dishes={dishes} />
                    </div>
                    <div className={toggleState === 3 ? "content  active-content" : "content"}>
                        <TabContent tabType={toggleState} dishes={dishes} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewMenu;