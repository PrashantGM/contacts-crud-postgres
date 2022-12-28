const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

//add new contact
app.post('/contacts', async (req, res) => {
  try {
    const { fname, lname, phone, email, _address } = req.body;
    const contact = await pool.query(
      'INSERT INTO contacts (fname,lname,phone,email,_address) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [fname, lname, phone, email, _address]
    );
    res.status(201).json(contact.rows[0]);
  } catch (error) {
    res.status(500).json(err);
  }
});

//get all contacts
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await pool.query('SELECT * FROM contacts');

    res.status(200).json(contacts.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get single contact
app.get('/contacts/:id', async (req, res) => {
  const { id: contact_id } = req.params;
  try {
    const contact = await pool.query(
      'SELECT * FROM contacts WHERE contact_id=$1',
      [contact_id]
    );
    res.status(200).json(contact.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update contact
app.put('/contacts/:id', async (req, res) => {
  try {
    const { id: contact_id } = req.params;
    const { fname, lname, phone, email, _address } = req.body;
    await pool.query(
      'UPDATE contacts SET fname=$1,lname=$2,phone=$3,email=$4,_address=$5 WHERE contact_id=$6',
      [fname, lname, phone, email, _address, contact_id]
    );
    res.status(200).json('Contact was successfully updated');
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete contact
app.delete('/contacts/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM contacts WHERE contact_id=$1', [
      req.params.id,
    ]);
    res.status(200).json('Contact was successfully deleted!');
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3000, () => {
  console.log('Listening to port 3000');
});
