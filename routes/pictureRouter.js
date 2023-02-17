const express = require('express')
const router = express.Router()
const upload = require('../config/multer')
const pictureController = require('../controllers/pictureController')

router.post('/', upload.single('file'), pictureController.create)
router.get('/', pictureController.findAll)
router.delete('/:id', pictureController.delete)

module.exports = router