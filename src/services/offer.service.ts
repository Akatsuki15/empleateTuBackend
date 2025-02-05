import { prisma } from "../database/database"
import { HttpException } from "../exceptions/httpException";
import { Offer } from "@prisma/client";



export class OfferService {
    static async getById(id: number){
        const findOffer = await prisma.offer.findUnique(
            { where: {id}}
        )
        if(!findOffer) throw new HttpException(404, 'Offer not found')
        
        return findOffer
    }

    //localhost:3000/api/offer/?title=dam
    static async getAll(title: string = ''){
        const offers = await prisma.offer.findMany({
            where: title ? {
                title: {
                    contains: title
                }
            } : {},
            orderBy: {
                createdAt: 'desc'
            },
            take: 100
        })

        return offers
    }

    static async create(idUser: number, offer: Offer){
        //guardar la oferta en la bd
        return await prisma.offer.create({
            data:{
                ...offer,
                idUserCreator: idUser
            }
        })
    }

    static async update(id: number, offer: Offer){
        const findOffer = prisma.offer.findUnique({where: {id}})
        if(!findOffer) throw new HttpException(404, 'Offer doesnt exist')
        return await prisma.offer.update({
            where: {id},
            data:{
                ...offer
            }
        })
    }

    static async delete(id: number){
        return prisma.offer.delete({where: {id}})
    }

    static async rate(idUser: number, idOffer: number, value: number){
        const findOffer = prisma.offer.findUnique({where: {id: idOffer}})
        if(!findOffer) throw new HttpException(404, 'Offer not exists')

        if(value < 0 || value > 5) throw new HttpException(400, 'Rate value must be between 0 and 5')
        await prisma.rates.upsert({
            where: {
                idUser_idOffer:{
                    idUser, idOffer
                }
            },
            update: {
                value
            },
            create: {
                idUser, idOffer, value
            }
        })
    }

    static async getRate(idOffer: number){
        const ratingStats = await prisma.rates.aggregate({
            where: { idOffer },
            _avg: { value: true},
            _count: { value: true}
        })

        return {
            totalRatings: ratingStats._count.value,
            averateRatings: ratingStats._avg.value?.toFixed(2)
        }
    }

    static async getMyRate(idUser: number, idOffer: number){
        const findOffer = prisma.offer.findUnique({where: {id: idOffer}})
        if(!findOffer) throw new HttpException(404, 'Offer not exists')

        await prisma.rates.findUnique({
            where: {
                idUser_idOffer:{
                    idUser, idOffer
                }
            },
            select: {value: true}
        })
    }
}