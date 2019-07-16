console.info('server works!')

const Person = require('./src/Person');

const personOne = new Person('Jacob', 33);

console.log(personOne.greeting());


console.log(`The ${__filename} file ran...`);