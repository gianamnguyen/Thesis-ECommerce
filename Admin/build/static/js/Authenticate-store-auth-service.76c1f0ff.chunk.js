(this["webpackJsonpwebsite-hitacamp"]=this["webpackJsonpwebsite-hitacamp"]||[]).push([[33,24],{126:function(e,o,T){"use strict";T.r(o),o.default={POST_AUTH_SIGN_IN:"/SieuTriNhoHocDuong/login",POST_SEND_OTP:"/SieuTriNhoHocDuong/SendOTP",POST_SIGN_UP_TRIAL_ACCOUNT:"/SieuTriNhoHocDuong/Register",POST_SIGN_UP_TRIAL_ACCOUNT_OTP:"/SieuTriNhoHocDuong/RegisterWithOTP",POST_UPDATE_TO_TRIAL_ACCOUNT:"/SieuTriNhoHocDuong/UpdateUserExperience",GET_TRIAL_ACCOUNT_INFO:"/SieuTriNhoHocDuong/GetUserExperience",POST_ACTIVE_CODE:"/SieuTriNhoHocDuong/ActiveCode",POST_CHECK_ACTIVE_CODE:"/SieuTriNhoHocDuong/CheckCode",GET_VIDEO_TUTORIAL_ACTIVE_CODE:"/SieuTriNhoHocDuong/ActiveCodeTutorial",POST_AUTH_FORGOT_USERNAME:"/AccountHelper/ForgetUsername",POST_AUTH_FORGOT_PASSWORD:"/AccountHelper/ForgetPassword",POST_AUTH_VERIFY_ACCOUNT:"/AccountHelper/OTPConfirmAccount",POST_AUTH_VERIFY_PASSWORD:"/AccountHelper/OTPConfirmPassword",POST_AUTH_VERIFY_ACCOUNT_EMAIL:"/AccountHelperEmail/OTPConfirmAccount",POST_AUTH_VERIFY_PASSWORD_EMAIL:"/AccountHelperEmail/OTPConfirmPassword",POST_AUTH_FORGOT_USERNAME_EMAIL:"/AccountHelperEmail/ForgetUsername",POST_AUTH_FORGOT_PASSWORD_EMAIL:"/AccountHelperEmail/ForgetPassword",LOG_OUT:"",SIGN_IN_ACCOUNT:"/auth/signin"}},143:function(e,o,T){"use strict";T.r(o),T.d(o,"signIn",(function(){return u})),T.d(o,"sendOtp",(function(){return c})),T.d(o,"signInDev",(function(){return a})),T.d(o,"sendOtpDev",(function(){return i}));var n=T(3),_=T(126),t=T(10),r=T(48),O=T(20),u=function(e){var o=e.codeLanguage,T=e.payload;return t.a.post(o+_.default.POST_AUTH_SIGN_IN,Object(n.a)(Object(n.a)({},T),{},{appID:O.a}))},c=function(e){var o=e.codeLanguage,T=e.payload;return t.a.post(o+_.default.POST_SEND_OTP,{phoneNumber:T})},a=function(e){var o=e.codeLanguage,T=e.payload;return r.a.post(o+_.default.POST_AUTH_SIGN_IN,Object(n.a)(Object(n.a)({},T),{},{appID:O.a}))},i=function(e){var o=e.codeLanguage,T=e.payload;return r.a.post(o+_.default.POST_SEND_OTP,{phoneNumber:T})}}}]);
//# sourceMappingURL=Authenticate-store-auth-service.76c1f0ff.chunk.js.map