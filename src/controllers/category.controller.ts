import {Response, Request, NextFunction} from 'express'
import { OfferService } from '../services/offer.service'

export class OfferController{
    static async getById(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number.parseInt(req.params.id)
            const offer = await OfferService.getById(id)
            res.status(200).json(offer)
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
    
    static async create(req: Request, res: Response, next: NextFunction){
        try {
            const offerData = req.body
            const idUser = 1
                //TODO validar el body
                const newOffer = await OfferService.create(idUser, offerData)
            res.status(200).json({message:'Offer save successfully', newOffer})
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction){
        try {
            const offerData = req.body
            const id = Number.parseInt(req.params.id)
            
            const updateOffer = await OfferService.update(id, offerData)
            res.status(200).json({message:'Offer save successfully', updateOffer})
        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number.parseInt(req.params.id)
            
            const deletedOffer = await OfferService.delete(id)
            res.status(200).json({message:'Offer save successfully', deletedOffer})
        } catch (error) {
            next(error)
        }
    }

    static async rate(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number.parseInt(req.params.id)
            const {value} = req.body
            const userId = req.body.user.id
            
            await OfferService.rate(userId, id, value)
            res.status(200).json({message:'Offer rate successfully'})
        } catch (error) {
            next(error)
        }
    }

    static async getRate(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number.parseInt(req.params.id)
            
            const Offer = await OfferService.getRate(id)
            res.status(200).json({message:'Offer rate successfully', Offer})
        } catch (error) {
            next(error)
        }
    }

    static async getMyRate(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number.parseInt(req.params.id)
            const idUser = req.body.user.id
            
            const Offer = await OfferService.getMyRate(idUser, id)
            res.status(200).json({message:'Offer rate successfully', Offer})
        } catch (error) {
            next(error)
        }
    }
}