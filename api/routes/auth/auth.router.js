const authRouter = require('express').Router();
const Users = require('../../../data/models/users.model');
const generators = require('../../utils/generators');

/**
 * @apiDefine UserNotFound
 * @apiError UserNotFound Username is not in the system
 */

/**
 * @apiDefine NotAuthorized
 * @apiError NotAuthorized Incorrect Password
 */

/**
 * @apiDefine UserNameAlreadyTaken
 * @apiError UserNameAlreadyTaken Username has already been taken
 */

/**
 * @api {post} /api/auth/register Registers a New User
 * @apiUse UserNameAlreadyTaken
 * @apiVersion 1.0.0
 * @apiName RegisterUser
 * @apiGroup Auth
 * @apiPermission none
 * @apiDescription Registers a New User
 * @apiParam {String} username The New Users username *Required
 * @apiParam {String} password The New Users password *Required
 * @apiParam {String} firstName The New Users first name
 * @apiParam {String} lastName The New Users last name
 * @apiParam {String} email The New Users email
 * @apiParam {Integer} roleId The Users Role, 1 for Instructor, 2 for Client *Required
 *
 * @apiSuccess {Object} user The Newly Created User
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "id": 2,
 *   "username": "testuser",
 *   "created_at": "2019-10-19 19:58:08",
 *   "updated_at": "2019-10-19 19:58:08"
 * }
 * @apiErrorExample {json} Username-Already-Taken
 * {
 *      "message": "Username is already taken"
 * }
 */

function register(req, res) {
  Users.findBy({ username: req.body.username })
    .then(foundUser => {
      if (foundUser.length === 0) {
        const newPassword = generators.password(req.body.password);
        Users.add({ ...req.body, password: newPassword })
          .then(saved => {
            const { password, ...newUser } = saved[0];
            res.status(201).json(newUser);
          })
          .catch(err => res.status(500).json(err));
      } else {
        res.status(400).json({ message: 'Username is already taken' });
      }
    })
    .catch(err => res.status(500).json(err));
}
