import { Router } from "express";
import { OfferController } from "../controllers/offer.controller";


const router = Router()

//GET Listar todas las ofertas localhost:3000/api/offerts/
router.get('/', OfferController.getAll)
router.get('/:id', OfferController.getById)
//POST Añadir una oferta nueva localhost:3000/api/offerts/  {body}
router.post('/', OfferController.save)
//DELETE Borrar una oferta localhost:3000/api/offerts/XXXX
//router.delete('/:id', OfferController.delete)
//PUT Modificar una oferta localhost:3000/api/offerts/XXXXXX  {body}
//router.put('/:id', OfferController.update)

//Calificamos una oferta x  {body}
//router.post('/:id/rate/', OfferController.rate)
// Vemos que calificacion (total) se le ha dado a una oferta
//router.get('/:id/rate/', OfferController.getRate)

export default router