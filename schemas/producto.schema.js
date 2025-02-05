import yup from 'yup'

export const productSchema = yup.object({
    name: yup.string().required("El nombre del producto es obligatorio."),
    description: yup.string().min(2, "La descripción debe tener al menos 2 caracteres.").max(30, "La descripción no puede tener más de 30 caracteres."),
    price: yup.number().positive("El precio debe ser un número positivo.").required("El precio es obligatorio."),
    img: yup.string().url("La imagen debe ser una URL válida.").required("La imagen es obligatoria."),
    location: yup.array().of(yup.string().required()).required("La ubicación es obligatoria."),
    category: yup.string().required("La categoría es obligatoria."),
});
