"use strict";
exports.__esModule = true;
var socket_io_client_1 = require("socket.io-client");
var rxjs_1 = require("rxjs");
var SocketPromise_1 = require("./SocketPromise");
var domain_1 = require("./domain");
var WebSocket = /** @class */ (function () {
    function WebSocket() {
        this.status = domain_1.ETransportStatus.DISCONNECTED;
        this.subject$ = new rxjs_1.Subject();
    }
    WebSocket.prototype.create = function (wsUrl) {
        this.wsUrl = wsUrl;
    };
    WebSocket.prototype.connect = function () {
        if (this.socket) {
            this.socket.socket.disconnect();
        }
        var url = new URL(this.wsUrl);
        var ws = (0, socket_io_client_1.io)(url.origin, {
            transports: ["websocket", "polling"],
            path: url.pathname,
            auth: {
                token: this.token
            }
        });
        this.socket = new SocketPromise_1["default"](ws);
        this.listenStatus(ws);
    };
    WebSocket.prototype.emit = function (event, payload) {
        if (payload === void 0) { payload = ""; }
        if (this.status !== domain_1.ETransportStatus.CONNECTED) {
            console.log("[WS] error network status is: ".concat(this.status));
        }
        var result = this.socket.emit(event, payload);
        result["catch"](function (data) {
            console.error("[WS emit Error]", data);
        });
        return result;
    };
    WebSocket.prototype.on = function (event, clb) {
        if (this.status !== domain_1.ETransportStatus.CONNECTED) {
            throw new Error("Transport WS is disconnected");
        }
        this.socket.on(event, clb);
    };
    WebSocket.prototype.listenStatus = function (ws) {
        var _this = this;
        ws.on("ready", function (config) {
            _this.status = domain_1.ETransportStatus.CONNECTED;
            _this.serverConfig = config;
            _this.onChangeStatus();
        });
        ws.on("disconnect", function () {
            _this.status = domain_1.ETransportStatus.DISCONNECTED;
            _this.onChangeStatus();
        });
        ws.on("connect_error", function () {
            _this.status = domain_1.ETransportStatus.ERROR;
            _this.onChangeStatus();
        });
        ws.on("status", function (status) {
            _this.status = status;
            _this.onChangeStatus();
        });
    };
    WebSocket.prototype.disconnect = function () {
        this.socket.socket.disconnect();
    };
    WebSocket.prototype.onChangeStatus = function () {
        this.subject$.next(this.status);
    };
    return WebSocket;
}());
exports["default"] = new WebSocket();
