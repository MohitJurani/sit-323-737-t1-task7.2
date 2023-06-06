const {MongoClient} = require('mongodb');
const uri = 'mongodb://admin:password@host.docker.internal:9999/?authMechanism=DEFAULT';
const client = new MongoClient(uri);

client.connect(err => {
    if (!err) {
        console.log('DB Connected');
    } else {
        console.error(err);
    }
});

module.exports = client;