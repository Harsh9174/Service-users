sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/sadara/Services/util/formatter"
], function (Controller, formatter) {
	"use strict";

	return Controller.extend("com.sadara.Services.controller.ServicesDetail", {
		formatter: formatter,
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("ServicesDetail").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			var that = this;
			this.oArgs = oEvent.getParameter("arguments").Services;
			var oModel = this.getOwnerComponent().getModel("SproviderModel");
			oModel.read("/SERVICESMASTER(" + this.oArgs + ")", {
				success: function (odata) {
					var oLocalModel = new sap.ui.model.json.JSONModel();
					oLocalModel.setData(odata);
					that.getView().setModel(oLocalModel, "localModel");
				},
				error: function () {

				},
			});
			var filter1 = new sap.ui.model.Filter("SERVICE_ID", sap.ui.model.FilterOperator.EQ, this.oArgs);
			this.getView().byId("serviceprovider").getBinding("items").filter(filter1);
		},
		handleClose: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("Services");
		},
		onSearch: function () {
			if (this.getView().byId("searchprovider").getValue().length > 0) {
				var filter1 = new sap.ui.model.Filter("tolower(SERVICEPROVIDER_NAME)", sap.ui.model.FilterOperator.Contains, "tolower('" + this.getView()
					.byId(
						"searchprovider").getValue() + "')");
				var filter2 = new sap.ui.model.Filter("SERVICE_ID", sap.ui.model.FilterOperator.EQ, this.oArgs);
				var combinedFilter = new sap.ui.model.Filter({
					filters: [filter1, filter2],
					and: true
				});
				this.getView().byId("serviceprovider").getBinding("items").filter(combinedFilter);
			} else {
				var filter1 = new sap.ui.model.Filter("SERVICE_ID", sap.ui.model.FilterOperator.EQ, this.oArgs);
				this.getView().byId("serviceprovider").getBinding("items").filter(filter1);
			}
		}
	});
});