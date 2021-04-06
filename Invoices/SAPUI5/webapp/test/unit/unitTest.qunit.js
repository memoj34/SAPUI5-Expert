// @ts-nocheck
/* eslint-diable no-undef */
/* global QUnit*/
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use sctrct";

    sap.ui.require([
        "ns/SAPUI5/test/unit/AllTest"
    ], function(){
        QUnit.start();
    })
});