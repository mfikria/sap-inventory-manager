sap.ui.define([
  "sap/inventorymanager/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], function(BaseController, JSONModel, MessageToast) {
  "use strict";

  return BaseController.extend("sap.inventorymanager.controller.product.Products", {
    onInit: function(){
      var oJSONModel = new JSONModel();
      this.getView().setModel(oJSONModel);
      this._loadProductData();
    },

    onAddProduct: function(oEvent){
      this._getDialog().open();
      this._loadProductData();
    },

    onDeleteProduct: function(oEvent){
      var that = this;

      var oContext = oEvent.getSource().getParent().getBindingContext();

      var id = oContext.getProperty("id");

      $.ajax({
        url: "/api/product/" + id,
        type: "DELETE"
      }).done(function(){
        MessageToast.show(that.getResourceBundle().getText("msgProductDeleted", [id]));
        that._loadProductData();
      }).fail(function(jqXHR, textStatus, error){
        MessageToast.show(that.getResourceBundle().getText("msgError"));
      });
    },

    onCloseAddProductDialog: function(){
      this._getDialog().close();
      this._getDialog().destroy();
      delete this._oDialog;
    },

    onSaveAddProductDialog: function(){
      var that = this;

      var id = sap.ui.getCore().byId("ipID").getValue();
      var name = sap.ui.getCore().byId("ipName").getValue();
      var supplier = sap.ui.getCore().byId("ipSupplier").getValue();
      var price = sap.ui.getCore().byId("ipPrice").getValue();
      var unitsOnOrder = sap.ui.getCore().byId("ipUnitsOnOrder").getValue();
      var unitsInStock = sap.ui.getCore().byId("ipUnitsInStock").getValue();

      if(id === "" || name === "" || supplier === "" || price === "" || unitsOnOrder === "" || unitsInStock === "" ){
        MessageToast.show(that.getResourceBundle().getText("msgPleaseEnterAllValues"));
        return;
      }

      var productData = {
        "id": id,
        "name": name,
        "supplier": supplier,
        "price": price,
        "units_on_order": unitsOnOrder,
        "units_in_stock": unitsInStock,
      };

      $.ajax({
        url: "/api/product/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(productData)
      }).done(function(){
        MessageToast.show(that.getResourceBundle().getText("msgProductAdded", [id]));
        that._loadProductData();
      }).fail(function(jqXHR, textStatus, error){
        MessageToast.show(that.getResourceBundle().getText("msgError"));
      });

      this.onCloseAddProductDialog();
    },

    onRefreshProduct: function(){
      this._loadProductData();
    },

    _loadProductData: function(){
      this.getView().getModel().loadData("/api/product");
    },

    _getDialog : function () {
      if (!this._oDialog) {
        this._oDialog = sap.ui.xmlfragment("sap.inventorymanager.view.product.ProductCreate", this);
        this.getView().addDependent(this._oDialog);
      }
      return this._oDialog;
    }

  });
});