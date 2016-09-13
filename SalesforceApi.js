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
        confirmDailog.style.display = 'block';
        document.getElementById('confirm-cancel').onclick = function(event){
            confirmDailog.style.display = 'none';
            callback(null, {text:'cancel'})
        }
        document.getElementById('confirm-ok').onclick = function(event){
            confirmDailog.style.display = 'none';
            callback(null, {text:'confirm'})
        }
    }

    window.HostApi = api;
}())