import {ProductSelectionComponent} from "./components/product-selection/product-selection.component";
import SockJS from "sockjs-client";
import * as Stomp from "stompjs";

export class WsPsAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic1: string = "/topic/productSelection";
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
            _this.stompClient.subscribe(_this.topic1, function (sdkEvent: any) {
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
        if (message.includes("Error")) {
            message.replace(/\\/g, '');
            this._productSelectionComponent.openDialog(message);
        }
        else if (message.includes("Warning")) {
            message.replace(/\\"/g, '' && /"/g, '');
            this._productSelectionComponent.openDialog(message);
        }
        else {
            const split = message.split(':');
            const product = split[0].replace(/\\"/g, '',);
            const productId = product.replace(/"/g, '');
            console.log('ProductID: ' + productId);
            const amount = parseInt(split[1].replace(/"/g, ''), 10);
            console.log('Amount: ' + amount);
            const storage = split[2].replace(/\\"/g, '');
            const storageLocation = storage.replace(/"/g, '');
            console.log('Stored in: ' + storageLocation);

            const newMessage = "Product with ID: " + productId + " is stored in: " +storageLocation + ". New amount: " + amount;
            this._productSelectionComponent.openDialog(newMessage);
        }
    }
}