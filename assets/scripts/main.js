"use strict";

class Portfolio {
    constructor ( modules ) {
        this.modules = modules;
    }

    initComponents ( module, components ) {
        for ( let index = 0; index < components.length; index++ ) {
            components[ index ](this.modules[ module ]);
        }
    }

    init ( components ) {
        for ( let module in components ) {
            if ( components.hasOwnProperty(module) ) {
                this.initComponents(module, components[ module ]);
            }
        }
    }
}
const modules = getModules();
const components = {
    services : [
        apiGenServicesInit,
        authServicesInit,
        validationServicesInit,
        advertiserServicesInit,
        advertServicesInit
    ],
    auth : [
        authControllersInit
    ],
    popup : [
        popupControllersInit,
        popupDirectivesInit
    ],
    advert : [
        advertControllersInit,
        advertDirectivesInit
    ],
    advertiser : [
        advertiserControllersInit,
        advertiserDirectivesInit
    ]
};

const portfolio = new Portfolio(modules);

portfolio.init(components);