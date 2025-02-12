import { Router } from "express";
import { OfferController } from "../controllers/offer.controller";
import { isAuthenticate } from "../middlewares/auth.middleware";
import { offerValidation, rateValidation } from "@/middlewares/validators.middleware";
import { isAdmin } from "@/middlewares/isAdmin.middleware";
import { ValidationMiddleware } from "@/middlewares/validation.middleware";


const router = Router()

//GET Listar todas las ofertas localhost:3000/api/offerts/
router.get('/', isAuthenticate, OfferController.getAll)
router.get('/:id', isAuthenticate, OfferController.getById)
//POST Añadir una oferta nueva localhost:3000/api/offerts/  {body}
router.post('/', isAuthenticate, isAdmin, offerValidation, ValidationMiddleware, OfferController.create)
//DELETE Borrar una oferta localhost:3000/api/offerts/XXXX
router.delete('/:id', isAuthenticate, isAdmin, OfferController.delete)
//PUT Modificar una oferta localhost:3000/api/offerts/XXXXXX  {body}
router.put('/:id', isAuthenticate, isAdmin, offerValidation, ValidationMiddleware, OfferController.update)

//Calificamos una oferta x  {body}
router.post('/:id/rate/', isAuthenticate, rateValidation, ValidationMiddleware, OfferController.rate)
// Vemos que calificacion (total) se le ha dado a una oferta
router.get('/:id/rate/', isAuthenticate, OfferController.getRate)
router.get('/:id/myRate/', isAuthenticate, OfferController.getMyRate)

export default router