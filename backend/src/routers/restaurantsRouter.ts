import express from 'express'
import type {Router} from 'express'
import {postRestaurantsController,getRestaurantsController,getRestaurantsNearController} from '../controllers/restaurantsController'

const router:Router=express.Router()

router.post('/',postRestaurantsController)
router.get('/',getRestaurantsController)
router.get('/near',getRestaurantsNearController)

export default router