const { Router } = require('express');
const CategoryController = require('./app/controllers/CategoryController');
const ContactController = require('./app/controllers/ContactController');

const router = Router();
router.get(
  '/contacts',
  (request, response, next) => {
    next();
  },
  (request, response) => {
    ContactController.index(request, response);
  },
);
router.get('/contacts/:id', (request, response) => {
  ContactController.show(request, response);
});

router.delete('/contacts/:id', (request, response) => {
  ContactController.delete(request, response);
});
router.post('/contacts', (request, response) => {
  ContactController.store(request, response);
});
router.put('/contacts/:id', (request, response) => {
  ContactController.update(request, response);
});

router.get('/categories', (request, response) => {
  CategoryController.index(request, response);
});

router.post('/categories', (request, response) => {
  CategoryController.store(request, response);
});

router.put('/categories/:id', (request, response) => {
  CategoryController.update(request, response);
});

router.get('/categories/:id', (request, response) => {
  CategoryController.show(request, response);
});

router.delete('/categories/:id', (request, response) => {
  CategoryController.delete(request, response);
});

module.exports = router;
