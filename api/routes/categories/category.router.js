const categoryRouter = require('express').Router();
const { Categories } = require('../../../data/models/base.model');
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
 * @apiDefine CategoryNameAlreadyTaken
 * @apiError BadRequest Category Name is Already Taken
 * @apiErrorExample {json} BadRequest-Response
 * {
 *      "message": "The Category Name: ${req.body.name} is already taken"
 * }
 */
/**
 * @api {get} /api/category Returns all categories
 * @apiUse UnAuthorized
 * @apiVersion 1.0.0
 * @apiName GetCategories
 * @apiGroup Categories
 * @apiPermission token
 *
 * @apiSuccess {Array} categories All Categories in the Database
 * @apiSuccessExample {json} Success-Response:
 *[
 * {
 *   "id": 1,
 *   "name": "Pilates",
 *   "description": null,
 *   "created_at": "2019-10-20T22:59:34.197Z",
 *   "updated_at": "2019-10-20T22:59:34.197Z"
 * },
 * {
 *   "id": 2,
 *   "name": "Yoga",
 *   "description": null,
 *   "created_at": "2019-10-20T22:59:34.197Z",
 *   "updated_at": "2019-10-20T22:59:34.197Z"
 * },
 * {
 *   "id": 3,
 *   "name": "Lagree",
 *   "description": null,
 *   "created_at": "2019-10-20T22:59:34.197Z",
 *   "updated_at": "2019-10-20T22:59:34.197Z"
 * },
 * {
 *   "id": 4,
 *   "name": "Barre",
 *   "description": null,
 *   "created_at": "2019-10-20T22:59:34.197Z",
 *   "updated_at": "2019-10-20T22:59:34.197Z"
 * },
 * {
 *   "id": 5,
 *   "name": "Spin",
 *   "description": null,
 *   "created_at": "2019-10-20T22:59:34.197Z",
 *   "updated_at": "2019-10-20T22:59:34.197Z"
 * },
 * {
 *   "id": 6,
 *   "name": "Zumba",
 *   "description": null,
 *   "created_at": "2019-10-20T22:59:34.197Z",
 *   "updated_at": "2019-10-20T22:59:34.197Z"
 * }
 *]
 */

function allCategories(req, res) {
  Categories.find()
    .then(categories => res.json(categories))
    .catch(err => res.status(500).json(err));
}

/**
 * @api {post} /api/category Add New Category
 * @apiUse UnAuthorized
 * @apiUse CategoryNameAlreadyTaken
 * @apiVersion 1.0.0
 * @apiName PostCategories
 * @apiGroup Categories
 * @apiPermission token
 * @apiParam {String} name Category Name *Required
 * @apiParam {String} description Description of the Category
 *
 * @apiSuccess {Object} category The newly created Category
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "id": 9,
 *  "name": "Test Category2",
 *  "description": null,
 *  "created_at": "2019-10-21T01:19:39.287Z",
 *  "updated_at": "2019-10-21T01:19:39.287Z"
 * }
 */

function addCategory(req, res) {
  Categories.findBy({ name: req.body.name })
    .then(foundUser => {
      if (foundUser.length === 0) {
        Categories.add(req.body)
          .then(newCategory => {
            res.status(201).json(newCategory[0]);
          })
          .catch(err => res.status(500).json(err));
      } else {
        res.status(400).json({
          message: `The Category Name: ${req.body.name}, is already taken.`,
        });
      }
    })
    .catch(err => res.status(500).json(err));
}

/**
 * @api {put} /api/category/:id Updates Category based on provided Id
 * @apiVersion 1.0.0
 * @apiName PutCategories
 * @apiGroup Categories
 * @apiPermission token
 * @apiParam {Integer} id The ID is passed in the URL
 * @apiParam {String} name Category Name *Required
 * @apiParam {String} description Description of the Category
 *
 * @apiSuccess {Array} categories All Categories in the Database
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "id": 7,
 *   "name": "Test Category",
 *   "description": "Testing Update Router",
 *   "created_at": "2019-10-21T01:17:05.085Z",
 *   "updated_at": "2019-10-21T01:17:05.085Z"
 * }
 */

function updateCategory(req, res) {
  Categories.update(req.params.id, req.body)
    .then(updatedCategory => res.json(updatedCategory[0]))
    .catch(err => res.status(500).json(err));
}

/**
 * @api {delete} /api/category/:id Deletes Category based on provided Id
 * @apiVersion 1.0.0
 * @apiName DeleteCategories
 * @apiGroup Categories
 * @apiPermission token
 * @apiParam {integer} id The ID is passed in the URL
 * @apiSuccess {Integer} count Number of Records Deleted
 */

function deleteCategory(req, res) {
  Categories.remove(req.params.id)
    .then(count => res.json(count))
    .catch(err => res.status(500).json(err));
}

categoryRouter
  .get('/', restricted, allCategories)
  .post('/', restricted, addCategory)
  .put('/:id', restricted, updateCategory)
  .delete('/:id', restricted, deleteCategory);

module.exports = categoryRouter;
