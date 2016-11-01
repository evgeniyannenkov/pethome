"use strict";

class Builder {
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
    images: [
        imagesComponentsInit,
        imageUploadControllersInit
    ],
    form : [
        formComponentsInit
    ]
};

const builder = new Builder(modules);

builder.init(components);