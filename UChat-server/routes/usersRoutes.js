var express = require('express');
var router = express.Router();
var dbClientsWrapper = require('../dbWrappers/dbClientsWrapper');

router.get('/exists/:username', function (req, res) {
    dbClientsWrapper.isClientExists(req.params["username"], function (err, exists) {
        if (err != undefined) {
            next(err)
        } else {
            res.status(200).send(exists);
        }
    });
});


module.exports = router;