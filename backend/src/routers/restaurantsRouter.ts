import express from 'express'
import type {Router} from 'express'
import {postRestaurantsController,getRestaurantsController,getRestaurantsNearController} from '../controllers/restaurantsController'
import {postRatingController} from '../controllers/ratingController'

const router:Router=express.Router()

router.post('/',postRestaurantsController)
router.get('/',getRestaurantsController)
router.get('/near',getRestaurantsNearController)
router.post('/:id/rating',postRatingController)

export default router