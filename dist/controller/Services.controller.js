sap.ui.define(["sap/ui/core/mvc/Controller","com/sadara/Services/util/formatter"],function(e,t){"use strict";return e.extend("com.sadara.Services.controller.Services",{formatter:t,onInit:function(){},onListItemPress:function(e){var t=e.getSource().getSelectedItem().getBindingContext("SproviderModel").getObject().SERVICE_ID;var r=sap.ui.core.UIComponent.getRouterFor(this);r.navTo("ServicesDetail",{Services:t})},onServiceProvider:function(){var e=this.getOwnerComponent().getRouter();e.navTo("ServiceProvider")},onSearch:function(){this.onGoPress()},onGoPress:function(){var e=this.getView().byId("productsTable");var t=this.getView().byId("searchservices").getValue();var r=this.getView();var i=r.byId("mydeleteditems").getSelectedKey();var o=r.byId("mydeleteditems").getSelectedItem();var s=[];var n="";if(o){n=o.getText()||""}if(t.length>0){var a=new sap.ui.model.Filter("tolower(SERVICE_NAME)",sap.ui.model.FilterOperator.Contains,"tolower('"+this.getView().byId("searchservices").getValue()+"')");s.push(a)}if(n=="Deleted"){var l=new sap.ui.model.Filter("DELETIONFLAG",sap.ui.model.FilterOperator.Contains,i);s.push(l)}else if(n=="Non-Deleted"){var d=new sap.ui.model.Filter("DELETIONFLAG",sap.ui.model.FilterOperator.NE,"X");s.push(d)}var c=r.byId("productsTable").getBinding("items");if(t.length===0&&n===""){c.filter([])}else{c.filter(s.length>0?new sap.ui.model.Filter(s,true):[])}}})});