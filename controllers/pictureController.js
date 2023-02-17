const Picture = require('../models/picture')
const fs = require('fs')

exports.create = async (req, res) => {
    try {

        const { name } = req.body
        const file = req.file

        const picture = new Picture({
            name,
            source: file.path,
        })

        await picture.save()

        res.json({ picture, message: 'Imagem salva com sucesso' })

    } catch(e) {
        console.log(e)
    }
}

exports.findAll = async (_req, res) => {
    try {

        const pictures = await Picture.find()

        res.json(pictures)

    } catch(e) {
        console.log(e)
    }
}

exports.delete = async (req, res) => {
    try {

        const picture = await Picture.findById(req.params.id)

        if(!picture) {
            return res.status(404).json({ message: 'Imagem não encontrada' })
        }

        fs.unlinkSync(picture.source)

        await picture.remove()

        res.json({ message: 'Imagem removida com sucesso' })

    } catch(e) {
        console.log(e)
    }
}