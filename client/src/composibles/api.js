"use strict";
exports.__esModule = true;
exports.useApi = void 0;
var Api_1 = require("../../api/Api");
var httpApi = new Api_1.Api({
    baseUrl: 'https://localhost:3000'
});
var useApi = function () {
    return httpApi.api;
};
exports.useApi = useApi;
