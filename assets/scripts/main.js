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
    app : [
        stickyComponentsInit,
        applicationConfig,
        userComponentsInit,
        separatorComponentsInit,
        apiGenServicesInit,
        authServicesInit,
        validationServicesInit,
        authorServicesInit,
        petServicesInit,
        currentUserServicesInit,
        translatorProviderInit,
        appFiltersInit,
        notifierControllersInit,
        notifierServicesInit,
        notifierComponentsInit,
        lightboxServicesInit,
        lightboxComponentsInit,
        lightboxControllersInit,
        authControllersInit,
        authComponentsInit,
        popupControllersInit,
        popupComponentsInit,
        petControllersInit,
        petComponentsInit,
        authorControllersInit,
        authorComponentsInit,
        translationControllersInit,
        languagesComponentsInit,
        imagesComponentsInit,
        imageUploadControllersInit,
        formComponentsInit,
        formControllersInit,
        headerComponentsInit,
        headerControllersInit,
        parallaxComponentsInit

    ]
};

const builder = new Builder(modules, constants);
builder.init(components);