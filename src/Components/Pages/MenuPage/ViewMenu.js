import React from "react";
import { useState } from "react";
import { TabContent } from './TabContent'
import './ViewMenu.css';

function ViewMenu() {
  const [toggleState, setToggleState] = useState(0);

    const toggleTab = (index) => {
        setToggleState(index);
    };

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
                        <TabContent tabType={toggleState}/>
                    </div>
                    <div className={toggleState === 1 ? "content  active-content" : "content"}>
                        <TabContent tabType={toggleState}/>
                    </div>
                    <div className={toggleState === 2 ? "content  active-content" : "content"}>
                        <TabContent tabType={toggleState}/>
                    </div>
                    <div className={toggleState === 3 ? "content  active-content" : "content"}>
                        <TabContent tabType={toggleState}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewMenu;