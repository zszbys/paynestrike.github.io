(function(){
    var api = {};

    api.showErrorMessage = function(message){
        var errorDom = document.getElementById('error');
        var temp = '<div style="color:red ">'+message+'</div>';
        errorDom.innerHTML = temp;
        errorDom.style.display = 'block';
    }

    api.confirm = function(message, callback){
        var confirmDailog = document.getElementById('confirm');
        confirmDailog.display = 'block';
        document.getElementById('confirm-cancel').onclick = function(event){
            confirmDailog.display = 'none';
            callback(null, {text:'cancel'})
        }
        document.getElementById('confirm-ok').onclick = function(event){
            confirmDailog.display = 'none';
            callback(null, {text:'confirm'})
        }
    }

    window.HostApi = api;
}())