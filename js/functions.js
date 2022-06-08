window.addEventListener("load", function() {
    const miniaturas = document.querySelectorAll(".galeria a");
    const modal = document.querySelector(".modal");
    const imgModal = document.querySelector(".modal img");
    const botones = document.querySelectorAll(".modal a");
    let imgVisible = 0; // esta imagen representa la imagen Grande, es decir el indice dentro del sistema 
    let rutasImg = []; // guardar todas las rutas de las imagenes grandes

    function navegacionImg(direccion) {
        if (direccion == 0) {
            // atras
            imgVisible = imgVisible > 0 ? imgVisible - 1 : miniaturas.length - 1;
        } else {
            // adelante
            imgVisible = imgVisible < miniaturas.length - 1 ? imgVisible + 1 : 0;
        }

        imgModal.setAttribute("src", rutasImg[imgVisible]);
    }

    // abrir modal
    miniaturas.forEach(function(img, indice) {
        rutasImg.push(miniaturas[indice].getAttribute("href")); // aquí guardo todos los href una sola vez
        img.addEventListener("click", function(evento) {
            evento.preventDefault();
            imgVisible = indice; //con cada click asignamos el valor de la imagen actual segun el índice de la miniatura sobre la que hemos hecho click 
            imgModal.setAttribute("src", rutasImg[imgVisible]);
            modal.classList.add("visible");
        });
    });


    // cerrar modal
    modal.addEventListener("click", function() {
        modal.classList.remove("visible");
    });

    botones.forEach(function(flecha, indice) {
        flecha.addEventListener("click", function(evento) {
            evento.preventDefault();
            evento.stopPropagation(); // evita que se disparen los callbacks superiores
            if (indice == 0) {
                // atras
                imgVisible = imgVisible > 0 ? imgVisible - 1 : miniaturas.length - 1;
            } else {
                // adelante
                imgVisible = imgVisible < miniaturas.length - 1 ? imgVisible + 1 : 0;
            }

            imgModal.setAttribute("src", rutasImg[imgVisible]);

        });
    });

    // interacción con teclado
    window.addEventListener("keyup", function(evento) {
        switch (evento.keyCode) {
            case 27:
                modal.classList.remove("visible");
                break;
            case 37:
                navegacionImg(0);
                break;
            case 39:
                navegacionImg(1);
                break;
        }

    });

});