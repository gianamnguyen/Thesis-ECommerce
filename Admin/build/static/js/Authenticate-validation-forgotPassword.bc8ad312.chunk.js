(this["webpackJsonpwebsite-hitacamp"]=this["webpackJsonpwebsite-hitacamp"]||[]).push([[71],{188:function(e,r,t){"use strict";t.r(r),t.d(r,"getValueForm",(function(){return o})),t.d(r,"validationSchema",(function(){return u}));var n=t(3),i=t(457),a=t(409),o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(n.a)({username:"",number_phone_or_email:""},e)},u=function(e,r){return i.a().shape({username:i.c().nullable().required(Object(a.b)(e.t("validation:required"),e.t("FormForgotPassword:field:user_name"))),number_phone_or_email:r?i.c().nullable().required(Object(a.b)(e.t("validation:required"),e.t("FormForgotPassword:field:number_phone"))).matches(a.c,Object(a.b)(e.t("validation:regex"),e.t("FormForgotPassword:field:number_phone"))):i.c().nullable().required(Object(a.b)(e.t("validation:required"),e.t("FormForgotPassword:field:email"))).matches(a.a,Object(a.b)(e.t("validation:regex"),e.t("FormForgotPassword:field:email")))})}},409:function(e,r,t){"use strict";t.d(r,"b",(function(){return n})),t.d(r,"a",(function(){return i})),t.d(r,"c",(function(){return a}));t(3);var n=function(e,r){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=e;for(var i in n=n.replace(/{_field_}/gi,r),t){var a=t[i];n=n.replace(new RegExp(i,"gi"),a)}return n},i=/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,a=/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/}}]);
//# sourceMappingURL=Authenticate-validation-forgotPassword.bc8ad312.chunk.js.map