/* Fichero para los usuarios en el room. */

//classes ES6
/*
- constructor -> func dentro de la class que se llama sola cuando se crea una instancia de la clase pasándole 
los argumentos que va a recoger.
- la class puede tener métodos como los objetos pero se separan unos de otros sin "," ni ";".
*/

// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription () {     //método de la class.
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// }

// let me = new Person('Yune', 27);    //me === this del constructor.
// let description = me.getUserDescription();
// console.log(description);

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        let user = this.getUser(id);   

        if(user){
            this.users = this.users.filter((user) => user.id !== id);   // sintaxis ES6 para return.
        }
        return user;
    }
    getUser(id){
        return this.users.filter((user) => user.id === id)[0]
    }
    getUserList(room){
        let users = this.users.filter((user) => user.room === room);
        let namesArray = users.map((user) => user.name);

        return namesArray;
    }
}
module.exports = {Users};