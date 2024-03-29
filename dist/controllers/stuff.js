"use strict";
const Thing = require('../models/thing');
exports.createThing = (req, res, next) => {
    console.log(req.body);
    const test = JSON.stringify(req.body);
    const thingObject = JSON.parse(test);
    //delete thingObject._id;
    delete thingObject._userId;
    const thing = new Thing(Object.assign(Object.assign({}, thingObject), { userId: req.auth.userId, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }));
    thing.save()
        .then(() => { res.status(201).json({ message: 'Objet enregistré !' }); })
        .catch(error => { res.status(400).json({ error }); });
};
exports.getOneThing = (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    }).then((thing) => {
        res.status(200).json(thing);
    }).catch((error) => {
        res.status(404).json({
            error: error
        });
    });
};
exports.modifyThing = (req, res, next) => {
    const thing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    Thing.updateOne({ _id: req.params.id }, thing).then(() => {
        res.status(201).json({
            message: 'Thing updated successfully!'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};
exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({
            message: 'Deleted!'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};
exports.getAllStuff = (req, res, next) => {
    Thing.find().then((things) => {
        res.status(200).json(things);
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};
