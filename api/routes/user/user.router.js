const userRouter = require('express').Router();
const Users = require('../../../data/models/users.model');
const generators = require('../../utils/generators');
const restricted = require('../../auth/restricted');
const ClassClients = require('../../../data/models/classClients.model');
/**
 * @api {put} /api/user Updates the Current Logged In User
 * @apiVersion 1.0.0
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission token
 * @apiDescription Updates the current logged in user
 * @apiParam {String} username The Users username
 * @apiParam {String} password The Users password
 * @apiParam {String} firstName The Users first name
 * @apiParam {String} lastName The Users last name
 * @apiParam {String} email The Users email
 * @apiParam {Integer} roleId The Users Role, 1 for Instructor, 2 for Client
 * @apiParamExample {json} Sample-Request:
 * {
 *  "firstName": "Donald"
 * }
 * @apiSuccess {Object} user The Updated User
 * @apiSuccessExample {json} Success-Response:
 *{
 *  "id": 3,
 *  "firstName": "Donald",
 *  "lastName": null,
 *  "email": null,
 *  "username": "don",
 *  "created_at": "2019-10-20T22:59:45.794Z",
 *  "updated_at": "2019-10-20T22:59:45.794Z",
 *  "roleId": 1
 *}
 */

function updateUser(req, res) {
  console.log(req.user);
  if (req.body.password) {
    const newPassword = generators.password(req.body.password);
    Users.update(req.user.id, { ...req.body, password: newPassword })
      .then(user => {
        const updatedUser = {
          id: user[0].id,
          firstName: user[0].firstName,
          lastName: user[0].lastName,
          email: user[0].email,
          username: user[0].username,
          created_at: user[0].created_at,
          updated_at: user[0].updated_at,
          roleId: user[0].roleId,
        };
        res.json(updatedUser);
      })
      .catch(err => res.status(500).json(err));
  } else {
    Users.update(req.user.id, req.body)
      .then(user => {
        const updatedUser = {
          id: user[0].id,
          firstName: user[0].firstName,
          lastName: user[0].lastName,
          email: user[0].email,
          username: user[0].username,
          created_at: user[0].created_at,
          updated_at: user[0].updated_at,
          roleId: user[0].roleId,
        };
        res.json(updatedUser);
      })
      .catch(err => {
        console.log('NO PASSWORD UPDATE', err);
        res.status(500).json(err);
      });
  }
}

/**
 * @api {delete} /api/user Deletes the Current Logged In User
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiName deleteUser
 * @apiPermission token
 * @apiDescription Deletes the current logged in user
 * @apiSuccess {Integer} count The count of Records deleted
 * @apiSuccessExample {Integer} Success-Response:
 * 1
 */

function deleteUser(req, res) {
  Users.remove(req.user.id)
    .then(count => res.json(count))
    .catch(err => res.status(500).json(err));
}
/**
 * @api {get} /api/user/classes Retrieve all Classes that the Current User is signed up for
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiName getUserClasses
 * @apiPermission token
 * @apiDescription Retrieves the Current Users Signed up Classes
 * @apiSuccess {Array} classes Retrieves all current classes signed up by the User
 */
function retrieveClasses(req, res) {
  ClassClients.findBy({ clientId: req.user.id })
    .then(classes => res.json(classes))
    .catch(err => res.status(500).json(err));
}
/**
 * @api {post} /api/user/classes/:id Signs the User up for the Provided Class Id
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiName postUserClasses
 * @apiPermission token
 * @apiDescription Signs an user up for a class based on the provided class Id
 * @apiSuccess {Object} classes Returns the Class Mapping
 */

function addUserToClass(req, res) {
  ClassClients.add({ classId: req.params.id, clientId: req.user.id })
    .then(mapping => res.json(mapping))
    .catch(err => res.status(500).json(err));
}

function removeUserFromClass(req, res) {}

userRouter
  .put('/', restricted, updateUser)
  .delete('/', restricted, deleteUser)
  .get('/classes', restricted, retrieveClasses)
  .post('/classes/:id', restricted, addUserToClass);

module.exports = userRouter;
