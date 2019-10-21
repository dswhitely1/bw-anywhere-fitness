const classesRouter = require('express').Router();
const Classes = require('../../../data/models/classes.model');
const restricted = require('../../auth/restricted');

/**
 *  @apiDefine UnAuthorized
 *  @apiError UnAuthorized User is not Authorized
 *  @apiErrorExample {json} Unauthorized-Response:
 *  {
 *      "message": "Unauthroized"
 *  }
 */
/**
 * @api {get} /api/classes Returns all classes
 * @apiUse UnAuthorized
 * @apiVersion 1.0.0
 * @apiName GetClasses
 * @apiGroup Classes
 * @apiPermission token
 *
 * @apiSuccess {Array} classes All Classes in the Database
 * @apiSuccessExample {json} Success-Response:
 * [
 *  {
 *    "id": 1,
 *    "title": "Yoga",
 *    "instructorId": 1,
 *    "categoryId": 1,
 *    "scheduleTime": null,
 *    "address": null,
 *    "city": null,
 *    "state": null,
 *    "zipCode": null,
 *    "created_at": "2019-10-21T12:51:44.173Z",
 *    "updated_at": "2019-10-21T12:51:44.173Z"
 *  },
 *  {
 *    "id": 2,
 *    "title": "Water Aerobics",
 *    "instructorId": 1,
 *    "categoryId": 2,
 *    "scheduleTime": null,
 *    "address": null,
 *    "city": null,
 *    "state": null,
 *    "zipCode": null,
 *    "created_at": "2019-10-21T12:51:44.173Z",
 *    "updated_at": "2019-10-21T12:51:44.173Z"
 *  }
 * ]
 */

function allClasses(req, res) {
  Classes.find()
    .then(classes => res.json(classes))
    .catch(err => res.status(500).json(err));
}

/**
 * @api {post} /api/classes Add New Class
 * @apiUse UnAuthorized
 * @apiVersion 1.0.0
 * @apiName PostClasses
 * @apiGroup Classes
 * @apiPermission token
 * @apiParam {String} title Class Title *Required
 * @apiParam {Integer} instructorId The Id of the Instructor *Required
 * @apiParam {Integer} categoryId The Id of the Category *Required
 * @apiParam {Date} scheduleTime The Date and Time of the class
 * @apiParam {String} address The Street Address of the class
 * @apiParam {String} city The City of the class
 * @apiParam {String} state The State of the class
 * @apiParam {String} zipCode The ZipCode fo the class
 * @apiParamExample {json} Sample-Request:
 * {
 *   "title": "A New Class",
 *   "instrudctorId": 1,
 *   "categoryId": 1
 * }
 * @apiSuccess {Object} Class The newly created Class
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "id": 3,
 *  "title": "A New Class",
 *  "instructorId": 1,
 *  "categoryId": 1,
 *  "scheduleTime": null,
 *  "address": null,
 *  "city": null,
 *  "state": null,
 *  "zipCode": null,
 *  "created_at": "2019-10-21T13:23:39.281Z",
 *  "updated_at": "2019-10-21T13:23:39.281Z"
 * }
 */

function addClass(req, res) {
  Classes.add(req.body)
    .then(newClass => res.status(201).json(newClass[0]))
    .catch(err => res.status(500).json(err));
}

/**
 * @api {put} /api/classes/:id Updated Class with provided Id
 * @apiUse UnAuthorized
 * @apiVersion 1.0.0
 * @apiName PutClasses
 * @apiGroup Classes
 * @apiPermission token
 * @apiParam {String} title Class Title *Required
 * @apiParam {Integer} instructorId The Id of the Instructor *Required
 * @apiParam {Integer} categoryId The Id of the Category *Required
 * @apiParam {Date} scheduleTime The Date and Time of the class
 * @apiParam {String} address The Street Address of the class
 * @apiParam {String} city The City of the class
 * @apiParam {String} state The State of the class
 * @apiParam {String} zipCode The ZipCode fo the class
 * @apiParamExample {json} Sample-Request:
 * {
 *   "title": "An Updated Class",
 * }
 * @apiSuccess {Object} Class The newly created Class
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "id": 3,
 *  "title": "An Updated Class",
 *  "instructorId": 1,
 *  "categoryId": 1,
 *  "scheduleTime": null,
 *  "address": null,
 *  "city": null,
 *  "state": null,
 *  "zipCode": null,
 *  "created_at": "2019-10-21T13:23:39.281Z",
 *  "updated_at": "2019-10-21T13:23:39.281Z"
 * }
 */

function updateClass(req, res) {
  Classes.update(req.params.id, req.body)
    .then(updatedClass => res.json(updatedClass[0]))
    .catch(err => res.status(500).json(err));
}

/**
 * @api {delete} /api/classes/:id Deletes Class based on provided Id
 * @apiVersion 1.0.0
 * @apiName DeleteClasses
 * @apiGroup Classes
 * @apiPermission token
 * @apiParam {integer} id The ID is passed in the URL
 * @apiSuccess {Integer} count Number of Records Deleted
 */

function deleteClass(req, res) {
  Classes.remove(req.params.id)
    .then(count => res.json(count))
    .catch(err => res.status(500).json(err));
}

classesRouter
  .get('/', restricted, allClasses)
  .post('/', restricted, addClass)
  .put('/:id', restricted, updateClass)
  .delete('/:id', restricted, deleteClass);

module.exports = classesRouter;
