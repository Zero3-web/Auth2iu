document.getElementById('link-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const frase = document.getElementById('frase').value.trim();
    const mensajeSi = document.getElementById('mensaje_si').value.trim();
    const textoSi = document.getElementById('texto_si').value.trim();
    const textoNo = document.getElementById('texto_no').value.trim();
    const baseUrl = 'https://zero3-web.github.io/Quieres_ser_mi___/';
    const params = new URLSearchParams();
    params.set('frase', frase);
    params.set('mensaje_si', mensajeSi);
    params.set('texto_si', textoSi);
    params.set('texto_no', textoNo);
    const link = baseUrl + '?' + params.toString();

    document.getElementById('link-generado').value = link;
    document.getElementById('resultado').style.display = 'flex';
    document.getElementById('copiado').style.display = 'none';

    // Oculta el área de acortador (ya no se usa)
    const acortadorArea = document.getElementById('acortador-area');
    if (acortadorArea) acortadorArea.style.display = 'none';
});

document.getElementById('copiar-btn').addEventListener('click', function() {
    const linkInput = document.getElementById('link-generado');
    linkInput.select();
    linkInput.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.getElementById('copiado').style.display = 'inline';
});

// Elimina el listener del botón de copiar acortado (ya no se usa)
