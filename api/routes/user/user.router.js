const userRouter = require('express').Router();
const Users = require('../../../data/models/users.model');
const generators = require('../../utils/generators');
const restricted = require('../../auth/restricted');
/**
 * @api {put} /api/user Updates the Current Logged In User
 * @apiVersion 1.0.0
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission token
 * @apiDescription Updates the current logged in user
 * @apiParam {String} username The New Users username
 * @apiParam {String} password The New Users password
 * @apiParam {String} firstName The New Users first name
 * @apiParam {String} lastName The New Users last name
 * @apiParam {String} email The New Users email
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
 * @apiName deleteUser
 * @apiPermission token
 * @apiDescription Deletes the current logged in user
 *
 */

function deleteUser(req, res) {
  Users.remove(req.user.id)
    .then(count => res.json(count))
    .catch(err => res.status(500).json(err));
}

userRouter.put('/', restricted, updateUser).delete('/', restricted, deleteUser);

module.exports = userRouter;
