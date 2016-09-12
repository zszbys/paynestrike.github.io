(function(){
    var message = {};
    message.host = "https://c.na35.visual.force.com";
    message.data = {};
    message.stack = [];

    message.sendToHost = function(msg, callback){
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
            runCallback(e, data);
            alert("Erroe : " + e.name + "\nmessage : " + e.message);
        }
    }

    function getStack(id){
        for (var i = message.stack.length - 1; i >= 0; i--) {
            if(message.stack[i].id === id){
                return message.stack[i].callback;
            }
        }
    }

    function removeStack(id){
        var stackIndex = null;
        var stack = message.stack;
        var len = stack.length;
        for (var i = len - 1; i >= 0; i--) {
            if(stack[i].id === id){
                stackIndex = i;
                break;
            }
        }

        stack.splic(i,1);
    }

    function runCallback(err, data){
        var id = data.id;
        var callback = getStack(id);
        if (Object.prototype.toString.call(callback) === "[object Function]"){
            callback(err, data.msg);
            removeStack(id);
        }
    }

    window.addEventListener("message", function(e){
        if (e.origin !== message.host) {
              return; 
        }
        
        runCallback(null, e.data);
              
    });
    // expose message to window
    window.message = message;
}())
