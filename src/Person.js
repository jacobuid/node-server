class Person {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    greeting() {
        console.log(`My name is ${this.name} and I am ${this.age} years old.`)
    }
}

console.log(`The ${__filename} file ran...`);

module.exports = Person;