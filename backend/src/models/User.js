const lodash = require('lodash');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const fs = require('fs');

class User {
    constructor(data) {
        console.log(data);
        this.id = uuid();
        this.name = data?.name;
        this.email = data?.email;
        this.password = bcrypt.hashSync(data?.password.toString(), 8); // requesting crypt password 
    }
}

const store = {
    getStore: () => {
    const data = fs.readFileSync(__dirname + `/../store/users.json`).toString();
    return data ? JSON.parse(data) : [];
    },
    setStore: (data) => {
        fs.writeFileSync(__dirname + `/../store/users.json`, JSON.stringify(data, null, 2));
    }
}

class UserModel {

    static all() {
        return store.getStore();
    }
    
    static find(id) {
        const records = store.getStore();
        return lodash.find(records, ['id', id]);
    }

    static create(payload) {
        const record = new User(payload);
        const records = lodash.concat(store.getStore(), record);
        store.setStore(records);
        return record;
    }
}

module.exports = UserModel;