(this["webpackJsonpwebsite-hitacamp"]=this["webpackJsonpwebsite-hitacamp"]||[]).push([[46],{150:function(c,t,a){"use strict";a.r(t),a.d(t,"types",(function(){return i})),a.d(t,"actions",(function(){return p}));var e=a(17),n=a(27),o=a(3),r=a(72),b=a(268),O=a(346),s="formForgotUsername",j=s.toUpperCase(),u=Object(O.a)(s),i=Object(o.a)(Object(o.a)({},u.types),{},Object(n.a)({},"".concat(j,"_UPDATE"),"".concat(j,"_UPDATE"))),p=Object(o.a)(Object(o.a)({},u.actions),{},Object(n.a)({},"".concat(s,"FnUpdate"),Object(r.a)("".concat(j,"_UPDATE")))),d=Object(o.a)({},u.defaultState);t.default=Object(b.a)(Object(o.a)(Object(o.a)({},u.handleActions),{},Object(n.a)({},"".concat(j,"_UPDATE"),(function(c,t){var a,r=t.payload;return a={},Object(n.a)(a,"".concat(s,"Loading"),!1),Object(n.a)(a,"".concat(s,"Success"),!1),Object(n.a)(a,"".concat(s,"Error"),!1),Object(n.a)(a,"".concat(s,"DataResponse"),Array.isArray(r)?Object(e.a)(r):"object"===typeof r?Object(o.a)({},r):r),a}))),d)},346:function(c,t,a){"use strict";a.d(t,"a",(function(){return u})),a.d(t,"b",(function(){return i}));var e=a(17),n=a(4),o=a(27),r=a(3),b=a(72),O=a(5),s=a(20),j=a(28),u=(s.c,s.b,function(c){var t,a,n,O,s=c.toUpperCase();return{types:(t={},Object(o.a)(t,"".concat(s,"_METHOD"),"".concat(s,"_METHOD")),Object(o.a)(t,"".concat(s,"_LOADING"),"".concat(s,"_LOADING")),Object(o.a)(t,"".concat(s,"_SUCCESS"),"".concat(s,"_SUCCESS")),Object(o.a)(t,"".concat(s,"_ERROR"),"".concat(s,"_ERROR")),Object(o.a)(t,"".concat(s,"_RESET"),"".concat(s,"_RESET")),t),actions:(a={},Object(o.a)(a,"".concat(c,"FnMethod"),Object(b.a)("".concat(s,"_METHOD"))),Object(o.a)(a,"".concat(c,"FnLoading"),Object(b.a)("".concat(s,"_LOADING"))),Object(o.a)(a,"".concat(c,"FnSuccess"),Object(b.a)("".concat(s,"_SUCCESS"))),Object(o.a)(a,"".concat(c,"FnError"),Object(b.a)("".concat(s,"_ERROR"))),Object(o.a)(a,"".concat(c,"FnReset"),Object(b.a)("".concat(s,"_RESET"))),a),defaultState:(n={},Object(o.a)(n,"".concat(c,"Loading"),!1),Object(o.a)(n,"".concat(c,"Success"),!1),Object(o.a)(n,"".concat(c,"Error"),!1),Object(o.a)(n,"".concat(c,"DataResponse"),null),n),handleActions:(O={},Object(o.a)(O,"".concat(s,"_LOADING"),(function(t,a){var e=a.payload;return Object(r.a)(Object(r.a)({},t),{},Object(o.a)({},"".concat(c,"Loading"),e))})),Object(o.a)(O,"".concat(s,"_SUCCESS"),(function(t,a){var n,b=a.payload;return Object(r.a)(Object(r.a)({},t),{},(n={},Object(o.a)(n,"".concat(c,"Error"),!1),Object(o.a)(n,"".concat(c,"Success"),!0),Object(o.a)(n,"".concat(c,"DataResponse"),Array.isArray(b)?Object(e.a)(b):"object"===typeof b?Object(r.a)({},b):b),n))})),Object(o.a)(O,"".concat(s,"_ERROR"),(function(t,a){var e,n=a.payload;return Object(r.a)(Object(r.a)({},t),{},(e={},Object(o.a)(e,"".concat(c,"Success"),!1),Object(o.a)(e,"".concat(c,"Error"),!0),Object(o.a)(e,"".concat(c,"DataResponse"),"object"===typeof n?Object(r.a)({},n):n),e))})),Object(o.a)(O,"".concat(s,"_RESET"),(function(t,a){var e,n=a.payload;return e={},Object(o.a)(e,"".concat(c,"Loading"),!1),Object(o.a)(e,"".concat(c,"Success"),!1),Object(o.a)(e,"".concat(c,"Error"),!1),Object(o.a)(e,"".concat(c,"DataResponse"),null!==n&&void 0!==n&&n.keepDataResponse?t["".concat(c,"DataResponse")]:null),e})),O)}}),i=function(c,t,a){return Object(o.a)({},"".concat(c,"CallMethod"),(function(e){var o=e.payload;return Object(n.a)().mark((function e(){var r,b,u;return Object(n.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(O.b)(t["".concat(c,"FnLoading")](!0));case 3:return e.next=5,Object(O.c)(j.a);case 5:return r=e.sent,e.next=8,Object(O.a)(a["".concat(c,"CallMethod")],{payload:o,codeLanguage:r});case 8:if(b=e.sent,u=b.data,b.status!==s.e){e.next=20;break}if(u.retCode!==s.d){e.next=16;break}return e.next=14,Object(O.b)(t["".concat(c,"FnSuccess")](u.data));case 14:e.next=18;break;case 16:return e.next=18,Object(O.b)(t["".concat(c,"FnError")]({error:u}));case 18:e.next=22;break;case 20:return e.next=22,Object(O.b)(t["".concat(c,"FnError")]({error:"system_error"}));case 22:e.next=29;break;case 24:return e.prev=24,e.t0=e.catch(0),console.error(e.t0),e.next=29,Object(O.b)(t["".concat(c,"FnError")]({error:"system_error"}));case 29:return e.prev=29,e.next=32,Object(O.b)(t["".concat(c,"FnLoading")](!1));case 32:return e.finish(29);case 33:case"end":return e.stop()}}),e,null,[[0,24,29,33]])}))()}))}}}]);
//# sourceMappingURL=Authenticate-store-formForgotUsername-reducer.6e5dee6b.chunk.js.map