"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloud_local_1 = __importDefault(require("./../azure/cloud-local"));
class AzureFunction extends cloud_local_1.default {
    init() {
        this.port = 9567;
        this.app.get('/', (req, res) => {
            res.send('Welcome to clocal azure api management');
        });
    }
}
exports.default = AzureFunction;
//# sourceMappingURL=azure-api-management.js.map