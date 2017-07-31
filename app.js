let app = require('./src/routes.js').app;

let dbURI = process.env.MONGODB_URI || 'mongodb://192.168.99.100:27017/twd';
let MongoClient = require('mongodb').MongoClient;
let connection = MongoClient.connect(dbURI);


let UserRepository = require('./src/users/UserRepository.js').UserRepository;
let WeddingRepository = require('./src/weddings/WeddingRepository.js').WeddingRepository;

let repositories = {
    userRepository: new UserRepository(connection),
    weddingRepository: new WeddingRepository(connection),
};

app(repositories);

