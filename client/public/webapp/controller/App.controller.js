sap.ui.define([
	"sap/inventorymanager/controller/BaseController"
], function(BaseController, MessageToast) {
	"use strict";

	return BaseController.extend("sap.inventorymanager.controller.App", {
		onPressSideNavigationToggleButton: function (event) {
			//var oSideNavigation = this.getView().byId('sideNavigation');
			//oSideNavigation.setExpanded(!oSideNavigation.getExpanded());
			var toolPage = this.getView().byId("toolPage");
			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		onItemSelect: function(oEvent){
			var item = oEvent.getParameter("item");

			switch(item.getKey()){
        case "information":
          this.getRouter().navTo("information");
          break;
        case "products":
          this.getRouter().navTo("products");
          break;
			}
		}

	});
});