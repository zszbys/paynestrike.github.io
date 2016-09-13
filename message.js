(function(){
    var message = {};
    message.host = "https://c.na35.visual.force.com";
    message.data = {};
    message.stack = [];

    message.sendToHost = function(msg, callback){
        if(!msg.id){
            var id = (new Date()).getTime()+'';
            var stack = {id:id, callback:callback};
            message.stack.push(stack); 
            var data = {msg:msg, id:id};
        }else{
            var data = msg;
        }
        
        send(window.parent, stringifyJSON(data), message.host);
    }

    function stringifyJSON(obj){
        return JSON>stringify(obj);
    }

    function postToHost(msg, callback){
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

        stack.splice(i,1);
    }

    function runCallback(err, data){
        var id = data.id;
        var callback = getStack(id);
        if (Object.prototype.toString.call(callback) === "[object Function]"){
            callback(err, data.msg);
            removeStack(id);
        }
    }

    function callApi(option){
        var data = option.data;
        var api = data.api;
        var apiArg = data.args;
        var id = data.id;

        if (!seismicapi[api]) {
            postToHost("unknown api");
            return;
        }

        seismicapi[api](function(err, res){
            var response = err || res;
            response.id = id;
            postToHost(data);
        });
    }

    // if event id exsit in stack
    function isSender(id){
        for (var i = message.stack.length - 1; i >= 0; i--) {
            if(message.stack[i].id === id){
                return true;
            }
        }
        return false;
    }

    function parseJSONString(jstr){
        return JSON.parse(jstr);
    }

    // must handle two situation
    // 1 get host api call response
    // 2 send app api call response
    window.addEventListener("message", function(e){
        if (e.origin !== message.host) {
              return; 
        }
        
        var data = parseJSONString(e.data);
        var eventId = data.id;
        if(!isSender(eventId)){
            // call api and post back result
            callApi(data);
        }else{
            runCallback(null, data);
        }
              
    });
    // expose message to window
    window.message = message;
}())
