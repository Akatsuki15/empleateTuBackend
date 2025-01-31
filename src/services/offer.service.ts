import { HttpException } from "../exceptions/httpException";
import { Offer, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export class OfferService {
    static async getById(id: number){
        const findOffer = await prisma.offer.findUnique(
            { where: {id}}
        )
        if(!findOffer) throw new HttpException(404, 'User not found')
        
        return findOffer
    }

    static async getAll(){
        const offers = await prisma.offer.findMany()
        return offers
    }

    static async save(offer: Offer){

    }
}