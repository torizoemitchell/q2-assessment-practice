'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex')

// YOUR CODE HERE
router.get('/', (req, res, next) => {
  //res.send('ALL RECORDS')
  knex('messages')
    .then((rows) => {
      let data = []
      rows.forEach((obj) => {
        let newObj = {
          id: obj.id,
          name: obj.name,
          message: obj.message
        }
        data.push(newObj)
      })
      res.json(data)
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
      let data = {
        id: rows[0].id,
        name: rows[0].name,
        message: rows[0].message
      }
      res.json(data)
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
      let retData = {
        id: data[0].id,
        name: data[0].name,
        message: data[0].message
      }
      res.json(retData)
    })
    .catch((err) => {
      next(err)
    })
})

// UPDATE ONE record for this table
router.patch('/:id', (req, res, next) => {
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
          let retData = {
            id: data[0].id,
            name: data[0].name,
            message: data[0].message
          }
          res.json(retData)
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
        .returning('*')
        .then((results) => {
          let data = {
            id: results[0].id,
            name: results[0].name,
            message: results[0].message
          }
          res.json(data)
        })
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router;
