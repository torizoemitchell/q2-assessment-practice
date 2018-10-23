'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex')

// YOUR CODE HERE
router.get('/', (req, res, next) => {
  //res.send('ALL RECORDS')
  knex('messages')
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      next(err)
    })
})
// READ ONE record for this table
router.get('/:id', (req, res, next) => {
  //res.send('ONE RECORD')
  knex('messages')
    .where('id', req.params.id)
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      next(err)
    })
})

// CREATE ONE record for this table
router.post('/', (req, res, next) => {
  //res.send('CREATED RECORD')
  knex('messages')
    .insert({
      "name": req.body.name,
      "message": req.body.message,
    })
    .returning('*')
    .then((data) => {
      res.json(data[0])
    })
    .catch((err) => {
      next(err)
    })
})

// UPDATE ONE record for this table
router.put('/:id', (req, res, next) => {
  //res.send('UPDATED RECORD')
  knex('messages')
    .where('id', req.params.id)
    .then((data) => {
      knex('messages')
        .where('id', req.params.id)
        .limit(1)
        .update({
          "name": req.body.name,
          "message": req.body.message,
        })
        .returning('*')
        .then((data) => {
          res.json(data[0])
        })
    })
    .catch((err) => {
      next(err)
    })
})

// DELETE ONE record for this table
router.delete('/:id', (req, res, next) => {
  //res.send('DELETED RECORD')
  knex('messages')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) return next()
      knex('messages')
        .del()
        .where('id', req.params.id)
        .then(() => {
          res.send(`ID ${req.params.id} Deleted`)
        })
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router;
