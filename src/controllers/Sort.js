const {Job} = require('../models/NewJob');

const teste = Job.sort((a,b) => 
    b.likes - a.likes
);
console.table(teste);
