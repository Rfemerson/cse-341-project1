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

const createContact = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongoDb.getDatabase().db().collection('contacts').insertOne(newContact);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags= ['Contacts']
    const contactId = new ObjectId(req.params.id);
    const updatedContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongoDb.getDatabase().db().collection('contacts').updateOne({_id: contactId}, {$set: updatedContact});
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags= ['Contacts']
    const contactId = new ObjectId(req.params.id);
    const response = await mongoDb.getDatabase().db().collection('contacts').deleteOne({_id: contactId}, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
};


module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact

};