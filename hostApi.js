(function(){
    var api = {};

    api.showErrorMessage(message){
        var errorDom = document.getElementById('error');
        var temp = '<div style="background-color:pink; color:red ">'+message+'</div>';
        errorDom.innerHTML = temp;
    }

    window.HostApi = api;
}())