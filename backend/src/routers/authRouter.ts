import express from 'express'
import type {Router} from 'express'
import {signupController} from '../controllers/signupController.js'
import {loginController} from '../controllers/loginController.js'

const router:Router=express.Router()

router.post('/signup',signupController)
router.post('/login',loginController)

export default router