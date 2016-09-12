(function(){
    
    var message = {};
    message.host = "https://c.na35.visual.force.com/";
    message.data = {};
    message.stack = [];

    message.sendToHost(msg, callback){
        var id = (new Date()).getTime()+'';
        var stack = {id:id, callback:callback};
        message.stack.push(stack);
        message.data.msg = msg;
        message.data.id = id;
        send(window.parent, message.data, message.host);
    }

    function send(targetWindow, data, host){
        try{
            targetWindow.postMessage(data, host);
        }catch(e){
             alert("name:" + e.name + "\nmessage:" + e.message)
        }
    }

    function getStack(id){
        for (var i = message.length - 1; i >= 0; i--) {
            if(message[i].id === id){
                return message[i].callback;
            }
        }
    }

    window.message = message;
    window.addEventListener("message", function(e){
        if (e.origin !== message.host) {
              return; 
        }
        
        var id = e.data.id;

        var callback = getStack(id);
        if (Object.toString.call(callback) === "object Function"){
            callback(e.data.msg);
        }
              
    });
}())