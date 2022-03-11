const Meals = require("../schema/meals.schema")

const mealsCollection = {
    add: function (data) {
        return new Promise((resolve, reject) => {
            if (!data.price) {
                reject("price不可為空")
            } else if (!data.name) {
                reject("name不可為空")
            } else {
                Meals
                    .create(data)
                    .then((result) => {
                        resolve(result)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            }
        })
    },
    fetchAll: function () {
        return new Promise((resolve, reject) => {
            Meals.find({}, (err, res) => {
                if (err) {
                    reject(err)
                } else if (res.length) {
                    resolve(res)
                } else {
                    reject("NoData")
                }
            })
        })
    },
    fetchOneById: function (id) {
        return new Promise((resolve, reject) => {
            Meals.findById(id, (err, res) => {
                if (err) {
                    reject(err)
                } else if (res) {
                    resolve(res)
                } else {
                    reject("NoData")
                }
            })
        })
    },
    updateOneById: function (id, data) {
        data = {
            name: data.name,
            price: data.price,
        }

        return new Promise((resolve, reject) => {
            Meals.findByIdAndUpdate(id, data, (err, res) => {
                if (err) {
                    reject(err)
                } else if (res) {
                    resolve(res)
                } else {
                    reject("NoData")
                }
            })
        })
    },
    deleteOneById: function (id) {
        return new Promise((resolve, reject) => {
            Meals.findByIdAndDelete(id, (err, res) => {
                if (err) {
                    reject(err)
                } else if (res) {
                    resolve(res)
                } else {
                    reject("NoData")
                }
            })
        })
    }
}

module.exports = mealsCollection