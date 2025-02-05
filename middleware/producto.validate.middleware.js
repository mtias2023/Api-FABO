import { productSchema } from "../schemas/producto.schema.js"

export async function validateProduct(req, res, next){
    try{
        const datosValidos = await productSchema.validate( req.body, { abortEarly: false, stripUnknown: true  } )
        req.body = datosValidos
        next()
    } catch (error ) {
        res.status( 400 ).json( { message: error.errors } )
    }
    
}