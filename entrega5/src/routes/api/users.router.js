import { Router } from 'express'
import {usersModel} from'../../daos/models/users.models.js'

const router = Router()

router.get('/', async (req, res) => {
    const users = await usersModel.find({})
    res.send({status: 'success', payload: users})
})

router.post('/', async (req, res) => {
    const { body } = req 
    const result = await usersModel.create(body)
    res.send({status:'success', payload: result})
})


router.get('/:uid', async (req, res) => {
    const {uid} = req.params
    const userFound = await usersModel.findByOne({_id: uid})

    res.send({status:'success', payload: userFound})
})


router.put('/:uid', (req, res) => {
    res.send('update Users')
})
router.delete('/:uid', (req, res) => {
    res.send('delete Users')
})

export default router