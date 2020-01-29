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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var keybase_bot_1 = __importDefault(require("keybase-bot"));
var request_promise_native_1 = __importDefault(require("request-promise-native"));
var moment_1 = __importDefault(require("moment"));
var delay_1 = __importDefault(require("delay"));
var owner = process.env.KEYBASE_OWNER || 'pzduniak';
var pongURL = process.env.KBST_URL || '';
var bot = new keybase_bot_1.default();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var username_1, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 8]);
                    if (!process.env.KEYBASE_PAPERKEY) return [3 /*break*/, 2];
                    return [4 /*yield*/, bot.init(process.env.KEYBASE_USERNAME, process.env.KEYBASE_PAPERKEY, {
                            autoLogSendOnCrash: true,
                            verbose: false,
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, bot.initFromRunningService(undefined, {
                        autoLogSendOnCrash: true,
                        verbose: false,
                    })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    username_1 = bot.myInfo().username;
                    bot.chat.watchChannelForNewMessages({
                        name: 'kbst',
                        topicName: 'general',
                    }, function (message) { return __awaiter(_this, void 0, void 0, function () {
                        var tag, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // Only respond to the bot's owner
                                    if (message.sender.username !== owner) {
                                        return [2 /*return*/];
                                    }
                                    // And only to their text messages 
                                    if (message.content.type !== 'text' || !message.content.text) {
                                        return [2 /*return*/];
                                    }
                                    tag = '@' + username_1;
                                    if (!message.content.text.body.startsWith(tag)) {
                                        if (message.content.text.body[0] === '@') {
                                            return [2 /*return*/];
                                        }
                                    }
                                    if (!message.content.text.body.includes('crash')) return [3 /*break*/, 4];
                                    return [4 /*yield*/, bot.chat.send(message.channel, {
                                            body: 'Goodbye cruel world! Crashing in 3s.'
                                        })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, delay_1.default(3000)];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, bot.chat.crash()];
                                case 3:
                                    _a.sent();
                                    return [2 /*return*/];
                                case 4:
                                    if (!message.content.text.body.includes('ping')) return [3 /*break*/, 11];
                                    if (!pongURL) return [3 /*break*/, 9];
                                    _a.label = 5;
                                case 5:
                                    _a.trys.push([5, 7, , 9]);
                                    return [4 /*yield*/, request_promise_native_1.default({
                                            method: 'POST',
                                            uri: pongURL,
                                            body: {
                                                username: username_1,
                                                message: message.content.text.body,
                                                timestamp: moment_1.default().unix(),
                                            },
                                            json: true,
                                        })];
                                case 6:
                                    _a.sent();
                                    return [3 /*break*/, 9];
                                case 7:
                                    err_1 = _a.sent();
                                    return [4 /*yield*/, bot.chat.send(message.channel, {
                                            body: "Pong failed: " + err_1,
                                        })];
                                case 8:
                                    _a.sent();
                                    return [3 /*break*/, 9];
                                case 9: return [4 /*yield*/, bot.chat.send(message.channel, {
                                        body: 'Pong!',
                                    })];
                                case 10:
                                    _a.sent();
                                    return [2 /*return*/];
                                case 11: return [2 /*return*/];
                            }
                        });
                    }); }, function (err) { return console.error(err); });
                    return [3 /*break*/, 8];
                case 5:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, bot.deinit()];
                case 7:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function shutDown() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bot.deinit()];
                case 1:
                    _a.sent();
                    process.exit();
                    return [2 /*return*/];
            }
        });
    });
}
process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);
main();
//# sourceMappingURL=index.js.map