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
        authorServicesInit,
        advertServicesInit,
        currentUserServicesInit
    ],
    notifier : [
        notifierControllersInit,
        notifierServicesInit,
        notifierDirectivesInit
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
    author : [
        authorControllersInit,
        authorDirectivesInit
    ],
    config : [
        applicationConfig
    ],
    translation : [
        translationControllersInit,
        languagesDirectivesInit
    ],
    images: [
        imagesDirectivesInit,
        imageUploadControllersInit
    ]
};

const portfolio = new Portfolio(modules);

portfolio.init(components);