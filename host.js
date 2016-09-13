(function() {

    document.getElementById("hostBtn").onclick = function(e) {
        Seismic.callApi('getUserInfo', function(err, info){
            if(err){
                alert("Error : "+err.toString());
                return;
            }

            alert("Success : "+info.toString());
        })
    }

}())