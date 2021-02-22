// @ts-nocheck
sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast"
    ],

    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.m.MessageToast} MessageToast
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("ns.SAPUI5.controller.HelloPanel", {

            onInit: function () {
            },

            onShowHello: function () {
                // Leer el texto de i18n.
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                // Leer propiedad del modelo de datos
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMessage = oBundle.getText("helloMessage", [sRecipient]);
                MessageToast.show(sMessage);
            },

            onOpenDialog: function () {   
                //Abrir el Dialogo
                this.getOwnerComponent().openHellowDialog();             
            }
        });
    }
);