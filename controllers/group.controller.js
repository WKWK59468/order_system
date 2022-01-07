const groupModel = require("../models/group.model")
const Package = require("../function_package")
class Group {
  addGroup = (req, res) => {
    const body = req.body
    const name = body.name
    const organizer = body.organizer
    const data = {
      name: name,
      organizer: organizer,
    }

    groupModel
      .addGroup(data)
      .then((result) => {
        res.status(201).json(Package.res_type(201, "OK", null))
      })
      .catch((err) => {
        res.status(500).json(Package.res_type(500, "ServerError", err))
      })
  }
  fetchAll = (req, res) => {
    groupModel
      .fetchAll()
      .then((result) => {
        res.status(200).json(Package.res_type(200, "OK", result))
      })
      .catch((err) => {
        if (err === "NoData") {
          res.status(404).json(Package.res_type(404, err, null))
        } else {
          res.status(500).json(Package.res_type(500, "ServerError", err))
        }
      })
  }
  fetchOne = (req, res) => {
    const params = req.params

    groupModel
      .fetchOne(params)
      .then((result) => {
        res.status(200).json(Package.res_type(200, "OK", result))
      })
      .catch((err) => {
        if (err === "NoData") {
          res.status(404).json(Package.res_type(404, err, null))
        } else {
          res.status(500).json(Package.res_type(500, "ServerError", err))
        }
      })
  }
  patchGroup = (req, res) => {
    const groupName = req.params.groupName
    const body = req.body

    groupModel
      .patchGroup(groupName, body)
      .then((result) => {
        res.status(200).json(Package.res_type(200, "OK", null))
      })
      .catch((err) => {
        if (err === "查無此團體") {
          res.status(404).json(Package.res_type(404, err, null))
        } else {
          res.status(500).json(Package.res_type(500, "ServerError", err))
        }
      })
  }
  deleteGroup = (req, res) => {
    const params = req.params
    const data = {
      name: params.groupName,
    }

    groupModel
      .deleteGroup(data)
      .then((result) => {
        res.status(200).json(Package.res_type(200, "OK", null))
      })
      .catch((err) => {
        if (err === "查無此團體") {
          res.status(404).json(Package.res_type(404, err, null))
        } else {
          res.status(500).json(Package.res_type(500, "ServerError", err))
        }
      })
  }
  addUsers = (req, res) => {
    const body = req.body
    const groupID = req.params.groupID
    let cnt = 0

    body.users.forEach((element) => {
      if (!element.match(/^[0-9a-fA-F]{24}$/)) {
        cnt += 1
        res.status(500).json(Package.res_type(500, "userID Format Error", null))
      }
    })

    const data = {
      users: body.users,
    }

    if (cnt === 0) {
      groupModel
        .addUsers(groupID, data)
        .then((result) => {
          res.status(200).json(Package.res_type(200, "OK", null))
        })
        .catch((err) => {
          if (err === "UpdateError") {
            res.status(400).json(Package.res_type(400, err, null))
          } else {
            res.status(500).json(Package.res_type(500, "ServerError", err))
          }
        })
    }
  }
  deleteUsers = (req, res) => {
    const groupID = req.params.groupID
    const body = req.body

    const data = {
      users: body.users,
    }

    groupModel
      .deleteUsers(groupID, data)
      .then((result) => {
        res.ststus(200).json(Package.res_type(200, "OK", null))
      })
      .catch((err) => {
        if (err === "UpdateError") {
          res.status(400).json(Package.res_type(400, err, null))
        } else {
          res.status(500).json(Package.res_type(500, "ServerError", err))
        }
      })
  }
}

module.exports = new Group()
