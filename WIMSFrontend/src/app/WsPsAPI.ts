import {ProductSelectionComponent} from "./components/product-selection/product-selection.component";
import SockJS from "sockjs-client";
import * as Stomp from "stompjs";

export class WsPsAPI {
    webSocketEndPoint: string = 'http://localhost:8083/ws';
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
        this._productSelectionComponent.openDialog(message);
    }
}