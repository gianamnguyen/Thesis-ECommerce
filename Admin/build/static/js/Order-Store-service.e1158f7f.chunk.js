(this["webpackJsonpwebsite-hitacamp"]=this["webpackJsonpwebsite-hitacamp"]||[]).push([[91,92],{133:function(e,t,r){"use strict";r.r(t),t.default={GET_LIST_ORDER:"/order/get-list-order",GET_DETAIL_ORDER:"/order/get-detail-order",DELETE_DETAIL_ORDER:"/order/delete-detail-order",UPDATE_DETAIL_ORDER:"/order/update-detail-order"}},135:function(e,t,r){"use strict";r.r(t),r.d(t,"getListOrders",(function(){return o})),r.d(t,"getDetailOrder",(function(){return c})),r.d(t,"deleteDetailOrder",(function(){return E})),r.d(t,"updateDetailOrder",(function(){return O}));var n=r(3),a=r(332),d=r(133),u=r(10),i=["idOrder"],o=function(e){return u.a.post(d.default.GET_LIST_ORDER,e)},c=function(e){var t=(e||{}).idOrder;return u.a.get(d.default.GET_DETAIL_ORDER+"/".concat(t))},E=function(e){var t=(e||{}).idOrder;return u.a.delete(d.default.DELETE_DETAIL_ORDER+"/".concat(t))},O=function(e){var t=e||{},r=t.idOrder,o=Object(a.a)(t,i);return u.a.put(d.default.UPDATE_DETAIL_ORDER+"/".concat(r),Object(n.a)({},o))}},332:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var n=r(24);function a(e,t){if(null==e)return{};var r,a,d=Object(n.a)(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(a=0;a<u.length;a++)r=u[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(d[r]=e[r])}return d}}}]);
//# sourceMappingURL=Order-Store-service.e1158f7f.chunk.js.map