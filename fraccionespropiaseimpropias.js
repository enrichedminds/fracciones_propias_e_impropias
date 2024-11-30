function visualizeFraction() {
    const visualization = document.getElementById('visualization');
    const denominator = parseInt(document.getElementById('denominator').value, 10);
    const numerator = parseInt(document.getElementById('numerator').value, 10);
    const type = document.getElementById('division-type').value;

    visualization.innerHTML = ''; // Limpiar visualización previa

    // Cálculos
    const wholeParts = Math.floor(numerator / denominator); // Cociente: partes completas
    const remaining = numerator % denominator; // Resto: fracción propia

    // Verificar si la fracción supera el límite de 6 enteros
    if (wholeParts > 6) {
        const fractionMessage = document.getElementById('fraction-message');
        fractionMessage.innerHTML = `
            La fracción representada es 
            <div class="fraction">
                <div class="numerator">${numerator}</div>
                <div class="denominator">${denominator}</div>
            </div>
            <br>
            <span style="color: red;">Nota: Solo se representan hasta 6 rectángulos enteros. Favor de disminuir el entero del numerador.</span>`;
        return; // No dibujar nada si excede el límite
    }

    // Dibujar hasta 6 rectángulos enteros
    for (let i = 0; i < wholeParts; i++) {
        const container = createRectangle(denominator, denominator, type); // 1 entero
        visualization.appendChild(container);
    }

    // Dibujar fracción propia si hay un resto
    if (remaining > 0) {
        const container = createRectangle(remaining, denominator, type); // Fracción propia
        visualization.appendChild(container);
    }

    // Construir el mensaje principal si no excede el límite
    const fractionMessage = document.getElementById('fraction-message');
    fractionMessage.innerHTML = `
        La fracción representada es 
        <div class="fraction">
            <div class="numerator">${numerator}</div>
            <div class="denominator">${denominator}</div>
        </div>
        <br>
        Esto incluye ${wholeParts} ${wholeParts === 1 ? "rectángulo entero" : "rectángulos enteros"}${
        remaining > 0
            ? ` y un último rectángulo representado por la fracción propia <span class="fraction-inline"><div class="numerator">${remaining}</div><div class="denominator">${denominator}</div></span>`
            : ''
    }`;
}

function createRectangle(coloredParts, totalParts, type) {
    const container = document.createElement('div');
    container.classList.add('rectangle-container');
    container.style.display = 'grid';
    container.style.width = '400px';
    container.style.height = '200px';
    container.style.border = '2px solid black';

    if (type === 'rows') {
        container.style.gridTemplateColumns = '1fr'; // Una columna
        container.style.gridTemplateRows = `repeat(${totalParts}, 1fr)`; // Divisiones iguales en filas
    } else if (type === 'columns') {
        container.style.gridTemplateRows = '1fr'; // Una fila
        container.style.gridTemplateColumns = `repeat(${totalParts}, 1fr)`; // Divisiones iguales en columnas
    }

    // Crear segmentos
    for (let i = 0; i < totalParts; i++) {
        const segment = document.createElement('div');
        segment.classList.add('segment');

        // Colorear según la cantidad especificada
        if (i < coloredParts) {
            segment.style.backgroundColor = '#008cff'; // Coloreado
        } else {
            segment.style.backgroundColor = '#fff'; // Blanco
        }

        container.appendChild(segment);
    }

    return container;
}

// Mostrar visualización inicial con valores predeterminados (3/2)
window.onload = () => {
    document.getElementById('denominator').value = 2; // Predeterminar denominador
    document.getElementById('numerator').value = 3; // Predeterminar numerador
    visualizeFraction();
};