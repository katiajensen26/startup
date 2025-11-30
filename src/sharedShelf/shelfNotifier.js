

class shelfNotifier {

    handlers = [];

    constructor(shareId) {
        const port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';


        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws/shelf/${shareId}`);

        this.socket.onopen = () => {
            console.log('WebSocket connection successfull.');
        };

        this.socket.onclose = () => {
            console.log('WebSocket connection closed.');
        };
        
        this.socket.onmessage = async (msg) => {
        try {
            const event = JSON.parse(await msg.data.text());
            this.receiveEvent(event);
        } catch {}
        };
    }

    addHandler(func) {
        this.handlers.push(func);
    }

    receiveEvent(message) {
        this.handlers.forEach((func) => func(message));
    }
}