const groupModel = require("../models/group.model");
const Package = require("../function_package");
class Group {
    addGroup = (req, res) => {
        const body = req.body;
        const name = body.name;
        const organizer = body.organizer;

        const data = {
            name: name,
            organizer: organizer,
        }

        groupModel.addGroup(data)
            .then((result) => {
                res.status(201).json(Package.res_type(201, "OK", result))
            })
            .catch((err) => {
                res.status(500).json(Package.res_type(500, "ServerError", err))
            });
    }
    fetchAll = (req, res) => {
        groupModel.fetchAll()
            .then((result) => {
                res.status(200).json(Package.res_type(200, "OK", result));
            })
            .catch((err) => {
                err === "NoData"
                    ? res.status(404).json(Package.res_type(404, err, null))
                    : res.status(500).json(Package.res_type(500, "ServerError", err))
            });
    }
    fetchOne = (req, res) => {
        const params = req.params;

        groupModel.fetchOne(params)
            .then((result) => {
                res.status(200).json(Package.res_type(200, "OK", result));
            })
            .catch((err) => {
                err === "NoData"
                    ? res.status(404).json(Package.res_type(404, err, null))
                    : res.status(500).json(Package.res_type(500, "ServerError", err));
            })
    }
    patchGroup = (req, res) => {
        const groupName = req.params.groupName;
        const body = req.body;

        groupModel.patchGroup(groupName, body)
            .then((result) => {
                res.status(200).json(Package.res_type(200, "OK", result));
            })
            .catch((err) => {
                err === "查無此團體"
                    ? res.status(404).json(Package.res_type(404, err, null))
                    : res.status(500).json(Package.res_type(500, "ServerError", err));
            })
    }
    deleteGroup = (req, res) => {
        const params = req.params
        const data = {
            name: params.groupName
        }

        groupModel.deleteGroup(data)
            .then((result) => {
                res.status(200).json(Package.res_type(200, "OK", null));
            })
            .catch((err) => {
                err === "查無此團體"
                ? res.status(400).json(Package.res_type(400, err, null))
                : res.status(500).json(Package.res_type(500, "ServerError", err));
            })
    }
}

module.exports = new Group();