sap.ui.define(
    ["./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    'sap/m/MessageToast',],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel,Filter,FilterOperator,MessageToast) {
        "use strict";

        return Controller.extend("legacy.constancia.controller.MainView", {
            onInit: function () {
                this.getOwnerComponent().setModel(new JSONModel({}), "data")
            },
            onSearch: function () {
                var oView = this.getView();
                var Contribuyente = oView.byId("cuit").getValue();
                var data =[{
                    "Contribuyente": 20302368210,
                    "RazonSocial": "Quattrocchi Guillermo",
                    "Calle": "San Lorenzo 3859",
                    "CodPostal": 1828,
                    "Localidad" : "Remedios de Escalada",
                    "Provincia":"Buenos Aires",
                    "TipoPersona":"FISICA",
                    "TipoIdentFiscal":80,
                    "ClaseImp":6,
                                 "CodProvincia":2
                },{
                    "Contribuyente": 27352666748,
                    "RazonSocial": "Jesica Comas",
                    "Calle": "Miralla 1473",
                    "CodPostal": 1828,
                    "Localidad" : "Mataderos",
                    "Provincia":"Buenos Aires",
                    "TipoPersona":"FISICA",
                    "TipoIdentFiscal":80,
                    "ClaseImp":6,
                    "CodProvincia":2
                } ]
                var reqObj = [];
                for (var i = 0; i < data.length; i++) {
                  if (data[i].Contribuyente == Contribuyente) {
                     reqObj.push(data[i]);
                     break;
                  }
                }
                oView.byId("panel").setModel(new JSONModel(reqObj));
                oView.byId("panel").bindElement("/0")
              
            },
            onSearch2: function () {
                //Validate required fields	          
console.log("ingrese")
this.oView.setModel(new JSONModel({}), "data")
               var that = this
               var oModel = that.oView.getModel()
               var oDataFilter = new Array()
               that.getView().byId("list").setBusy(true)


                oDataFilter.push(
                    new Filter("Contribuyente", FilterOperator.EQ, this.getView().byId("cuit").getValue()),
                )


                let queryFilter = new Array(
                    new Filter({filters: oDataFilter, and: true})
                )
              
                oModel.read("/datosConstanciaSet", {
                    filters: queryFilter,
                    success: function (data) {                      
                            
                            that.getView().getModel("data").setData(data.results)
                            console.log(data.results)
                            that.oView.byId("panel").bindElement("data/0")
                            that.getView().byId("list").setBusy(false)
                    },
                    error: function () {
                        MessageToast.show("No Existe contribuyente con ese numero")
                        that.getView().byId("list").setBusy(false)
                    }
                }    
                
                )
            },
            
        });
    }
);
