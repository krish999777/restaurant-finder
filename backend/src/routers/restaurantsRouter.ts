import express from 'express'
import type {Router} from 'express'
import {postRestaurantsController} from '../controllers/postRestaurantsController'

const router:Router=express.Router()

router.post('/',postRestaurantsController)

export default router