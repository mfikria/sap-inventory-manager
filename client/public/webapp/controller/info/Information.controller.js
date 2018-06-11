sap.ui.define([
	"sap/inventorymanager/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("sap.inventorymanager.controller.info.Information", {
		onInit: function(){
      var oJSONModel = new JSONModel();
      this.getView().setModel(oJSONModel);
      this._generateBarChartData();
    },

		_generateBarChartData: function () {

      var oJSONModel = this.getView().getModel();

      oJSONModel.loadData("/api/product");

      oJSONModel.attachRequestCompleted(function(){

        var jsonData = oJSONModel.getData();

        var labels = new Array();
        var data = new Array();

        var i;
        for (i = 0; i < jsonData.length; i++) {
          labels[i] = jsonData[i].name;
          data[i] = jsonData[i].units_on_order;
        }

        oJSONModel.setData({
          barChart: {
          	labels: labels,
            datasets: [
              {
              	label: 'Units Ordered',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                data: data,
              }
            ]
					}
        }, true)

        this.byId("bar_chart").destroyChart();

        this.byId("bar_chart").onAfterRendering();

      }.bind(this));
    }
	});
});