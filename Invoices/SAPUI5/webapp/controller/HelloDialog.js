// @ts-nocheck
sap.ui.define([
        "sap/ui/base/ManagedObject",
        "sap/ui/core/Fragment"
    ],
    /**
     * @param {typeof sap.ui.base.ManagedObject} ManagedObject
     * @param {typeof sap.ui.core.Fragment} Fragment 
     */
    function(ManagedObject, Fragment){
        "use strict"

        return  ManagedObject.extend("ns.SAPUI5.controller.HelloDialog", {
            constructor: function(oView){
                this._oView = oView;
            },
            exit: function() {
                delete this._oView;
            },
            open: function (){
                //Obtener la instancia de la vista actual.
                const oView = this._oView;
                //Validar si ya está instanciado el Dialogo.
                if (oView.byId("helloDialog")){
                    //Abrir el Dialogo.
                    oView.byId("helloDialog").open();
                } else {
                    //Crear el Fragmento Dialogo
                    let oFragmentController = {
                        onCloseDialog: function (){
                            //Cerrar el Dialogo
                            oView.byId("helloDialog").close();
                        }
                    };
                    //Instanciar el Fragmento Dialogo y Abrirlo.
                    Fragment.load({
                        id: oView.getId(),
                        name: "ns.SAPUI5.view.HelloDialog",
                        controller: oFragmentController
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                }
            }
        });
    
});