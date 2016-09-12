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
             removeStack(data.id);
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

    window.addEventListener("message", function(e){
        if (e.origin !== message.host) {
              return; 
        }
        
        var id = e.data.id;

        var callback = getStack(id);
        if (Object.prototype.toString.call(callback) === "[object Function]"){
            callback(e.data.msg);
        }
        removeStack(id);
              
    });
<<<<<<< HEAD
    // expose message to window
    window.message = message;
}())
=======
}())
>>>>>>> 6db495f329455758576a9d1e5380d461cf4856cd
