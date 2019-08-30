const db = require('../data/db-config.js');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes').where({ id }).first();
}

function findSteps(scheme_id) {
  return db('steps as s')
    .join('schemes as s', 's.id', 's.scheme_id')
    .select('s.id', 's.scheme_id', 's.step_number', 's.instructions' )
    .where({ scheme_id });
}

function add(scheme) {
  return db('schemes').insert(scheme)
  .then(ids => {
    return findById(ids[0]);
  });
}

function update(changes, id) {
  return db('schemes').where({ id }).update(changes)
  .then(count => {
    return findById(id);
  });
}

function remove(id) {
  return db('schemes').where({ id }).del();
}