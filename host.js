(function() {

    var child = {};
    child.domain = "https://paynestrike.github.io";
    child.iframe = document.getElementById('receiver').contentWindow;


    function sendToChild(data) {
        child.iframe.postMessage(data, child.domain);
    }

    window.addEventListener("message", function(e) {
        if (e.origin !== child.domain) {
            return;
        }

        // do business logic

        setTimeout(function() {
            // send callback message event
            var messageId = e.data.id;
            var data = {
                id: messageId,
                msg: 'test message'
            };
            sendToChild(data);
        },3000)

    });

}())