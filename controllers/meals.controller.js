const mealsModels = require("../models/meals.model")
const func = require("../function_package")

class mealsController {
    add = function (req, res) {
        const body = req.body

        mealsModels
            .add(body)
            .then((result) => {
                res.status(201).json(func.res_type(201, "OK", null))
            })
            .catch((err) => {
                if (err === "price不可為空" || err === "name不可為空" || err === "store不可為空" || err === "storeID錯誤") {
                    res.status(400).json(func.res_type(400, err, null))
                } else {
                    res.status(500).json(func.res_type(500, "ServerError", err))
                }
            })
    }
    fetchAll = function (req, res) {
        mealsModels
            .fetchAll()
            .then((result) => {
                res.status(200).json(func.res_type(200, "OK", result))
            })
            .catch((err) => {
                if (err === "NoData") {
                    res.status(404).json(func.res_type(404, err, null))
                } else {
                    res.status(500).json(func.res_type(500, "ServerError", err))
                }
            })
    }
    fetchOneById = function (req, res) {
        const id = req.params.id

        mealsModels
            .fetchOneById(id)
            .then((result) => {
                res.status(200).json(func.res_type(200, "OK", result))
            })
            .catch((err) => {
                if (err === "NoData") {
                    res.status(404).json(func.res_type(404, err, null))
                } else {
                    res.status(500).json(func.res_type(500, "ServerError", err))
                }
            })
    }
    updateOneById = function (req, res) {
        const body = req.body
        const id = req.params.id

        mealsModels
            .updateOneById(id,body)
            .then((result)=>{
                res.status(200).json(func.res_type(200,"OK",null))
            })
            .catch((err)=>{
                if(err === "NoData"){
                    res.status(404).json(func.res_type(404,err,null))
                }else{
                    res.status(500).json(func.res_type(500,"ServerError",err))
                }
            })
    }
    deleteOneById = function (req, res) {
        const id = req.params.id

        mealsModels
            .deleteOneById(id)
            .then((result)=>{
                res.status(200).json(func.res_type(200,"OK",null))
            })
            .catch((err)=>{
                if(err === "NoData"){
                    res.status(404).json(func.res_type(404,err,null))
                }else{
                    res.status(500).json(func.res_type(500,"ServerError",err))
                }
            })
    }
}

module.exports = new mealsController()