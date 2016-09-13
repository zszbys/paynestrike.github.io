(function() {

    document.getElementById("hostBtn").onclick = function(e) {
        message.sendToChild({}, function(err, res){
            if (err) {
                alert("Error : " + err.toString());
                return
            }

            alert("Success : " + res.toString());
        })
    }

}())