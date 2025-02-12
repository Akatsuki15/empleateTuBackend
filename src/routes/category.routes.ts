import { Router } from "express";
import { OfferController } from "../controllers/offer.controller";
import { isAuthenticate } from "@/middlewares/auth.middleware";
import { isAdmin } from "@/middlewares/isAdmin.middleware";
import { categoryValidation } from "@/middlewares/validators.middleware";
import { ValidationMiddleware } from "@/middlewares/validation.middleware";
import { CategoryController } from "@/controllers/category.controller";


const router = Router()

//GET Listar todas las ofertas localhost:3000/api/offerts/
router.get('/', isAuthenticate, CategoryController.getAll)
router.get('/:id', isAuthenticate, CategoryController.getById)
//POST Añadir una oferta nueva localhost:3000/api/offerts/  {body}
router.post('/', isAuthenticate, isAdmin, categoryValidation, ValidationMiddleware, CategoryController.create)
//DELETE Borrar una oferta localhost:3000/api/offerts/XXXX
router.delete('/:id', OfferController.delete)
//PUT Modificar una oferta localhost:3000/api/offerts/XXXXXX  {body}
router.put('/:id', OfferController.update)

export default router