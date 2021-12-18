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
    fetchGroup = (req, res) => {
        groupModel.fetchGroup()
            .then((result) => {
                res.status(200).json(Package.res_type(200, "OK", result));
            })
            .catch((err) => {
                err === "NoData"
                    ? res.status(404).json(Package.res_type(404, err, null))
                    : res.status(500).json(Package.res_type(500, "ServerError", err))
            });
    }
}

module.exports = new Group();