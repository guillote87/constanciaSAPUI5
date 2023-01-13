sap.ui.define(
    ["./BaseController",
        "sap/ui/model/json/JSONModel",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        'sap/m/MessageToast',],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator, MessageToast) {
        "use strict";
      
        var info = [{
            "Contribuyente": 20302368210,
            "RazonSocial": "GUILLERMO ALEJANDRO QUATTROCCHI",
            "CodPostal": 1828,
            "Localidad": "REMEDIOS DE ESCALADA",
            "Provincia": 1,
            "TipoPersona": "FISICA",
            "TipoIdentFiscal": 80,
            "ClaseImp": 6,
            "CodProvincia": 2
        }, {
            "Contribuyente": 27352666748,
            "RazonSocial": "JESICA MARIANA COMAS",
            "CodPostal": 1833,
            "Localidad": "MATADEROS",
            "Provincia": 1,
            "TipoPersona": "FISICA",
            "TipoIdentFiscal": 80,
            "ClaseImp": 6,
            "CodProvincia": 2
        }]
      
        return Controller.extend("legacy.constancia.controller.MainView", {
      
            onInit: function () {
                this.getOwnerComponent().setModel(new JSONModel({}), "data")
               
            },
            onSearch: function () {
                var oView = this.getView();
                oView.byId("list").setBusy(true)

                var data = [];
                
                var Contribuyente = oView.byId("cuit").getValue();
               
                for (var i = 0; i < info.length; i++) {
                    if (info[i].Contribuyente == Contribuyente) {
                        data.push(info[i]);
                        break;
                    } else {
                        MessageToast.show("No Existe contribuyente con ese numero")
                    }
                }
                oView.byId("list").setBusy(false)
                oView.getModel("data").setData(data)
            },
            onSearch2: function () {
                //Validate required fields	          
                var oView = this.getView();
                oView.setModel(new JSONModel({}), "data")
               
                var oModel = oView.getModel()
                var oDataFilter = new Array()
                oView.byId("list").setBusy(true)


                oDataFilter.push(
                    new Filter("Contribuyente", FilterOperator.EQ, oView.byId("cuit").getValue()),
                )


                let queryFilter = new Array(
                    new Filter({ filters: oDataFilter, and: true })
                )

                oModel.read("/datosConstanciaSet", {
                    filters: queryFilter,
                    success: function (data) {

                        oView.getModel("data").setData(data.results)
                        console.log(data.results)
                        oView.byId("panel").bindElement("data/0")
                    oView.byId("list").setBusy(false)
                    },
                    error: function () {
                        MessageToast.show("No Existe contribuyente con ese numero")
                        oView.byId("list").setBusy(false)
                    }
                }

                )
            },

        });
    }
);
