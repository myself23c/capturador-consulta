const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    // Iniciar el navegador con debugging remoto habilitado
    const browser = await puppeteer.launch({
        headless: false, // Para ver el navegador
        args: ['--remote-debugging-port=9222',    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    // Opcional: si existen problemas con sandboxing en kernel antiguos:
    '--disable-seccomp-filter-sandbox'] // Puerto para depuración remota
    });

    // Guardar la URL de conexión WebSocket en un archivo
    const wsEndpoint = browser.wsEndpoint();
    fs.writeFileSync('browser_connection.txt', wsEndpoint);

    console.log('Navegador abierto. Conéctate con otro script usando este WebSocket endpoint.');
})();


//await page.goto('https://sinba.salud.gob.mx/SIS-SEUL/04_Campeche');