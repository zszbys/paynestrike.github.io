(function() {
    var message = {};
    message.host = "https://c.na35.visual.force.com";
    message.stack = [];

    var child = {};
    child.domain = "https://paynestrike.github.io";
    child.iframe = document.getElementById('receiver').contentWindow;


    function isString(str) {
        return Object.prototype.toString.call(str) === "[object String]";
    }

    function isFunc(func) {
        return Object.prototype.toString.call(func) === "[object Function]";
    }

    function isObject(obj) {
        return Object.prototype.toString.call(obj) === "[object Otring]";
    }

    function postToIframe(args, callback) {
        var id = (new Date()).getTime() + '';
        var stack = {
            id: id,
            callback: callback
        };
        message.stack.push(stack);
        var data = {
            data: args,
            id: id
        }
        _postToIframe(JSON.stringify(data), child.domain);
    }

    function _postToIframe(data, host) {
        try {
            child.iframe.postMessage(data, host);
        } catch (e) {
            throw "Error : " + e.name + "\nmessage : " + e.message;
        }
    }

    function getStack(id) {
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

    function runCallback(data) {
        var id = data.id;
        var callback = getStack(id);
        if (Object.prototype.toString.call(callback) === "[object Function]") {
            callback(data.error, data.res);
            removeStack(id);
        }
    }

    window.addEventListener("message", function(e) {
        if (e.origin !== child.domain) {
            return;
        }

        var data = JSON.parse(e.data);

        runCallback(data);

    });

    var seismic = {};

    /*
     * apiName non option
     * postData optional
     * callback optional
     */

    seismic.callApi = function(apiName, postData, callback) {
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

        postToIframe(data, cb);

    }


    window.Seismic = seismic;

}())