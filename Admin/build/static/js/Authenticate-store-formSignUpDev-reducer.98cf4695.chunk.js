(this["webpackJsonpwebsite-hitacamp"]=this["webpackJsonpwebsite-hitacamp"]||[]).push([[58],{156:function(c,t,a){"use strict";a.r(t),a.d(t,"types",(function(){return b})),a.d(t,"actions",(function(){return s}));var e=a(3),n=a(268),o=a(346),r=Object(o.a)("formSignUpDev"),b=Object(e.a)({},r.types),s=Object(e.a)({},r.actions),O=Object(e.a)({},r.defaultState);t.default=Object(n.a)(Object(e.a)({},r.handleActions),O)},346:function(c,t,a){"use strict";a.d(t,"a",(function(){return u})),a.d(t,"b",(function(){return i}));var e=a(17),n=a(4),o=a(27),r=a(3),b=a(72),s=a(5),O=a(20),j=a(28),u=(O.c,O.b,function(c){var t,a,n,s,O=c.toUpperCase();return{types:(t={},Object(o.a)(t,"".concat(O,"_METHOD"),"".concat(O,"_METHOD")),Object(o.a)(t,"".concat(O,"_LOADING"),"".concat(O,"_LOADING")),Object(o.a)(t,"".concat(O,"_SUCCESS"),"".concat(O,"_SUCCESS")),Object(o.a)(t,"".concat(O,"_ERROR"),"".concat(O,"_ERROR")),Object(o.a)(t,"".concat(O,"_RESET"),"".concat(O,"_RESET")),t),actions:(a={},Object(o.a)(a,"".concat(c,"FnMethod"),Object(b.a)("".concat(O,"_METHOD"))),Object(o.a)(a,"".concat(c,"FnLoading"),Object(b.a)("".concat(O,"_LOADING"))),Object(o.a)(a,"".concat(c,"FnSuccess"),Object(b.a)("".concat(O,"_SUCCESS"))),Object(o.a)(a,"".concat(c,"FnError"),Object(b.a)("".concat(O,"_ERROR"))),Object(o.a)(a,"".concat(c,"FnReset"),Object(b.a)("".concat(O,"_RESET"))),a),defaultState:(n={},Object(o.a)(n,"".concat(c,"Loading"),!1),Object(o.a)(n,"".concat(c,"Success"),!1),Object(o.a)(n,"".concat(c,"Error"),!1),Object(o.a)(n,"".concat(c,"DataResponse"),null),n),handleActions:(s={},Object(o.a)(s,"".concat(O,"_LOADING"),(function(t,a){var e=a.payload;return Object(r.a)(Object(r.a)({},t),{},Object(o.a)({},"".concat(c,"Loading"),e))})),Object(o.a)(s,"".concat(O,"_SUCCESS"),(function(t,a){var n,b=a.payload;return Object(r.a)(Object(r.a)({},t),{},(n={},Object(o.a)(n,"".concat(c,"Error"),!1),Object(o.a)(n,"".concat(c,"Success"),!0),Object(o.a)(n,"".concat(c,"DataResponse"),Array.isArray(b)?Object(e.a)(b):"object"===typeof b?Object(r.a)({},b):b),n))})),Object(o.a)(s,"".concat(O,"_ERROR"),(function(t,a){var e,n=a.payload;return Object(r.a)(Object(r.a)({},t),{},(e={},Object(o.a)(e,"".concat(c,"Success"),!1),Object(o.a)(e,"".concat(c,"Error"),!0),Object(o.a)(e,"".concat(c,"DataResponse"),"object"===typeof n?Object(r.a)({},n):n),e))})),Object(o.a)(s,"".concat(O,"_RESET"),(function(t,a){var e,n=a.payload;return e={},Object(o.a)(e,"".concat(c,"Loading"),!1),Object(o.a)(e,"".concat(c,"Success"),!1),Object(o.a)(e,"".concat(c,"Error"),!1),Object(o.a)(e,"".concat(c,"DataResponse"),null!==n&&void 0!==n&&n.keepDataResponse?t["".concat(c,"DataResponse")]:null),e})),s)}}),i=function(c,t,a){return Object(o.a)({},"".concat(c,"CallMethod"),(function(e){var o=e.payload;return Object(n.a)().mark((function e(){var r,b,u;return Object(n.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(s.b)(t["".concat(c,"FnLoading")](!0));case 3:return e.next=5,Object(s.c)(j.a);case 5:return r=e.sent,e.next=8,Object(s.a)(a["".concat(c,"CallMethod")],{payload:o,codeLanguage:r});case 8:if(b=e.sent,u=b.data,b.status!==O.e){e.next=20;break}if(u.retCode!==O.d){e.next=16;break}return e.next=14,Object(s.b)(t["".concat(c,"FnSuccess")](u.data));case 14:e.next=18;break;case 16:return e.next=18,Object(s.b)(t["".concat(c,"FnError")]({error:u}));case 18:e.next=22;break;case 20:return e.next=22,Object(s.b)(t["".concat(c,"FnError")]({error:"system_error"}));case 22:e.next=29;break;case 24:return e.prev=24,e.t0=e.catch(0),console.error(e.t0),e.next=29,Object(s.b)(t["".concat(c,"FnError")]({error:"system_error"}));case 29:return e.prev=29,e.next=32,Object(s.b)(t["".concat(c,"FnLoading")](!1));case 32:return e.finish(29);case 33:case"end":return e.stop()}}),e,null,[[0,24,29,33]])}))()}))}}}]);
//# sourceMappingURL=Authenticate-store-formSignUpDev-reducer.98cf4695.chunk.js.map