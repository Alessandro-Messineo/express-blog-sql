// importo express
const express = require("express");

// settiamo il router
const router = express.Router();

// importo il controller
const postController = require('../controllers/postController');

// index
router.get('/', postController.index);

// show
router.get('/:id', postController.show);

// store
router.post('/', postController.store);

// update
router.put('/:id', postController.update);

// destroy
router.delete('/:id', postController.destroy);

// esporto router
module.exports = router;