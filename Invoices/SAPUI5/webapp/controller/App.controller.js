// @ts-nocheck
sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast"
    ],

    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.m.MessageToast} MessageToast
     * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel  
     */
    function (Controller, MessageToast, Models, ResourceModel) {
        "use strict";
        
        return Controller.extend("ns.SAPUI5.controller.App", {

            onInit: function () {
            },

            onShowHello: function () {
                // Leer el texto de i18n.
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                // Leer propiedad del modelo de datos
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMessage = oBundle.getText("helloMessage", [sRecipient]);
                MessageToast.show(sMessage);
            }
        });
    }
);