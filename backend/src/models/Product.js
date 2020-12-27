const { v4: uuid } = require('uuid');
const lodash = require('lodash');
const fs = require('fs');

class Product {
    constructor(data) {
        this.id = uuid();
        this.name = data.name;
        this.description = data.description;
        this.price = parseFloat(data.price);
        this.image = data.image;
        this.created_at = data.created_at;
        this.user = data.user;
    }
}

const store = {
    getStore: () => {
    const data = fs.readFileSync(__dirname + `/../store/products.json`).toString();
    return data ? JSON.parse(data) : [];
    },
    setStore: (data) => {
        fs.writeFileSync(__dirname + `/../store/products.json`, JSON.stringify(data, null, 2));
    }
}

class ProductModel {
    static all() {
        return store.getStore();
    }

    static find(id) {
        const records = store.getStore();
        return lodash.find(records, ['id', id]);
    }

    static create(payload) {
        const record = new Product(payload);
        const records = lodash.concat(store.getStore(), record);
        store.setStore(records);
        return record;
    }

    static update(id, payload) {
        const records = store.getStore();
        const index = lodash.findIndex(records, ['id', id]);
        const record = this.find(id);
        records.splice(index, 1, lodash.merge(record, payload));
        store.setStore(records);
        return this.find(id);
    }

    static delete(id) {
        const records = store.getStore();
        lodash.remove(records, (item) => { return item.id == id });
        store.setStore(records);
        return this.find(id);
    }
}

module.exports = ProductModel;