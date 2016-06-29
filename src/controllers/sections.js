/* eslint-disable new-cap, array-callback-return  */

import express from 'express';
import Section from '../models/section';
const router = module.exports = express.Router();

/*
router.get('/', (req, res) => {
  Country.find((err, countries) => {
    res.render('countries/index', { countries });
  });s
});

router.get('/new', (req, res) => {
  res.render('countries/new');
});*/

router.post('/update', (req, res) => {
  const section = new Section(req.body);
  const insertArray = [];
  section.save(() => {
    const query = { _id: section.id };
    for (let i = 0; i < section.quantity; i++) {
      insertArray.push({ seatNumber: i + 1, purchased: false });
    }
    Section.findOneAndUpdate(query,
                             { $pushAll: { seats: insertArray } },
                             () => { res.send(section); }
                            );
  });
});

// for whatever reason, the key from the front end was NOT getting populated in the backend.
router.post('/purchase_seat', (req, res) => {
  const query = { 'seats._id': req.body.ObjectId };
  Section.update(query,
                 { $set: { 'seats.$.purchased': true } },
                 (err, doc) => {
                   res.send(doc);
                 });
});

router.get('/pull', (req, res) => {
  Section.find((err, section) => {
    res.send(section);
  });
});
