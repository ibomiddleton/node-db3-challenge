const db = require('../data/schemes.db3');

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

function findSteps(scheme_name) {
  return db('posts as p')
    .join('schemes as s', 's.id', 'p.scheme_id')
    .select('p.id', 'p.contents', 'u.username')
    .where({ scheme_name });
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