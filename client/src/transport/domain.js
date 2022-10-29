"use strict";
exports.__esModule = true;
exports.ETransportStatus = void 0;
var ETransportStatus;
(function (ETransportStatus) {
    ETransportStatus[ETransportStatus["CONNECTED"] = 200] = "CONNECTED";
    ETransportStatus[ETransportStatus["DISCONNECTED"] = 503] = "DISCONNECTED";
    ETransportStatus[ETransportStatus["ERROR"] = 502] = "ERROR";
    ETransportStatus[ETransportStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
})(ETransportStatus = exports.ETransportStatus || (exports.ETransportStatus = {}));
