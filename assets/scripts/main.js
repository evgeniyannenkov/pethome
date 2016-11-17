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
    providers : [
        translatorProviderInit
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
        authControllersInit,
        authComponentsInit
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
    translation : [
        translationControllersInit,
        languagesComponentsInit
    ],
    images : [
        imagesComponentsInit,
        imageUploadControllersInit
    ],
    form : [
        formComponentsInit,
        formControllersInit
    ],
    header : [
        headerComponentsInit,
        headerControllersInit
    ],
    paralax : [
        paralaxComponentsInit
    ],
    app : [
        stickyComponentsInit,
        applicationConfig

    ]
};

const builder = new Builder(modules, constants);

builder.init(components);