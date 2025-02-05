import * as servicios from "../services/productos.service.js";
import * as vistas from "../views/views.productos.js";
import upload from "../middleware/multer.middleware.js"; // Importa el middleware de multer

const getDeporte = (req, res) => {
    servicios.getDeporte()
        .then((productos) => res.send(vistas.CrearPagina("Productos", vistas.ListaDeProductos(productos))))
}

const getDeporteId = (req, res) => {
    const id = req.params.id;
    servicios.getDeporteId(id)
        .then((producto) => {
            console.log(producto);
            res.send(vistas.CrearPagina("Producto", vistas.CrearDetalle(producto)))
        })
        .catch(error => console.log(error))
}

const formDeporteNueva = (req, res) => {
    Promise.all([
        servicios.getUbicacionesUnicos(),
        servicios.getCategoriasUnicas()
    ])
    .then(([ubicaciones, categorias]) => {
        res.send(vistas.CrearPagina("Nueva Deporte", vistas.nuevaDeporte(ubicaciones, categorias)));
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error al cargar las ubicaciónes o categorías");
    });
};

const agregarDeporte = (req, res) => {
    // Usa el middleware multer para manejar la carga de imagen
    upload.single('img')(req, res, (err) => {
        if (err) {
            return res.status(500).send("Error al cargar la imagen: " + err.message);
        }

        const deporte = req.body;
        // Si hay una imagen, asigna el nombre del archivo a la propiedad 'img'
        if (req.file) {
            deporte.img = req.file.filename;
        }

        if (!Array.isArray(deporte.location)) {
            deporte.location = [deporte.location];
        }

        // Agregar el deporte a la base de datos
        servicios.agregarDeporte(deporte)
            .then(() => res.redirect("/productos"))
            .catch((error) => {
                console.error(error);
                res.status(500).send("Error al agregar el deporte");
            });
    });
}

const FormModificarDeporte = (req, res) => {
    const id = req.params.id;

    Promise.all([
        servicios.getDeporteId(id),
        servicios.getUbicacionesUnicos(),
        servicios.getCategoriasUnicas()
    ])
    .then(([Deporte, ubicaciones, categorias]) => {
        // Devolver un JSON con los datos del deporte, ubicaciones y categorías
        res.json({ deporte: Deporte, ubicaciones, categorias });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error al cargar la Deporte, las ubicaciones o las categorías");
    });
};

const modificarDeporte = (req, res) => {
    const id = req.params.id;
    let deporte = req.body;

    if (!Array.isArray(deporte.location)) {
        deporte.location = [deporte.location];
    }

    servicios.modificarDeporte(id, deporte)
        .then(() => res.redirect("/productos"))
        .catch(err => res.status(500).send("Error al modificar la Deporte."));
};

const eliminarDeporte = (req, res) => {
    const id = req.params.id;
    servicios.borrarProducto(id)
        .then(() => res.redirect("/productos"))
}

const filtrarPorCategoria = async (req, res) => {
    const category = req.params.category;
    try {
        const productos = await servicios.getDeporte({ category });
        res.send(vistas.CrearPagina("Productos Filtrados", vistas.ListaDeProductos(productos)));
    } catch (error) {
        res.status(500).send("Error al filtrar por categoría");
    }
};

const filtrarPorUbicacion = async (req, res) => {
    const ubicacion = req.params.ubicacion;
    try {
        const productos = await servicios.getDeporte({ location: ubicacion });
        res.send(vistas.CrearPagina("Productos Filtrados", vistas.ListaDeProductos(productos)));
    } catch (error) {
        res.status(500).send("Error al filtrar por ubicacion");
    }
};

export { 
    getDeporte,
    getDeporteId,
    formDeporteNueva,
    agregarDeporte,
    FormModificarDeporte,
    modificarDeporte,
    eliminarDeporte,
    filtrarPorCategoria,
    filtrarPorUbicacion
}
