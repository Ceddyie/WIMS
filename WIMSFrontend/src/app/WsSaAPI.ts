import {StorageAssignmentComponent} from "./components/storage-assignment/storage-assignment.component";
import SockJS from "sockjs-client";
import * as Stomp from 'stompjs';

export class WsSaAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/storageAssignment";
    stompClient: any;
    _storageAssignmentComponent!: StorageAssignmentComponent;

    constructor(storageAssignmentComponent: StorageAssignmentComponent) {
        this._storageAssignmentComponent = storageAssignmentComponent;
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
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

    onMessageReceived(message: any) {
        message = JSON.stringify(message.body);
        console.log("Received message: " + message);
        this._storageAssignmentComponent.openDialog(message);
    }
}