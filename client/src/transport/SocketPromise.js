"use strict";
exports.__esModule = true;
var SocketPromise = /** @class */ (function () {
    function SocketPromise(socket) {
        this.socket = socket;
    }
    SocketPromise.prototype.emit = function (event, payload) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.socket.emit(event, payload, function (response) {
                if (+(response === null || response === void 0 ? void 0 : response.status) >= 400) {
                    reject(response);
                }
                else {
                    resolve(response);
                }
            });
        });
    };
    SocketPromise.prototype.on = function (event, clb) {
        this.socket.on(event, clb);
    };
    return SocketPromise;
}());
exports["default"] = SocketPromise;
