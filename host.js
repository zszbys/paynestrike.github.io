(function() {

    document.getElementById("hostBtn").onclick = function(e) {
        Seismic.callApi('getUserInfo', function(err, info){
            if(err){
                alert("Error : "+err.toString());
                return;
            }

            console.log(info);
            var resultDom = document.getElementById('result');
            var temp = '<table>';
            temp += '<tr><th>'+info.name+'<th><td>'+info.profile[0]+'</td></tr>';
            temp += '<tr><th>'+info.name+'<th><td>'+info.profile[1]+'</td></tr>';
            temp += '</table>';
            resultDom.innerHTML = temp;
        })
    }

}())