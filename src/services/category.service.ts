import { prisma } from "../database/database"
import { HttpException } from "../exceptions/httpException";
import { Category, Offer } from "@prisma/client";



export class CategoryService {
    static async getById(id: number){
        const findCategory = await prisma.category.findUnique(
            { where: {id}}
        )
        if(!findCategory) throw new HttpException(404, 'Offer not found')
        
        return findCategory
    }

    static async getAll(name: string = ''){
        const categories = await prisma.category.findMany({
            where: name ? {
                name: {
                    contains: name
                }
            } : {},
            orderBy: {
                createdAt: 'desc'
            },
            take: 100
        })

        return categories
    }

    static async create(category: Category){
        //guardar la oferta en la bd
        return await prisma.category.create({
            data:{
                ...category
            }
        })
    }

    static async update(id: number, category: Category){
        const findCategory = prisma.category.findUnique({where: {id}})
        if(!findCategory) throw new HttpException(404, 'Offer doesnt exist')
        return await prisma.category.update({
            where: {id},
            data:{
                ...category
            }
        })
    }

    static async delete(id: number){
        return prisma.category.delete({where: {id}})
    }
    
}