const Store = require("../schema/store.schema")

const storeCollection = {
    addStore: function(data){
        const storeData = new Store(data)

        return new Promise((resolve,reject)=>{
            Store.count(
                {
                    name: data.name,
                },
                (err,res)=>{
                    if (err) {
                        reject(err)
                    } else if (res > 0) {
                        reject("此商家已經存在!")
                    } else {
                        storeData
                          .save()
                          .then((result) => {
                            resolve(result)
                          })
                          .catch((err) => {
                            reject(err)
                          })
                    }
                }
            )
        })
    },
    deleteOneByID: function(storeID){
        return new Promise((resolve,reject)=>{
            Store.findByIdAndDelete(storeID, (err,res) => {
                if(err){
                    reject(err)
                }else if(res){
                    resolve(res)
                }else{
                    reject("NoData")
                }
            })
        })
    },
    fetchOneByID: function(storeID){
        return new Promise((resolve,reject)=>{
            Store.findById(storeID, (err,res) => {
                if(err){
                    reject(err)
                }else if(res){
                    resolve(res)
                }else{
                    reject("NoData")
                }
            })
        })
    },
    fetchAllStore: function(){
        return new Promise((resolve, reject) => {
            Store.find({}, (err, res) => {
                if(err){
                    reject(err)
                }else if(res.length){
                    resolve(res)
                }else{
                    reject("NoData")
                }
            })
          })
    },
    updateOneByID: function(storeID,data){
        return new Promise((resolve,reject)=>{
            Store.findByIdAndUpdate(storeID,data,(err,res)=>{
                if(err){
                    reject(err)
                }else if(res){
                    resolve(res)
                }else{
                    reject("NoData")
                }
            })
        })
    }
}

module.exports = storeCollection