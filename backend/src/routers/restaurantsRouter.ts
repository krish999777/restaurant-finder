import express from 'express'
import type {Router} from 'express'
import {postRestaurantsController,getRestaurantsController} from '../controllers/restaurantsController'

const router:Router=express.Router()

router.post('/',postRestaurantsController)
router.get('/',getRestaurantsController)

export default router