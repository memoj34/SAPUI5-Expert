//@ts-nocheck
sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/base/Log"
],
    /**
    * @param{ typeof sap.ui.core.util.MockServer } MockServer
    * @param{ typeof sap.ui.model.json.JSONModel } JSONModel
    * @param{ typeof sap.base.util.UriParameters } UriParameters
    * @param{ typeof sap.base.Log } Log
    */
    function (MockServer, JSONModel, UriParameters, Log) {
        "use strict";

        var oMockServer,
            _sAppPath = "ns/SAPUI5/",
            _sJsonFilesPath = _sAppPath + "ns/mockdata";

        var oMockServerInterface = {

            /**
             * Initalizes the mock server asynchronously
             * @param {object} oOptionParameter
             * @returns {Promise} a promise that is resolved when the mock server has been started
             */
            init: function (oOptionParameter) {

                var oOptions = oOptionParameter || {};

                return new Promise(function (fnSolve, fnReject) {

                    var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                        oManifestModel = new JSONModel(sManifestUrl);

                    oManifestModel.attachRequestCompleted(function () {
                        var oUriParameters = new UriParameters(window.location.href);

                        //Parse manifest for local metadata URI
                        var sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath);
                        var oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService");
                        var sMetadataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri);

                        //Ensure there is a trailing slash
                        var sMockServerUrl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(
                            sap.ui.require.toUrl(_sAppPath)).toString();

                        //Create Mock Server Intanse or Stop the existing one to reinitialize.
                        if (!oMockServer) {
                            oMockServer = new MockServer({
                                rootUri: sMockServerUrl
                            });
                        } else {
                            oMockServer.stop();
                        }

                        //Configure Mock Server with the given options or a default delay of 0.5s
                        MockServer.config({
                            autoRespond: true,
                            autoRespondAfter: (oOptions.delay || oUriParameters.get("serverDelay") || 500)
                        });

                        //Simulate All request using mock data
                        oMockServer.simulate(sMetadataUrl, {
                            sMockdataBaseUrl: sJsonFilesUrl,
                            bGenerateMissingMockData: true
                        });

                        var aRequest = oMockServer.getRequests();

                        //Compose an error response for each request
                        var fnResponse = function (iErrCode, sMessage, aRequest) {
                            aRequest.fnResponse = function (oXhr) {
                                oXhr.respond(iErrCode, { "Content-Type": "text/plain;charset=utf-8" }, sMessage);
                            };
                        };

                        //Simulate Metadata Errors
                        if (oOptions.metadataError || oUriParameters.get("metadataError")) {
                            aRequest.forEach(function (aEntry) {
                                if (aEntry.path.toString().indexof("$metadata") > -1) {
                                    fnResponse(500, "metadata Error", aEntry);
                                };
                            });
                        };

                        //Simualte Request Errors
                        var sErrorParam = oOptions.errorType || oUriParameters.get("errorType");
                        var iErrorCode = sErrorParam === "badRequest" ? 400 : 500;

                        if (sErrorParam) {
                            aRequest.forEach(function (aEntry) {
                                fnResponse(iErrorCode, sErrorParam, aEntry);
                            });
                        };

                        //Set request and Start the Server
                        oMockServer.setRequests(aRequest);
                        oMockServer.start();

                        Log.info("Running de App with mock data");
                        fnSolve();
                    });

                    oManifestModel.attachRequestFailed(function () {
                        var sError = "Failed to load the application manifest";

                        Log.error(sError);
                        fnReject(new Error(sError));
                    });
                });
            }
        };

        return oMockServerInterface;

    }
);