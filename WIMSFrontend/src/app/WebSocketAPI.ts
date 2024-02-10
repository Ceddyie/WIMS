import {ProductSelectionComponent} from "./components/product-selection/product-selection.component";
import SockJS from "sockjs-client";
import * as Stomp from "stompjs";

export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/productSelection";
    stompClient: any;
    _productSelectionComponent!: ProductSelectionComponent;

    constructor(productSelectionComponent: ProductSelectionComponent) {
        this._productSelectionComponent = productSelectionComponent;
    }

    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame: any) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
                _this.onMessageReceived(sdkEvent);
            });
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    errorCallBack(error: string) {
        console.log("Och nee")
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

    onMessageReceived(message: any) {
        message = JSON.stringify(message.body);
        console.log("Received message: " + message)
        if (!message.includes("Error")) {
            const split = message.split(':');
            const product = split[0].replace(/\\"/g, '',);
            const productId = product.replace(/"/g, '');
            console.log('ProductID: ' + productId);
            const amount = parseInt(split[1].replace(/"/g, ''), 10);
            console.log('Amount: ' + amount);
            const storage = split[2].replace(/\\"/g, '');
            const storageLocation = storage.replace(/"/g, '');
            console.log('Stored in: ' + storageLocation);

            const newMessage = "ProductID: " + productId + " | Amount: " + amount + " | Stored in: " +storageLocation;
            this._productSelectionComponent.openDialog(newMessage);
        }
        else {
            const newMessage = "Error! Please check the information you entered.";
            this._productSelectionComponent.openDialog(newMessage);
        }
    }
}