let Endpoints = require('../common/Endpoints.js').Endpoints;
class WeddingEndpoints extends Endpoints {
    constructor(router, repository) {
        super(router, repository);
        this.routes = this.registerRoute((router, repository) => {
            router.post('/update', (req, res) => {
                repository.update(req.body)
                    .then(wedding => {
                        res.json(wedding)
                    })
                    .catch(err => {
                        console.log(err)
                        res.sendStatus(500)
                    })
            })
        })
    }

}

module.exports = {
    WeddingEndpoints: WeddingEndpoints
};