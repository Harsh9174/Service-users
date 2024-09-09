sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/sadara/Services/util/formatter"
], function (Controller, formatter) {
	"use strict";

	return Controller.extend("com.sadara.Services.controller.Services", {
		formatter: formatter,
		onInit: function () {

		},
		
		onListItemPress: function (oEvent) {
			var ServicesPath = oEvent.getSource().getSelectedItem().getBindingContext("SproviderModel").getObject().SERVICE_ID;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("ServicesDetail", {
				Services: ServicesPath
			});
		},
		
		onServiceProvider: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("ServiceProvider");
		},
		
		onSearch: function () {
    	this.onGoPress();
		},
		onGoPress: function () {
			var oTable = this.getView().byId("productsTable");
			var servicename = this.getView().byId("searchservices").getValue();
			var view = this.getView();
			var deletionFlagInput = view.byId("mydeleteditems").getSelectedKey();
			var selectedItem = view.byId("mydeleteditems").getSelectedItem();
			var filters = [];
			var deletionFlagInputText = "";

			if (selectedItem) {
				deletionFlagInputText = selectedItem.getText() || "";
			}
			if (servicename.length > 0) {
				var filter1 = new sap.ui.model.Filter("tolower(SERVICE_NAME)", sap.ui.model.FilterOperator.Contains, "tolower('" + this.getView()
					.byId("searchservices").getValue() + "')");
				filters.push(filter1);
			}

			// Create filter for DELETIONFLAG if the input is provided
			if (deletionFlagInputText == "Deleted") {
				var filter2 = new sap.ui.model.Filter("DELETIONFLAG", sap.ui.model.FilterOperator.Contains, deletionFlagInput);
				filters.push(filter2);
			} else if (deletionFlagInputText == "Non-Deleted") {
				// If DELETIONFLAG input is not provided, add a default filter
				var filter3 = new sap.ui.model.Filter("DELETIONFLAG", sap.ui.model.FilterOperator.NE, "X");
				filters.push(filter3);
			}

			// Apply the filters to the table binding
			var tableBinding = view.byId("productsTable").getBinding("items");

			if (servicename.length === 0 && deletionFlagInputText === "") {
				// If both inputs are empty, apply an empty filter (remove any existing filters)
				tableBinding.filter([]);
			} else {
				// Apply the combined filters
				tableBinding.filter(filters.length > 0 ? new sap.ui.model.Filter(filters, true) : []);
			}
		}
	});
});