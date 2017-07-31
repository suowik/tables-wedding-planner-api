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
        let criteria = {};
        if (entity._id) {
            criteria = {_id: new mongo.ObjectID(entity._id)};
            entity._id = new mongo.ObjectID(entity._id);
        }
        return new Promise((resolve, reject) => {
            return this.mongo
                .then((db) => {
                    return db.collection(this.props.collection)
                        .findAndModify(criteria, [], entity, {upsert: true}, (err, doc) => {
                            console.log(err);
                            if (err) reject(err);
                            resolve(doc.value);
                        })
                })
        });

    }

}


module.exports = {
    WeddingRepository: WeddingRepository
};