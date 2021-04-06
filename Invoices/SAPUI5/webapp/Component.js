// @ts-nocheck
sap.ui.define([
    "sap/ui/core/UIComponent",
    "ns/SAPUI5/model/Models",
    "sap/ui/model/resource/ResourceModel",
    "./controller/HelloDialog"
],
    /**
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
     */
    function (UIComponent, Models, ResourceModel, HelloDialog) {

        return UIComponent.extend("ns.SAPUI5.Component", {
            matadata: {
                manifest: "json"
            },
            init: function () {
                //Call init function of the parent
                UIComponent.prototype.init.apply(this, arguments);
                //Set data model on the view. Without alias
                this.setModel(Models.createRecipient());
                //Set i18n model on the view
                var i18nModel = new ResourceModel({ bundleName: "ns.SAPUI5.i18n.i18n" });
                this.setModel(i18nModel, "i18n");
                //Instancia del objeto HelloDialog
                this._helloDialog = new HelloDialog(this.getRootControl());
            },
            exit: function() {
                this._helloDialog.destroy();
                delete this._helloDialog;
            },
            openHelloDialog: function() {
                this._helloDialog.open();
            } 
        });
    });