import ReconnectingWebSocket from 'reconnecting-websocket';

function getWebSocket(url, port, onMessage, onConnect, onClose) {
    const webSocket = new ReconnectingWebSocket(`ws://${url}:${port}/websocket`);
    webSocket.onopen = (status) => {
        onConnect(true, status);
    };

    webSocket.onclose = (data) => {
        onClose(data);
    };

    webSocket.onmessage = (msg) => {
        try{
            // webSocket.send(JSON.stringify({client_is_busy: true}));
            onMessage(JSON.parse(msg.data));
            // window.requestAnimationFrame(()=>{webSocket.send(JSON.stringify({client_is_busy: false}))});
            // console.log(webSocket.bufferedAmount);
        }
        catch (e) {
            console.log(`BAD MSG STRUCT: ${JSON.parse(msg.data)}`);
        }
    };

    return webSocket;
}

export default getWebSocket;
