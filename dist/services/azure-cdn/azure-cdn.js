"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloud_local_1 = __importDefault(require("./../azure/cloud-local"));
class AzureCDN extends cloud_local_1.default {
    init() {
        this.port = 9581;
        this.app.get('/', (req, res) => {
            res.send('Welcome to clocal azure CDN');
        });
    }
}
exports.default = AzureCDN;
//# sourceMappingURL=azure-cdn.js.map