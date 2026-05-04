import express from 'express'
import type {Router} from 'express'
import {postRestaurantsController,getRestaurantsController,getRestaurantsNearController} from '../controllers/restaurantsController'
import {postRatingController} from '../controllers/ratingController'
import {getEachRestaurant,putEachRestaurant,deleteEachRestaurant} from '../controllers/eachRestauarantController'

const router:Router=express.Router()

router.post('/',postRestaurantsController)
router.get('/',getRestaurantsController)
router.get('/near',getRestaurantsNearController)
router.post('/:id/rating',postRatingController)
router.get('/:id',getEachRestaurant)
router.put('/:id',putEachRestaurant)
router.delete("/:id",deleteEachRestaurant)

export default router