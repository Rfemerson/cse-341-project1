const mongoDb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
    const result = await mongoDb.getDatabase().db().collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const getContactById = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongoDb.getDatabase().db().collection('contacts').findOne({_id: contactId});
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

module.exports = {
    getAllContacts,
    getContactById
};