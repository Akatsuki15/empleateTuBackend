import {Response, Request, NextFunction} from 'express'
import { CategoryService } from '@/services/category.service'

export class CategoryController{
    static async getById(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number.parseInt(req.params.id)
            const category = await CategoryService.getById(id)
            res.status(200).json(category)
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const category = await CategoryService.getAll()
            res.status(200).json(category)
        }catch(error){
            next(error)
        }
    }
    
    static async create(req: Request, res: Response, next: NextFunction){
        try {
            const categoryData = req.body
                //TODO validar el body
                const newCategory = await CategoryService.create(categoryData)
            res.status(200).json({message:'Category create successfully', newCategory})
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction){
        try {
            const categoryData = req.body
            const id = Number.parseInt(req.params.id)
            
            const updateCategory = await CategoryService.update(id, categoryData)
            res.status(200).json({message:'Category save successfully', updateCategory})
        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number.parseInt(req.params.id)
            
            const deletedCategory = await CategoryService.delete(id)
            res.status(200).json({message:'Category delete successfully', deletedCategory})
        } catch (error) {
            next(error)
        }
    }
}