//@ts-nocheck
sap.ui.define([
        "../localService/mockserver",
        "sap/m/MessageBox"
    ],
    /**
    * @param{ typeof sap.m.MessageBox }  MessageBox
    */
    function(mockserver, MessageBox){
        "use strict";

        var aMockServers = [];

        //Initialize the Mock Server
        aMockServers.push(mockserver.init());

        Promise.all(aMockServers).catch( function (oError){
            MessageBox.error(oError.message);
        }).finally( function (){
            sap.ui.require(["sap/ui/core/ComponentSupport"]);
        });
    }
);

