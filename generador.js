document.getElementById('link-form').addEventListener('submit', async function(e) {
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

    // Oculta el área de acortador mientras carga
    const acortadorArea = document.getElementById('acortador-area');
    acortadorArea.style.display = 'none';
    document.getElementById('copiado-acortado').style.display = 'none';

    // Llama a TinyURL API para acortar el link
    try {
        const resp = await fetch('https://api.tinyurl.com/create', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                // Puedes obtener una API Key gratuita en tinyurl.com/app/dev
                // Si no tienes key, usa la API pública: https://tinyurl.com/api-create.php?url=
                // 'Authorization': 'dpelkDKxwJy3hQx2foEhnquO3zaV84ttQBUtZDozU95bSVelKSQFZz0AgT6J'
            },
            body: JSON.stringify({
                url: link
            })
        });
        let shortUrl = '';
        if (resp.ok) {
            const data = await resp.json();
            shortUrl = data.data?.tiny_url || '';
        } else {
            // Si falla, usa la API pública (sin key)
            const fallback = await fetch('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(link));
            shortUrl = await fallback.text();
        }
        if (shortUrl) {
            document.getElementById('link-acortado').value = shortUrl;
            acortadorArea.style.display = 'flex';
        }
    } catch (err) {
        // Si hay error, no muestra el área de acortador
        acortadorArea.style.display = 'none';
    }
});

document.getElementById('copiar-btn').addEventListener('click', function() {
    const linkInput = document.getElementById('link-generado');
    linkInput.select();
    linkInput.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.getElementById('copiado').style.display = 'inline';
});

document.getElementById('copiar-acortado-btn').addEventListener('click', function() {
    const linkInput = document.getElementById('link-acortado');
    linkInput.select();
    linkInput.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.getElementById('copiado-acortado').style.display = 'inline';
});
