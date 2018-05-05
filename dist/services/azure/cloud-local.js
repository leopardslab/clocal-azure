"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class CloudLocal {
    constructor() {
        this.app = express_1.default();
        this.init();
    }
    start() {
        if (!this.port) {
            throw new Error('Port is not assigned');
        }
        return (this.server = this.app.listen(this.port));
    }
    stop() {
        return this.server.listening && this.server.close();
    }
}
exports.default = CloudLocal;
//# sourceMappingURL=cloud-local.js.map