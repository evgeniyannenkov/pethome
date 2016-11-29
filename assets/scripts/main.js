"use strict";

class Builder {
    constructor ( modules, common = {} ) {
        this.modules = modules;
        this.common = common;
    }

    initComponents ( module, components ) {
        for ( let index = 0; index < components.length; index++ ) {
            components[ index ](this.modules[ module ], this.common);
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

const common = {
    templatesFolder : "/assets/templates",
    getTemplatePath : function ( filename ) {
        return `${this.templatesFolder}/${filename}.html`;
    }
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
        parallaxComponentsInit,
        heroComponentsInit,
        commonComponentsInit
    ]
};

const builder = new Builder(modules, common);
builder.init(components);