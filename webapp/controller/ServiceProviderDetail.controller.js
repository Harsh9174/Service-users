sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/sadara/Services/util/formatter"
], function (Controller, formatter) {
	"use strict";

	return Controller.extend("com.sadara.Services.controller.ServiceProviderDetail", {
		formatter: formatter,
		
		onInit: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("ServiceProviderDetail").attachMatched(this._onRouteMatched, this);

		},
		
		_onRouteMatched: function (oEvent) {
			var that = this;
			this.oArgs = oEvent.getParameter("arguments").ProviderId;
			var oModel = this.getOwnerComponent().getModel("SproviderModel");
			oModel.read("/SERVICEPROVIDERMASTER(" + this.oArgs + ")", {
				success: function (odata) {
					var oLocalModel = new sap.ui.model.json.JSONModel();
					oLocalModel.setData(odata);
					that.getView().setModel(oLocalModel, "localModel");
				},
				error: function () {

				},
			});
			var filter1 = new sap.ui.model.Filter("SERVICEPROVIDER_ID", sap.ui.model.FilterOperator.EQ, this.oArgs);
			this.getView().byId("serviceproviderdetail").getBinding("items").filter(filter1);
		},
		
		handleClose: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("ServiceProvider");
		},
		
		onSearch: function () {
			if (this.getView().byId("searchservice").getValue().length > 0) {
				var filter1 = new sap.ui.model.Filter("tolower(SERVICE_NAME)", sap.ui.model.FilterOperator.Contains, "tolower('" + this.getView().byId(
					"searchservice").getValue() + "')");
				var filter2 = new sap.ui.model.Filter("SERVICEPROVIDER_ID", sap.ui.model.FilterOperator.EQ, this.oArgs);
				var combinedFilter = new sap.ui.model.Filter({
					filters: [filter1, filter2],
					and: true
				});
				this.getView().byId("serviceproviderdetail").getBinding("items").filter(combinedFilter);
			} else {
				var filter1 = new sap.ui.model.Filter("SERVICEPROVIDER_ID", sap.ui.model.FilterOperator.EQ, this.oArgs);
				this.getView().byId("serviceproviderdetail").getBinding("items").filter(filter1);
			}
		}
	});
});