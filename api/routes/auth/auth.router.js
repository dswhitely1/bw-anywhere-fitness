const authRouter = require('express').Router();
const bcrypt = require('bcryptjs');
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
 * @apiParamExample {json} Sample-Request:
 * {
 *  "username": "don",
 *  "password": "123456",
 *  "roleId": 1
 * }
 * @apiSuccess {Object} user The Newly Created User
 * @apiSuccessExample {json} Success-Response:
 *{
 *  "id": 3,
 *  "firstName": null,
 *  "lastName": null,
 *  "email": null,
 *  "username": "don",
 *  "created_at": "2019-10-20T22:59:45.794Z",
 *  "updated_at": "2019-10-20T22:59:45.794Z",
 *  "roleId": 1
 *}
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
            const newUser = {
              id: saved[0].id,
              firstName: saved[0].firstName,
              lastName: saved[0].lastName,
              email: saved[0].email,
              username: saved[0].username,
              created_at: saved[0].created_at,
              updated_at: saved[0].updated_at,
              roleId: saved[0].roleId,
            };
            res.status(201).json(newUser);
          })
          .catch(err => res.status(500).json(err));
      } else {
        res.status(400).json({ message: 'Username is already taken' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

/**
 * @api {post} /api/auth/login Logs an User In
 * @apiUse UserNotFound
 * @apiUse NotAuthorized
 * @apiVersion 1.0.0
 * @apiName LoginUser
 * @apiGroup Auth
 * @apiPermission none
 * @apiDescription Logs an User In
 * @apiParam {String} username Username of the User
 * @apiParam {String} password Password of the User
 * @apiParamExample {json} Sample-Request:
 * {
 *  "username": "don",
 *  "password": "123456"
 * }
 * @apiSuccess {Object} The Users welcome message, token, and user object
 * @apiSuccessExample {json} Success-Response:
 *{
 * "message": "Welcome back don!",
 * "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzE2MTI3MjcsImV4cCI6MTU3MTY5OTEyN30.FKIekAwXBPHRAf6ImjKHM_rKN9GrqLHcXMrpD4RpIB0",
 * "user": {
 *   "id": 3,
 *   "firstName": null,
 *   "lastName": null,
 *   "email": null,
 *   "username": "don",
 *   "created_at": "2019-10-20T22:59:45.794Z",
 *   "updated_at": "2019-10-20T22:59:45.794Z",
 *   "roleId": 1
 * }
 *}
 * @apiErrorExample {json} Username-Not-Found-Response
 * {
 *      "message": "Username is not in the system."
 * }
 * @apiErrorExample {json} Incorrect-Password
 * {
 *      "message": "Incorrect Password"
 * }
 */

function login(req, res) {
  Users.findBy({ username: req.body.username })
    .then(user => {
      if (user.length !== 0) {
        if (bcrypt.compareSync(req.body.password, user[0].password)) {
          const token = generators.token(user[0]);
          const validatedUser = {
            id: user[0].id,
            firstName: user[0].firstName,
            lastName: user[0].lastName,
            email: user[0].email,
            username: user[0].username,
            created_at: user[0].created_at,
            updated_at: user[0].updated_at,
            roleId: user[0].roleId,
          };
          res.json({
            message: `Welcome back ${validatedUser.username}!`,
            token,
            user: validatedUser,
          });
        } else {
          res.status(401).json({ message: 'Incorrect Password' });
        }
      } else {
        res.status(404).json({ message: 'Username is not in the system' });
      }
    })
    .catch(err => res.status(500).json(err));
}

authRouter.post('/register', register).post('/login', login);

module.exports = authRouter;
