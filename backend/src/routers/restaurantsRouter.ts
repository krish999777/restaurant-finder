import express from 'express'
import type {Router} from 'express'
import {postRestaurantsController,getRestaurantsController,getRestaurantsNearController} from '../controllers/restaurantsController'
import {postRatingController} from '../controllers/ratingController'
import {getEachRestaurant} from '../controllers/getEachRestauarant'

const router:Router=express.Router()

router.post('/',postRestaurantsController)
router.get('/',getRestaurantsController)
router.get('/near',getRestaurantsNearController)
router.post('/:id/rating',postRatingController)
router.get('/:id',getEachRestaurant)

export default router