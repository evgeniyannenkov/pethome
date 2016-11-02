"use strict";

class Builder {
    constructor ( modules, constants = {} ) {
        this.modules = modules;
        this.constants = constants;
    }

    initComponents ( module, components ) {
        for ( let index = 0; index < components.length; index++ ) {
            components[ index ](this.modules[ module ], this.constants);
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
const constants = {
    templatesFolder : "/assets/templates"
};

const components = {
    services : [
        apiGenServicesInit,
        authServicesInit,
        validationServicesInit,
        authorServicesInit,
        advertServicesInit,
        currentUserServicesInit
    ],
    filters : [
        appFiltersInit,
    ],
    notifier : [
        notifierControllersInit,
        notifierServicesInit,
        notifierComponentsInit
    ],
    auth : [
        authControllersInit
    ],
    popup : [
        popupControllersInit,
        popupComponentsInit
    ],
    advert : [
        advertControllersInit,
        advertComponentsInit
    ],
    author : [
        authorControllersInit,
        authorComponentsInit
    ],
    config : [
        applicationConfig
    ],
    translation : [
        translationControllersInit,
        languagesComponentsInit
    ],
    images : [
        imagesComponentsInit,
        imageUploadControllersInit
    ],
    form : [
        formComponentsInit
    ],
    header : [
        headerComponentsInit
    ]
};

const builder = new Builder(modules, constants);

builder.init(components);