let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let cors = require('cors');

let port = process.env.PORT || 3001;

let auth = require('./auth.js');
let secret = process.env.AUTH_SECRET || 'dupa';

let UserEndpoints = require('./users/UserEndpoints.js').UserEndpoints;
let WeddingEndpoints = require('./weddings/WeddingEndpoints.js').WeddingEndpoints;

let protectedRoutes = (router, auth, secret) => {
    if (process.env.ENV === 'prod') {
        router.use(auth.authorizationFilter(secret));
    }
    return router;
};

let app = (repositories) => {
    let app = express();
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(cors());

    app.post('/login', auth.loginHandler(secret, repositories.userRepository));

    app.use('/users', new UserEndpoints(express.Router(), repositories.userRepository).routes);
    app.use('/weddings', new WeddingEndpoints(protectedRoutes(express.Router(), auth, secret), repositories.weddingRepository).routes);

    app.listen(port, () => {
        console.log('Started')
    });
};

module.exports = {
    app: app
};

