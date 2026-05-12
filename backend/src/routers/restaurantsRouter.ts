import express from 'express'
import type {Router} from 'express'
import {postRestaurantsController,getRestaurantsController,getRestaurantsNearController} from '../controllers/restaurantsController.js'
import {postRatingController} from '../controllers/ratingController.js'
import {getEachRestaurant,putEachRestaurant,deleteEachRestaurant} from '../controllers/eachRestauarantController.js'
import isAdmin from '../middleware/isAdmin.js'

const router:Router=express.Router()

router.post('/',isAdmin,postRestaurantsController)
router.get('/',getRestaurantsController)
router.get('/near',getRestaurantsNearController)
router.post('/:id/rating',postRatingController)
router.get('/:id',getEachRestaurant)
router.put('/:id',isAdmin,putEachRestaurant)
router.delete("/:id",isAdmin,deleteEachRestaurant)

export default router