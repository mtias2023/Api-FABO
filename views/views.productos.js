function ListaDeProductos(productos) {
    let html = "";
    html += "<div class='container my-5'>";
    html += "<h1 class='text-center text-info my-4 fw-bold'>Bienvenidos a FABO</h1>";
    html += "<div class='d-flex justify-content-between align-items-center mb-3'>";
    html += "<a class='btn btn-info text-white px-4 py-2' href='/producto/nuevo'>+ Nuevo Partido</a>";
    html += "</div>";
    
    html += "<div class='row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4'>";

    productos.forEach(producto => {
        html += "<div class='col'>";
        html += "<div class='card h-100 shadow-sm border-0' style='border-radius: 10px; overflow: hidden; transition: transform 0.3s;'>";
        
        html += "<img class='card-img-top img-fluid' src='/img/" + producto.img + "' alt='" + producto.name + "' style='height: 250px; object-fit: cover; filter: brightness(0.9); transition: filter 0.3s;'>";

        html += "<div class='card-body'>";
        html += "<h5 class='card-title fs-5 fw-bold text-center'>" + producto.name + "</h5>";
    
        html += "<p class='fs-6 text-info mb-1 text-start'>" + producto.category + "</p>";
        html += "<p class='text-muted mb-1 text-start'>" + (Array.isArray(producto.location) ? producto.location.join(', ') : producto.location) + "</p>";
    
        html += "<p class='fw-bold fs-3 text-primary text-center'>$ " + producto.price + "</p>";
        html += "</div>";

        html += "<div class='card-footer d-flex flex-column gap-2'>";
        html += "<a class='btn btn-outline-info w-100' href='/productos/" + producto._id + "'>Ver Detalle</a>";
        html += `<button class='btn btn-outline-primary w-100' data-bs-toggle='modal' data-bs-target='#joinModal${producto._id}'>Unite</button>`;
        html += "</div>";

        html += "</div>";
        html += "</div>";

        // Modal para confirmar la unión
        html += `
            <div class="modal fade" id="joinModal${producto._id}" tabindex="-1" aria-labelledby="joinModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title" id="joinModalLabel">Confirmación de Unión</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>! Te has unido al partido exitosamente ¡ </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary ms-3 w-15" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    html += "</div>";
    html += "</div>";
    return html;
}

function CrearPagina(titulo, contenido) {
    return `
    <!DOCTYPE html>
    <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
           
            <style>
                .card-img-top {
                    height: auto;
                    max-height: 400px; 
                    object-fit: cover;
                }
                .navbar {
                    background-color: #e9ecef; 
                    width: 100%; 
                }
                .footer {
                    background-color: #0dcaf0; 
                    padding: 20px;
                    color: white;
                }   
                .footer a {
                    color: white;
                    text-decoration: underline;
                }
                .navbar {
                    padding: 15px 25px;
                    font-family: 'Arial', sans-serif;
                } 
            </style>
            <title>FABO</title>
        </head>
        <body>
            <header class='text-center mb-4'>
                <nav class="navbar navbar-expand-lg navbar-dark ">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/productos""><img src="/img/logo.png" alt="FABO Logo" style="width: 110px; display: block; margin: auto;" /></a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse " id="navbarSupportedContent">
                            <ul class="navbar-nav ms-auto ">
                                <li class="nav-item "><a class="nav-link text-dark" href="/productos" >Todos los Partidos</a></li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categorías</a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="/productos">Todo</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="/categoria/fútbol">Fútbol</a></li>
                                        <li><a class="dropdown-item" href="/categoria/básquet">Basquet</a></li>
                                        <li><a class="dropdown-item" href="/categoria/tenis">Tenis</a></li>
                                        <li><a class="dropdown-item" href="/categoria/pádel">Padel</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Ubicaciones</a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item " href="/productos">Todos</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="/location/Belgrano">Belgrano</a></li>
                                        <li><a class="dropdown-item" href="/location/Caballito">Caballito</a></li>
                                        <li><a class="dropdown-item" href="/location/Flores">Flores</a></li>
                                        <li><a class="dropdown-item" href="/location/La Boca">La Boca</a></li>
                                        <li><a class="dropdown-item" href="/location/La Paternal">La Paternal</a></li>
                                        <li><a class="dropdown-item" href="/location/Liniers">Liniers</a></li>
                                        <li><a class="dropdown-item" href="/location/Palermo">Palermo</a></li>
                                        <li><a class="dropdown-item" href="/location/Retiro">Retiro</a></li>
                                        <li><a class="dropdown-item" href="/location/San Telmo">San Telmo</a></li>
                                        <li><a class="dropdown-item" href="/location/Villa Crespo">Villa Crespo</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <div class="container">
                    ${contenido}
                </div>
            </main>
            <footer class='footer text-light text-center mt-3'>
                <p>&copy; 2024 FABO - Todos los derechos reservados.</p>
            </footer>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </body>
    </html>
    `;
}

function CrearDetalle(producto) {
    return `
       <div class="container my-5 d-flex flex-column align-items-center" style="max-width: 600px;">
            <div class="card w-100" style="border: none; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); border-radius: 10px;">
                
                <!-- Botón de "Atrás" dentro de la tarjeta, alineado al inicio -->
                <div class="d-flex justify-content-start p-3">
                    <a class="btn btn-outline-secondary" href="/productos" style="font-size: 0.9rem;">
                        <i class="bi bi-arrow-left-circle"></i> Atrás
                    </a>
                </div>
                
                <!-- Título del producto centrado -->
                <h2 class="text-center fw-bold text-info mb-4">${producto.name}</h2>
                
                <!-- Imagen centrada dentro de la tarjeta -->
                <img class="card-img-top mx-auto" src="../img/${producto.img}" alt="${producto.name}" style="width: 80%; max-height: 250px; object-fit: cover; border-radius: 8px;">
                
                <!-- Contenido de la tarjeta -->
                <div class="card-body text-center">
                    <h5 class="card-title fs-2 fw-bold text-dark">${producto.name}</h5>
                    
                    <!-- Categoría y Ubicación con un tamaño de texto mayor -->
                    <p class="fs-5 text-info mb-1 text-start">${producto.category}</p>
                    <p class="text-muted fs-5 text-start">${producto.location.join(', ')}</p>
                    
                    <hr class="my-4" style="border: 1px solid #007bff;">
                    
                    <!-- Precio centrado -->
                    <p class="fw-bold fs-1 text-primary mb-4">$${producto.price}</p>
                    
                    <!-- Descripción alineada a la izquierda -->
                    <p class="card-text fs-5 text-secondary text-start">${producto.description}</p>
                </div>
                
                <!-- Botones "Editar" y "Eliminar" en el pie de la tarjeta -->
                <div class="card-footer text-center">
                    <div class="d-flex justify-content-between">
                        <a class="btn btn-outline-warning w-45" href="../producto/modificar/${producto._id}">
                            <i class="bi bi-pencil-square"></i> Editar
                        </a>
                        <a class="btn btn-outline-danger w-45" href="../producto/eliminar/${producto._id}">
                            <i class="bi bi-trash"></i> Eliminar
                        </a>
                    </div>
                </div>
            </div>
       </div>
    `;
}

function nuevaDeporte(ubicaciones, categorias) {
    return `
        <div class='container mb-3'>
            <h2 class="text-info fw-bold">Agregar Nuevo Partido</h2>
            <div class="row mb-5 d-flex justify-content-center align-items-center">
                <form action="/producto/nuevo" method="POST" class="row">
                    <div class="col-md-12 mb-3">
                        <label for="img" class="form-label fw-bold">Imagen del Partido</label>
                        <input class='form-control mb-3' type="file" name="img" id="img">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="name" class="form-label">Nombre del Partido</label>
                        <input class='form-control mb-3' type="text" name="name" placeholder="Nombre del Partido:">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="price" class="form-label">Precio del Partido</label>
                        <input class='form-control mb-3' type="number" name="price" placeholder="Precio del Partido:">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="location" class="form-label">Ubicaciones</label>
                        <div class="row ms-1"> 
                        ${ubicaciones.map(ubicacion => `
                            <div class="form-check col-md-2 col-4">
                                <input class="form-check-input" type="checkbox" name="location" value="${ubicacion}" id="${ubicacion}">
                                <label class="form-check-label" for="${ubicacion}">
                                    ${ubicacion}
                                </label>
                            </div>
                        `).join('')}
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="category" class="form-label">Categoría</label>
                        <select class="form-control mb-3" name="category" id="category">
                            ${categorias.map(categoria => `
                                <option value="${categoria}">${categoria}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="description" class="form-label">Descripción del Partido</label>
                        <textarea class="form-control" name="description" id="description" rows="3"></textarea>
                    </div>
                    <div class="container d-flex">
                        <button type="submit" class='btn btn-info text-white'>Agregar Partido</button>
                        <a href="/productos" class='btn btn-outline-secondary ms-3 w-15'>Atrás</a>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function modificarDeporte(deporte, ubicaciones, categorias) {
    return `
    <div class='container mb-3'>
        <h2 class="text-info my-4 fw-bold">Modificar Deporte</h2>
        <form action="../../producto/modificar/${deporte._id}" method="POST" class="row">
            <div class="col-md-6 mb-3">
                <label for="name" class="form-label fw-bold">Nombre del Deporte</label>
                <input class='form-control mb-3' value="${deporte.name}" type="text" name="name" placeholder="Nombre">
            </div>
            <div class="col-md-6 mb-3">
                <label for="price" class="form-label fw-bold">Precio del Deporte</label>
                <input class='form-control mb-3' value="${deporte.price}" type="number" name="price" placeholder="Precio">
            </div>
            <div class="col-md-6 mb-3">
                <label for="img" class="form-label fw-bold">Imagen del Deporte</label>
                <input class='form-control mb-3' value="${deporte.img}" type="file" name="img" id="img">
                <div class="card mx-auto w-50">
                    <img class='card-img-top rounded' src='../../img/${deporte.img}' alt='${deporte.name}' style='height: 200px; object-fit: cover;'>
                </div>
            </div>
             <div class="col-md-6 mb-3">
                <label for="description" class="form-label fw-bold">Descripción del Deporte</label>
                <textarea class="form-control" name="description" id="description" rows="3">${deporte.description}</textarea>
                <label for="category" class="form-label fw-bold mt-3">Categoría</label>
                <select class="form-control" name="category" id="category">
                    ${categorias.map(categoria => `
                        <option value="${categoria}" ${deporte.category === categoria ? "selected" : ""}>${categoria}</option>
                    `).join('')}
                </select>
                <label for="location" class="form-label fw-bold mt-3">Ubicación</label>
                <div class="row ms-1">
                    ${ubicaciones.map(ubicacion => `
                        <div class="form-check col-md-2 col-3 me-1">
                            <input class="form-check-input" type="checkbox" name="location" value="${ubicacion}" id="${ubicacion}" 
                            ${deporte.location.includes(ubicacion) ? "checked" : ""}>
                            <label class="form-check-label" for="${ubicacion}">
                                ${ubicacion}
                            </label>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="mb-3">
            </div>

            <div class="container d-flex">
                <button type="submit" class='btn btn-info text-white ms-3 w-15'>Modificar</button>
                <a href="/productos" class='btn btn-outline-secondary ms-3 w-15'>Atrás</a>
            </div>
        </form>
    </div>
    `;
}

export {
    CrearPagina, ListaDeProductos, CrearDetalle, nuevaDeporte, modificarDeporte
}
