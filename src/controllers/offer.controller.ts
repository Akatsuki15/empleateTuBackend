import {Response, Request, NextFunction} from 'express'
import { OfferService } from '../services/offer.service'

export class OfferController{
    static async getById(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.body.offer
            const user = await OfferService.getById(id)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const offer = await OfferService.getAll()
            res.status(200).json(offer)
        }catch(error){
            next(error)
        }
    }
    
    static async save(req: Request, res: Response, next: NextFunction){
        try {
            const offerData = req.body
                //TODO validar el body
                const newOffer = await OfferService.save(offerData)
            res.status(200).json({message:'Offer save successfully', newOffer})
        } catch (error) {
            next(error)
        }
    }
}