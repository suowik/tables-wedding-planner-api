let CRUD = require('../common/CRUD.js').CRUD;
let mongo = require('mongodb');
class WeddingRepository extends CRUD {
    constructor(mongo) {
        super(mongo, {
            collection: 'weddings',
            keyUniqueness: (wedding) => {
                return {_id: wedding._id}
            }
        })
    }

    update(entity) {
        console.log(entity)
        entity._id = new mongo.ObjectID(entity._id);
        return this.mongo
            .then((db) => {
                return db.collection(this.props.collection)
                    .findAndModify({_id: new mongo.ObjectID(entity._id)}, [], entity, {upsert: true})
            }).catch(err => {
                console.log(err)
                return Promise.reject(new Error(""))
            });
    }

}

module.exports = {
    WeddingRepository: WeddingRepository
};