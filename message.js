(function() {
    var message = {};
    message.host = "https://c.na35.visual.force.com";
    message.stack = [];

    function stringifyJSON(obj) {
        // TO DO 
        // Json stringify browser support
        return JSON.stringify(obj);
    }

    function parseJSON(jstr) {
        return JSON.parse(jstr);
    }

    function isString(str) {
        return Object.prototype.toString.call(str) === "[object String]";
    }

    function isFunc(func) {
        return Object.prototype.toString.call(func) === "[object Function]";
    }

    function isObject(obj) {
        return Object.prototype.toString.call(obj) === "[object Otring]";
    }

    function postToHost(msg, callback) {
        if (!msg.id) {
            var id = (new Date()).getTime() + '';
            var stack = {
                id: id,
                callback: callback
            };
            message.stack.push(stack);
            var data = {
                msg: msg,
                id: id
            };
        } else {
            var data = msg;
        }

        _postToHost(stringifyJSON(data), message.host);
    }

    function _postToHost(data, host) {
        try {
            window.parent.postMessage(data, host);
        } catch (e) {
            runCallback(e, data);
            alert("Erroe : " + e.name + "\nmessage : " + e.message);
        }
    }

    function getStackCallback(id) {
        for (var i = message.stack.length - 1; i >= 0; i--) {
            if (message.stack[i].id === id) {
                return message.stack[i].callback;
            }
        }
    }

    function removeStack(id) {
        var stackIndex = null;
        var stack = message.stack;
        var len = stack.length;
        for (var i = len - 1; i >= 0; i--) {
            if (stack[i].id === id) {
                stackIndex = i;
                break;
            }
        }

        stack.splice(i, 1);
    }

    function runCallback(err, data) {
        var id = data.id;
        var callback = getStackCallback(id);
        if (Object.prototype.toString.call(callback) === "[object Function]") {
            callback(err, data.msg);
            removeStack(id);
        }
    }

    function _callApi(option) {
        // option = {
        //     data:{
        //         api:""
        //         args:{}
        //     },
        //     id:""
        // }
        var data = option.data;
        var id = option.id;
        var api = data.api;
        var apiArg = data.args;

        var response = {
            error: null,
            res: null,
            id: id
        };

        if (!seismicapi[api]) {
            response.error = {
                message: "unknown api"
            }
            postToHost(response);
            return;
        }

        seismicapi[api](apiArg, function(err, res) {
            response.error = err;
            response.res = res;
            postToHost(response);
        });
    }

    // if event id exsit in stack
    function isSender(id) {
        for (var i = message.stack.length - 1; i >= 0; i--) {
            if (message.stack[i].id === id) {
                return true;
            }
        }
        return false;
    }



    // must handle two situation
    // 1 get host api call response
    // 2 send app api call response
    window.addEventListener("message", function(e) {
        if (e.origin !== message.host) {
            return;
        }

        var data = parseJSON(e.data);
        var eventId = data.id;
        if (!isSender(eventId)) {
            // call api and post back result
            _callApi(data);
        } else {
            runCallback(null, data);
        }

    });

    var host = {};

    /*
     * apiName non option
     * postData optional
     * callback optional
     */

    host.callApi = function(apiName, postData, callback) {
        if (!apiName) {
            throw 'require apiName';
        }
        if (!isString(apiName)) {
            throw 'apiName must be a string';
        }
        var data = {
            api: apiName
        };
        var cb = null;
        if (isObject(postData)) {
            data.args = postData;
        }
        if (isFunc(postData) && !callback) {
            cb = postData
        }
        if (isFunc(callback)) {
            cb = callback
        }

        postToHost(data, cb);

    }

    window.Host = host;
}())