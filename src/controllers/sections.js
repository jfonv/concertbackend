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
  const seats = Array(req.body.quantity * 1).fill(0).map((_, i) => {
    const seatNumber = i + 1;
    const purchased = false;
    return { seatNumber, purchased };
  });
  section.seats = seats;
  section.save(() => {
    res.send(section);
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
