(function() {

    document.getElementById("hostBtn").onclick = function(e) {
        Seismic.callApi('getUserInfo', function(err, res){
            if(err){
                alert("Error : "+err.toString());
                return;
            }

            console.log(res);
            var resultDom = document.getElementById('result');
            var temp = '<table>';
            temp += '<tr><th>'+res.name+'<th><td>'+res.profile[0]+'</td></tr>';
            temp += '<tr><th>'+res.name+'<th><td>'+res.profile[1]+'</td></tr>';
            temp += '</table>';
            resultDom.innerHTML = temp;
        })
    };

    document.getElementById("errorBtn").onclick = function(e) {
        Seismic.callApi('nonExsitApi', function(err, res){
            if(err){
                alert("Error : "+err.toString());
                return;
            }

            console.log(info);
        })
    };

}())