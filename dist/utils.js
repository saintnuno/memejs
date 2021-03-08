"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSubreddit = exports.time = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
function time(time) {
    const unix = new Date(time * 1000);
    return unix.getUTCFullYear() +
        '-' + ('0' + unix.getUTCMonth()).slice(-2) +
        '-' + ('0' + unix.getUTCDate()).slice(-2) +
        ' ' + ('0' + unix.getUTCHours()).slice(-2) +
        ':' + ('0' + unix.getUTCMinutes()).slice(-2) +
        ':' + ('0' + unix.getUTCSeconds()).slice(-2) +
        '.' + (unix.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5);
}
exports.time = time;
function checkSubreddit(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = yield node_fetch_1.default(url);
        const res = yield request.json();
        if (!res.data || !res.data.children)
            return console.error('Invalid subreddit');
        const { children } = res.data;
        return children;
    });
}
exports.checkSubreddit = checkSubreddit;
//# sourceMappingURL=utils.js.map