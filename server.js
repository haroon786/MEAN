const http=require('http');
const app=require('./backend/app');
const debug=require("debug")("node-angular")

const PORT=process.env.PORT || 3000
const server=http.createServer(app);
server.listen(PORT)

