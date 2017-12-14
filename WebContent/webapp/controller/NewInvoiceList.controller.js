sap.ui.define([
	"jquery.sap.global",
	"sap/m/TablePersoController",
	'sap/m/MessageBox',
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/demo/wt/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (jQquery,TablePersoController,MessageBox,Export,ExportTypeCSV,Controller, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	var TableController =  Controller.extend("sap.ui.demo.wt.controller.NewInvoiceList", {

		formatter: formatter,

		onInit: function () 
		{
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
			
						},
			onFilterInvoices: function (oEvent) 
			{

				// build filter array
				var aFilter = [];
				var sQuery = oEvent.getParameter("query");
				if (sQuery) {
					aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
				}

				// filter binding
				var oList = this.getView().byId("invoiceList");
				var oBinding = oList.getBinding("items");
				oBinding.filter(aFilter);
				},

			onDataExport:  sap.m.Table.prototype.exportData || function(oEvent){
					var oModel = new JSONModel( [{
						"ProductName": "Pineapple",
						"Quantity": 21,
						"ExtendedPrice": 87.2000,
						"ShippedDate": "2015-04-01T00:00:00",
						"Status": "A",
						"RatingStatus":"Not Related"
					  },
					  {
						"ProductName": "Milk",
						"Quantity": 4,
						"ExtendedPrice": 9.99999,
						"ShippedDate": "2015-02-18T00:00:00",
						"Status": "B",
						"RatingStatus":"Not Related"
					  },
					  {
						"ProductName": "Canned Beans",
						"Quantity": 3,
						"ExtendedPrice": 6.85000,
						"ShippedDate": "2015-03-02T00:00:00",
						"Status": "B",
						"RatingStatus":"Not Related"
					  },
					  {
						"ProductName": "Salad",
						"Quantity": 2,
						"ExtendedPrice": 8.8000,
						"ShippedDate": "2015-04-12T00:00:00",
						"Status": "C",
						"RatingStatus":"Not Related"
					  },
					  {
						"ProductName": "Bread",
						"Quantity": 1,
						"ExtendedPrice": 2.71212,
						"ShippedDate": "2015-01-27T00:00:00",
						"Status": "A",
						"RatingStatus":"Not Related"
					  }
					]
				);
			var oExport = new Export({
			exportType : new ExportTypeCSV({
				separatorChar:";",
					
			}),
			models : oModel,
			rows:{
				path : "/data"
			},
			columns : [{
				name : "{Quantity}",
				template : {
					content :{
						path:"Quantity"
					} 
				}
			},{
				name : "ProductName",
				template : {
					content : {
						path:"ProductName"}
				}
			},{
				name : "Status",
				template : {
					content : {
						path:"Status"
						}
				}
			},{
				name : "Supplier",
				template : {
					content : {
						path:"Supplier"
					}
				}
			},{
				name : "RatingStatus",
				template : {
					content : {path:"RatingStatus"}
				}
			},{
				name : "Price",
				template : {
					content : {path:"ExtendedPrice"}
				}
			}]
		});	
		oExport.saveFile().catch(function(oError) {
			MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
		}).then(function() {
			oExport.destroy();
		});

	},
			onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				invoicePath: oItem.getBindingContext("invoice").getPath().substr(1)
			});
			
		},
		onRatingStatusChange: function(oEvent){
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			oResourceBundle.getText("RatingStatusChange");
		}
			
	});
	return  TableController;
});
