(function(){
    var api = {};

    api.getUserInfo = function(id, callback){
        setTimeout(function(){
            var userInfo = {name:'dexter',profile:['default', 'sales']};
            callback(null, userInfo);
        },3000)
    }

    window.seismicapi = api;
}())