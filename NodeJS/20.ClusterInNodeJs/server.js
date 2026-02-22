const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;
console.log(`Number of CPU cores: ${numCPUs}`);

if (cluster.isPrimary) {
    console.log(`Master process is running with PID: ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code}, signal: ${signal}`);
        console.log('Starting a new worker...');
        cluster.fork();
    });
} else {
    require('./app');
}
    