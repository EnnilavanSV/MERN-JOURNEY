const os = require("os");
const path = require("path");

console.log("Node Version:", process.version);
console.log("Platform:", process.platform);
console.log("Home:", process.env.HOME || process.env.USERPROFILE);

console.log(process.argv);

console.log("CPU Cores:", os.cpus().length);
console.log("platform:", os.platform());

const freeMB = Math.round(os.freemem() / 1024 / 1024);
console.log(`Free memory: ${freeMB} MB`);

console.log(__dirname);

const joined = path.join(__dirname, "data", "users.json");
console.log(joined);

console.log(path.extname("image.png"));
console.log(path.basename("image.png"));
