"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const schema = require("./schema/schema");
const dotenv = __importStar(require("dotenv"));
const app = express_1.default();
dotenv.config();
const PORT = process.env.PORT || 5000;
// Allow cross-origin request
app.use(cors_1.default());
mongoose_1.default.connect(process.env.DB_CONN, {
    useNewUrlParser: true,
});
const db = mongoose_1.default.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => {
    console.log("Database Connection Established");
});
app.use("/graphql", express_graphql_1.graphqlHTTP({
    schema,
    graphiql: true,
}));
app.listen(PORT, () => {
    console.log(`Now listening to port ${PORT}`);
});
