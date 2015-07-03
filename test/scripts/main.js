
$(document).ready(function(){
	touchEvents={};
	browserRedirect(touchEvents);
	i18n.init({
        "lng": 'ch',
        "resStore": resources,
        "fallbackLng" : 'en'
    }, function (t) {
        $(document).i18n();
        console.log(t("text"));
        console.debug(window.navigator.language);
    });
    $('body').click(init);
    $('#modal').click(function(){
        $.modal.close();
    });
    $("#modal").modal({escapeClose: !1,clickClose: !1,showClose: !1});


});
function init(){
	 console.debug('i am clicked!'+i18n.t('text'));
     //在外部使用多语言的方法
}
function browserRedirect(obj) {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
         
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
         obj.touchstart="touchstart";
            obj.touchmove= "touchmove";
            obj.touchend= "touchend";
         
    } else {
        
                obj.touchstart = "mousedown";
                obj.touchmove = "mousemove";
                obj.touchend = "mouseup";
         
    }
 }
function getUrlParam(e) {
    var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
        n = window.location.search.substr(1).match(t);
    return null != n ? unescape(n[2]) : null
}



