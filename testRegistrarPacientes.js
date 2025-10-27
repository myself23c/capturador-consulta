const puppeteer = require('puppeteer'); // v22.0.0 or later
const fss = require('fs');
const fs = require('fs').promises;
const readline = require('readline');

async function establecerConeccion (){
    const wsEndpoint = fss.readFileSync('browser_connection.txt', 'utf8');

    // Conectarse al navegador ya abierto
    const browser = await puppeteer.connect({ browserWSEndpoint: wsEndpoint });

    // Abrir una nueva página o usar las ya existentes
    const pages = await browser.pages();
    const page = pages.length > 0 ? pages[0] : await browser.newPage();

    //await page.goto('https://sinba.salud.gob.mx/SIS-SEUL/04_Campeche');
    //console.log('Conectado al navegador existente y navegando a https://example.com');
    return {pages,page}
}


async function menu_datos_generales_paciente_presionar_boton_datos_del_paciente (page)  {

    // Presionar el botón de datos del paciente del menu
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1365,
            height: 911
        })
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#label_paciente'),
            frame.locator('::-p-xpath(//*[@id=\\"label_paciente\\"])'),
            frame.locator(':scope >>> #label_paciente'),
            frame.locator('::-p-text(Seleccione un Paciente)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 83.515625,
                y: 9.15625,
              },
            });
    }
    console.log('Botón de datos del paciente presionado exitosamente.');

}



async function capturarConsulta(paciente) {
  const fecha_consulta = formatearFecha(paciente.fecha_consulta);
  const { pages, page } = await establecerConeccion();


  console.log(`Iniciando captura de consulta para el paciente: ${paciente.nombres} ${paciente.apellido_paterno} ${paciente.apellido_materno}`);
  console.log("============bloque de busqueda de paciente iniciado============");
  // --- Bloque de búsqueda de datos del paciente ---
  await menu_datos_generales_paciente_presionar_boton_datos_del_paciente(page);
  await menu_buscar_paciente_presionar_boton_buscar_paciente(page);
  await menu_buscar_paciente_presionar_formulario_buscar_por_nombre(page);
  await menu_buscar_paciente_relleno_nombre_fecha_de_nacimiento(
    page,
    paciente.nombres,
    paciente.apellido_paterno,
    paciente.apellido_materno,
    paciente.fecha_de_nacimiento
  );

}


async function menu_buscar_paciente_presionar_boton_buscar_paciente (page)  {

    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1365,
            height: 911
        })
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('::-p-aria( Buscar Paciente)'),
            frame.locator('#bt_buscar_paciente'),
            frame.locator('::-p-xpath(//*[@id=\\"bt_buscar_paciente\\"])'),
            frame.locator(':scope >>> #bt_buscar_paciente')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 71.640625,
                y: 25.125,
              },
            });
    }

    console.log('Botón de buscar paciente presionado exitosamente.');
 
}




async function menu_buscar_paciente_presionar_boton_buscar (page)  {

    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1365,
            height: 911
        })
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('::-p-aria(Buscar)'),
            frame.locator('#modal_buscar_paciente button.primary'),
            frame.locator('::-p-xpath(//*[@id=\\"modal_buscar_paciente\\"]/div[3]/button[1])'),
            frame.locator(':scope >>> #modal_buscar_paciente button.primary')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 84.0625,
                y: 16.734375,
              },
            });
    }
    console.log('Botón de buscar paciente presionado exitosamente.');
}


async function menu_buscar_paciente_presionar_sobre_curp (page, pacienteCurp)  {

    const curp = pacienteCurp

    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1365,
            height: 911
        })
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#curp_paciente_busqueda'),
            frame.locator('::-p-xpath(//*[@id=\\"curp_paciente_busqueda\\"])'),
            frame.locator(':scope >>> #curp_paciente_busqueda')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 117.5,
                y: 15.625,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#curp_paciente_busqueda'),
            frame.locator('::-p-xpath(//*[@id=\\"curp_paciente_busqueda\\"])'),
            frame.locator(':scope >>> #curp_paciente_busqueda')
        ])
            .setTimeout(timeout)
            .fill(curp);
    }

    console.log(`Curp del paciente ${curp} ingresada exitosamente.`);

}




async function menu_buscar_paciente_presionar_formulario_buscar_por_nombre (page)  {

    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1365,
            height: 911
        })
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#modal_buscar_paciente div > div:nth-of-type(1) > div > div:nth-of-type(2) label'),
            frame.locator('::-p-xpath(//*[@id=\\"form_buscar_paciente\\"]/div/div[1]/div/div[2]/div/label)'),
            frame.locator(':scope >>> #modal_buscar_paciente div > div:nth-of-type(1) > div > div:nth-of-type(2) label')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 7.5625,
                y: 6.546875,
              },
            });
    }

    console.log('Formulario de búsqueda por nombre presionado exitosamente.');

}




async function menu_buscar_paciente_relleno_nombre_fecha_de_nacimiento (page,pacienteNombres,pacienteApellidoPaterno,pacienteApellidoMaterno,pacienteFechaDeNacimiento)  {


    //hay que haber presionar primero el boton de buscar paciente por nombre para poder acceder a este campo

    const nombres = pacienteNombres;
    const apellidoPaterno = pacienteApellidoPaterno;  
    const apellidoMaterno = pacienteApellidoMaterno;
    const fechaDeNacimiento = pacienteFechaDeNacimiento; // Formato: 'DD/MM/YYYY'

    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1365,
            height: 911
        })
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#nombre_paciente_busqueda'),
            frame.locator('::-p-xpath(//*[@id=\\"nombre_paciente_busqueda\\"])'),
            frame.locator(':scope >>> #nombre_paciente_busqueda')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 102.5,
                y: 10.5,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#nombre_paciente_busqueda'),
            frame.locator('::-p-xpath(//*[@id=\\"nombre_paciente_busqueda\\"])'),
            frame.locator(':scope >>> #nombre_paciente_busqueda')
        ])
            .setTimeout(timeout)
            .fill(nombres);

            console.log(`Nombre del paciente ${nombres} ingresado exitosamente.`);
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#primer_apellido_paciente_busqueda'),
            frame.locator('::-p-xpath(//*[@id=\\"primer_apellido_paciente_busqueda\\"])'),
            frame.locator(':scope >>> #primer_apellido_paciente_busqueda')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 43.5,
                y: 16.5,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#primer_apellido_paciente_busqueda'),
            frame.locator('::-p-xpath(//*[@id=\\"primer_apellido_paciente_busqueda\\"])'),
            frame.locator(':scope >>> #primer_apellido_paciente_busqueda')
        ])
            .setTimeout(timeout)
            .fill(apellidoPaterno);
        console.log(`Primer apellido del paciente ${apellidoPaterno} ingresado exitosamente.`);
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#segundo_apellido_paciente_busqueda'),
            frame.locator('::-p-xpath(//*[@id=\\"segundo_apellido_paciente_busqueda\\"])'),
            frame.locator(':scope >>> #segundo_apellido_paciente_busqueda')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 72.5,
                y: 12.5,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#segundo_apellido_paciente_busqueda'),
            frame.locator('::-p-xpath(//*[@id=\\"segundo_apellido_paciente_busqueda\\"])'),
            frame.locator(':scope >>> #segundo_apellido_paciente_busqueda')
        ])
            .setTimeout(timeout)
            .fill(apellidoMaterno);
        console.log(`Segundo apellido del paciente ${apellidoMaterno} ingresado exitosamente.`);
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#fecha_nacimiento_busqueda'),
            frame.locator('::-p-xpath(//*[@id=\\"fecha_nacimiento_busqueda\\"])'),
            frame.locator(':scope >>> #fecha_nacimiento_busqueda')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 83.5,
                y: 20.390625,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#fecha_nacimiento_busqueda'),
            frame.locator('::-p-xpath(//*[@id=\\"fecha_nacimiento_busqueda\\"])'),
            frame.locator(':scope >>> #fecha_nacimiento_busqueda')
        ])
            .setTimeout(timeout)
            .fill('15');
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await targetPage.keyboard.down('/');
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await targetPage.keyboard.up('/');
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#fecha_nacimiento_busqueda'),
            frame.locator('::-p-xpath(//*[@id=\\"fecha_nacimiento_busqueda\\"])'),
            frame.locator(':scope >>> #fecha_nacimiento_busqueda')
        ])
            .setTimeout(timeout)
            .fill('15/06');
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await targetPage.keyboard.down('/');
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await targetPage.keyboard.up('/');
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#fecha_nacimiento_busqueda'),
            frame.locator('::-p-xpath(//*[@id=\\"fecha_nacimiento_busqueda\\"])'),
            frame.locator(':scope >>> #fecha_nacimiento_busqueda')
        ])
            .setTimeout(timeout)
            .fill(fechaDeNacimiento);
            console.log(`Fecha de nacimiento del paciente ${fechaDeNacimiento} ingresada exitosamente.`);
    }

   console.log('rellenado del formulador de buscar paciente por nombre terminado correctamente.');

}



async function menu_buscar_paciente_presionar_boton_buscar (page)  {

    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1365,
            height: 911
        })
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('::-p-aria(Buscar)'),
            frame.locator('#modal_buscar_paciente button.primary'),
            frame.locator('::-p-xpath(//*[@id=\\"modal_buscar_paciente\\"]/div[3]/button[1])'),
            frame.locator(':scope >>> #modal_buscar_paciente button.primary')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 84.0625,
                y: 16.734375,
              },
            });
    }
    console.log('Botón de buscar paciente presionado exitosamente.');
}


async function menu_buscar_paciente_presionar_sobre_curp (page, pacienteCurp)  {

    const curp = pacienteCurp

    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1365,
            height: 911
        })
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#curp_paciente_busqueda'),
            frame.locator('::-p-xpath(//*[@id=\\"curp_paciente_busqueda\\"])'),
            frame.locator(':scope >>> #curp_paciente_busqueda')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 117.5,
                y: 15.625,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#curp_paciente_busqueda'),
            frame.locator('::-p-xpath(//*[@id=\\"curp_paciente_busqueda\\"])'),
            frame.locator(':scope >>> #curp_paciente_busqueda')
        ])
            .setTimeout(timeout)
            .fill(curp);
    }

    console.log(`Curp del paciente ${curp} ingresada exitosamente.`);

}

/*

async function menu_buscar_paciente_presionar_sobre_paciente_encontrado (page) {

    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1365,
            height: 911
        })
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('::-p-aria(CAMPECHE)'),
            frame.locator('div.scroll td:nth-of-type(6)'),
            frame.locator('::-p-xpath(//*[@id=\\"contenido_buscar_paciente\\"]/tr/td[6])'),
            frame.locator(':scope >>> div.scroll td:nth-of-type(6)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 76.53125,
                y: 14.171875,
              },
            });
    }

   console.log('Paciente encontrado presionado exitosamente y presionado sobre el paciente encontrado.');

}

*/


// Puppeteer >= v21 con Locator API
async function menu_buscar_paciente_presionar_sobre_paciente_encontrado(page) {
  const timeout = 5000; // per-operation, no global
  try {
    // Asegura viewport si lo necesitas (opcional)
    await page.setViewport({ width: 1365, height: 911 });

    // Localiza el frame donde está la tabla
    let frame = page.mainFrame().childFrames()[0];
    if (!frame) {
      // Si no hay childFrame aún, espera a que aparezca alguno razonable
      await page.waitForFunction(() => window.frames.length > 0, { timeout });
      frame = page.mainFrame().childFrames()[0];
    }
    if (!frame) {
      console.warn('No se encontró el frame del buscador de pacientes.');
      return false;
    }

    // Selector estable de la celda/fila del paciente
    // Ajusta a tu DOM real (mejor usar un selector semántico/atributo único)
    const selector = 'div.scroll td:nth-of-type(6)';

    // Espera que aparezca el resultado
    const cellHandle = await frame.waitForSelector(selector, { timeout });
    if (!cellHandle) {
      console.log('No hay resultados de paciente visibles.');
      return false;
    }

    // Click + espera de navegación si el click cambia de vista
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0', timeout }).catch(() => { /* puede no navegar */ }),
      cellHandle.click({ offset: { x: 4, y: 4 } }) // evita depender de offsets grandes
    ]);

    console.log('Paciente encontrado y seleccionado correctamente.');
    return true;

  } catch (err) {
    const msg = String(err?.message || '');
    // Muchos UIs disparan navegación y tiran alguno de estos errores: considéralos éxito.
    if (
      msg.includes('Navigation') ||
      msg.includes('Execution context was destroyed') ||
      msg.includes('Target closed') ||
      msg.includes('Cannot find context')
    ) {
      console.log('Selección de paciente con navegación/recarga (tratado como éxito).');
      return true;
    }

    console.error('Error al seleccionar paciente:', err);
    return false;
  }
}






async function menu_datos_generales_paciente_asignar_numero_de_expediente(page, pacienteNumeroExpediente)  {

    const numero_de_expediente = pacienteNumeroExpediente;

    if (!numero_de_expediente){
        console.warn('No se proporcionó un número de expediente. Saliendo de la función.');
        return;
    }else{console.log(`Número de expediente proporcionado: ${numero_de_expediente}`);}


    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1365,
            height: 911
        })
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#numeroExpediente'),
            frame.locator('::-p-xpath(//*[@id=\\"numeroExpediente\\"])'),
            frame.locator(':scope >>> #numeroExpediente')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 69.5,
                y: 13.9375,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#numeroExpediente'),
            frame.locator('::-p-xpath(//*[@id=\\"numeroExpediente\\"])'),
            frame.locator(':scope >>> #numeroExpediente')
        ])
            .setTimeout(timeout)
            .fill(numero_de_expediente);
    }

    console.log(`Número de expediente del paciente ${numero_de_expediente} ingresado exitosamente.`);

}





async function  presionar_boton_registrar_paciente(page)  {

    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1365,
            height: 911
        })
    }

    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('::-p-aria(Registrar nuevo)'),
            frame.locator('#bt_registrar_nuevo'),
            frame.locator('::-p-xpath(//*[@id=\\"bt_registrar_nuevo\\"])'),
            frame.locator(':scope >>> #bt_registrar_nuevo')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 64.234375,
                y: 27.28125,
              },
            });
    }
    console.log(`boton presionar registro nuevo paciente presinado correctamente.`);
}



async function poner_curp_registrar_paciente(page,pacienteCurp) {



    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1365,
            height: 945
        })
    }

    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#curpPaciente'),
            frame.locator('::-p-xpath(//*[@id=\\"curpPaciente\\"])'),
            frame.locator(':scope >>> #curpPaciente')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 133.5,
                y: 20.671875,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#curpPaciente'),
            frame.locator('::-p-xpath(//*[@id=\\"curpPaciente\\"])'),
            frame.locator(':scope >>> #curpPaciente')
        ])
            .setTimeout(timeout)
            .fill('XXQEPWEOWIEUQUWe');
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#modal_datos_paciente div.omitir-espacios'),
            frame.locator('::-p-xpath(//*[@id=\\"form_datos_paciente\\"]/div/div[1]/div[1])'),
            frame.locator(':scope >>> #modal_datos_paciente div.omitir-espacios')
        ])
            .setTimeout(timeout)
            .click({
              delay: 768,
              offset: {
                x: 15.5,
                y: 30.140625,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#curpPaciente'),
            frame.locator('::-p-xpath(//*[@id=\\"curpPaciente\\"])'),
            frame.locator(':scope >>> #curpPaciente')
        ])
            .setTimeout(timeout)
            .fill(pacienteCurp);
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('body'),
            frame.locator('::-p-xpath(/html/body)'),
            frame.locator(':scope >>> body')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 714,
                y: 565,
              },
            });
    }
    console.log(`Curp del paciente ${pacienteCurp} ingresada exitosamente en el formulario de registrar paciente.`);

}





async function menu_datos_generales_paciente_asignar_hombre(page) {
  const timeout = 5000;
  page.setDefaultTimeout(timeout);

  try {
    // Ajuste de viewport
    await page.setViewport({
      width: 1365,
      height: 911
    });

    // Primer click (icono)
    {
      const frame = page.mainFrame().childFrames()[0];
      await puppeteer.Locator.race([
        frame.locator('div:nth-of-type(4) > div.required i'),
        frame.locator('::-p-xpath(//*[@id="form_datos_paciente"]/div/div[4]/div[4]/div/i)'),
        frame.locator(':scope >>> div:nth-of-type(4) > div.required i')
      ])
        .setTimeout(timeout)
        .click({
          offset: { x: 6.4375, y: 10.546875 }
        });
    }

    // Segundo click (opción del menú)
    {
      const frame = page.mainFrame().childFrames()[0];
      await puppeteer.Locator.race([
        frame.locator('div:nth-of-type(4) > div.required div.menu > div:nth-of-type(2)'),
        frame.locator('::-p-xpath(//*[@id="form_datos_paciente"]/div/div[4]/div[4]/div/div[2]/div[2])'),
        frame.locator(':scope >>> div:nth-of-type(4) > div.required div.menu > div:nth-of-type(2)')
      ])
        .setTimeout(timeout)
        .click({
          offset: { x: 104.5, y: 13.65625 }
        });
    }

  } catch (err) {
    // Si falla algo dentro del try, no hacemos nada
    // Se puede agreg ar un console.warn(err) aquí si quieres
    console.warn('Error al asignar género masculino:', err);
  }
}




async function menu_datos_generales_paciente_asignar_mujer(page) {
  const timeout = 5000;
  page.setDefaultTimeout(timeout);

  try {
    // Ajuste de viewport
    await page.setViewport({
      width: 1365,
      height: 911
    });

    // Primer click (icono)
    {
      const frame = page.mainFrame().childFrames()[0];
      await puppeteer.Locator.race([
        frame.locator('div:nth-of-type(4) > div.required i'),
        frame.locator('::-p-xpath(//*[@id="form_datos_paciente"]/div/div[4]/div[4]/div/i)'),
        frame.locator(':scope >>> div:nth-of-type(4) > div.required i')
      ])
        .setTimeout(timeout)
        .click({
          offset: { x: 6.4375, y: 14.546875 }
        });
    }

    // Segundo click (opción del menú para “mujer”)
    {
      const frame = page.mainFrame().childFrames()[0];
      await puppeteer.Locator.race([
        frame.locator('div:nth-of-type(4) > div.required div:nth-of-type(3)'),
        frame.locator('::-p-xpath(//*[@id="form_datos_paciente"]/div/div[4]/div[4]/div/div[2]/div[3])'),
        frame.locator(':scope >>> div:nth-of-type(4) > div.required div:nth-of-type(3)')
      ])
        .setTimeout(timeout)
        .click({
          offset: { x: 83.5, y: 12.453125 }
        });
    }

  } catch (err) {
    // Si falla algo, se ignora el error y no interrumpe funciones posteriores
    console.warn('Error al asignar género femenino:', err);
  }
}


async function menu_datos_generales_paciente_intentar_asignar_otro_genero(page, pacienteSexo) {
    const sexo = pacienteSexo.toLowerCase();

    if (sexo === 'h') {    
        await menu_datos_generales_paciente_asignar_hombre(page);
        console.log('Género masculino asignado exitosamente.');
    }else{  
        await menu_datos_generales_paciente_asignar_mujer(page);
        console.log('Género femenino asignado exitosamente.');
    }

    
}


// v23.0.0 or later

async function asignar_derecho_habiencia (page)  {

    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1365,
            height: 945
        })
    }

    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#form_derechohabiencia i'),
            frame.locator('::-p-xpath(//*[@id=\\"form_derechohabiencia\\"]/div/div/div/div/i)'),
            frame.locator(':scope >>> #form_derechohabiencia i')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 7.4375,
                y: 15.125,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#form_derechohabiencia div.selected'),
            frame.locator('::-p-xpath(//*[@id=\\"form_derechohabiencia\\"]/div/div/div/div/div[2]/div[2])'),
            frame.locator(':scope >>> #form_derechohabiencia div.selected')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 234.5,
                y: 17.734375,
              },
            });
    }
    console.log('Derechohabiencia asignado exitosamente.');
}




async function menu_datos_generales_paciente_asignar_numero_de_expediente(page, pacienteNumeroExpediente)  {

    const numero_de_expediente = pacienteNumeroExpediente;

    if (!numero_de_expediente){
        console.warn('No se proporcionó un número de expediente. Saliendo de la función.');
        return;
    }else{console.log(`Número de expediente proporcionado: ${numero_de_expediente}`);}


    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1365,
            height: 911
        })
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#numeroExpediente'),
            frame.locator('::-p-xpath(//*[@id=\\"numeroExpediente\\"])'),
            frame.locator(':scope >>> #numeroExpediente')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 69.5,
                y: 13.9375,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#numeroExpediente'),
            frame.locator('::-p-xpath(//*[@id=\\"numeroExpediente\\"])'),
            frame.locator(':scope >>> #numeroExpediente')
        ])
            .setTimeout(timeout)
            .fill(numero_de_expediente);
    }

    console.log(`Número de expediente del paciente ${numero_de_expediente} ingresado exitosamente.`);

}




async function menu_datos_generales_presionar_boton_guardar(page)  {

    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1365,
            height: 911
        })
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('::-p-aria(Guardar)'),
            frame.locator('#modal_datos_paciente > div.actions > button.primary'),
            frame.locator('::-p-xpath(//*[@id=\\"modal_datos_paciente\\"]/div[3]/button[1])'),
            frame.locator(':scope >>> #modal_datos_paciente > div.actions > button.primary')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 61.375,
                y: 20.4375,
              },
            });
    }


    console.log('Botón de guardar datos del paciente presionado exitosamente.');
}







function formatearFecha(fechaConsulta) {
  // Separa la parte de fecha (antes del espacio) de la hora (si existe)
  const [soloFecha] = fechaConsulta.split(' ');
  // Dividimos por guiones para analizar las partes
  const partes = soloFecha.split('-');
  
  let dia, mes, anio;
  
  if (partes[0].length === 4) {
    // Si el primer elemento tiene 4 caracteres, asumimos que es "aaaa-mm-dd"
    [anio, mes, dia] = partes;
  } else {
    // En caso contrario, asumimos que viene como "dd-mm-aaaa"
    [dia, mes, anio] = partes;
  }
  
  return `${dia}/${mes}/${anio}`;
}





















const { readFile, writeFile } = require('fs').promises;

//--------------------------------------main ---------------------------------------------//
// === Helpers de validación CURP (mínima) ===
function normalizarTexto(t) {
  return (t || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim()
    .replace(/\s+/g, " ");
}

function primeraVocalInterna(str) {
  const s = normalizarTexto(str);
  const m = s.slice(1).match(/[AEIOU]/);
  return m ? m[0] : "X";
}

function primeras4ParaCurp(nombres, apPat, apMat) {
  const A1 = normalizarTexto(apPat).charAt(0) || "X";
  const A2 = primeraVocalInterna(apPat);
  const A3 = normalizarTexto(apMat).charAt(0) || "X";
  const N1 = normalizarTexto(nombres).split(" ")[0]?.charAt(0) || "X";
  return (A1 + A2 + A3 + N1).toUpperCase();
}

// Patrón básico (estructura general)
const REGEX_CURP_MIN = /^[A-Z][AEIOU][A-Z]{2}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;

function validarCurpBasica(paciente) {
  const curp = normalizarTexto(paciente.curp);
  if (curp.length !== 18) return { ok: false, motivo: "Longitud distinta de 18" };

  const primeras4Ok = curp.slice(0, 4) === primeras4ParaCurp(
    paciente.nombres,
    paciente.apellido_paterno,
    paciente.apellido_materno
  );
  if (!primeras4Ok) return { ok: false, motivo: "Las primeras 4 letras no coinciden con las iniciales mínimas" };

  if (!REGEX_CURP_MIN.test(curp)) return { ok: false, motivo: "Formato general inválido" };

  return { ok: true };
}

// ===============================================================
// capturarConsulta: devuelve true si queda registrado (o ya existía)
// ===============================================================
async function capturarConsulta(paciente) {
  // Validación previa de CURP
  const v = validarCurpBasica(paciente);
  if (!v.ok) {
    console.warn(`❌ CURP inválida: ${v.motivo}. No se registrará el paciente ${paciente.nombres}.`);
    return false;
  }

  const fecha_consulta = formatearFecha(paciente.fecha_consulta);
  const { pages, page } = await establecerConeccion();

  console.log(`Iniciando captura de consulta para el paciente: ${paciente.nombres} ${paciente.apellido_paterno} ${paciente.apellido_materno}`);
  console.log("============bloque de busqueda de paciente iniciado============");

  // --- Búsqueda de paciente ---
  await menu_datos_generales_paciente_presionar_boton_datos_del_paciente(page);
  await menu_buscar_paciente_presionar_boton_buscar_paciente(page);
  await menu_buscar_paciente_presionar_formulario_buscar_por_nombre(page);
  await menu_buscar_paciente_relleno_nombre_fecha_de_nacimiento(
    page,
    paciente.nombres,
    paciente.apellido_paterno,
    paciente.apellido_materno,
    paciente.fecha_de_nacimiento
  );
  await menu_buscar_paciente_presionar_boton_buscar(page);
  await new Promise(r => setTimeout(r, 5000));

  const yaExiste = await menu_buscar_paciente_presionar_sobre_paciente_encontrado(page);
  if (yaExiste) {
    console.log("✅ Paciente encontrado. No se registra uno nuevo.");
    return true; // Lo consideramos registrado para tu indicador
  }

  // --- Registro de paciente ---
  await new Promise(r => setTimeout(r, 5000));
  await presionar_boton_registrar_paciente(page);
  await new Promise(r => setTimeout(r, 5000));

  await poner_curp_registrar_paciente(page, paciente.curp);
  await new Promise(r => setTimeout(r, 5000));
  await menu_datos_generales_paciente_intentar_asignar_otro_genero(page, paciente.sexo);
  await asignar_derecho_habiencia(page);
  await menu_datos_generales_paciente_asignar_numero_de_expediente(page, paciente.numero_de_expediente);
  await new Promise(r => setTimeout(r, 1500));
  await menu_datos_generales_presionar_boton_guardar(page);

  await new Promise(r => setTimeout(r, 5000));

  console.log("✅ Registro de paciente finalizado.");
  return true;
}

/**
 * Lee la respuesta del usuario en consola (si/no).
 */
function preguntarUsuario(query) {
  return new Promise(resolve => {
    rl.question(query, answer => {
      resolve(answer.trim().toLowerCase());
    });
  });
}

// ===============================================================
// Función principal: SOLO maneja `registrado` (no toca `capturado`)
// ===============================================================
async function procesarPacientes() {
  const rlInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl = rlInterface;

  try {
    const data = await readFile('./pacientesParseados.json', 'utf-8');
    const pacientes = JSON.parse(data);

    console.log(`>>>>>Total de pacientes a procesar: ${pacientes.length}`);

    for (let i = 0; i < pacientes.length; i++) {
      const paciente = pacientes[i];

      // Si ya está registrado, saltar
      if (paciente.registrado === true) continue;

      try {
        const ok = await capturarConsulta(paciente);
        paciente.registrado = !!ok; // true si se registró o ya existía; false si CURP inválida

        await writeFile('./pacientesParseados.json', JSON.stringify(pacientes, null, 2), 'utf-8');

        if (ok) {
          console.log(`>>>>>>✅ Paciente ${i + 1}/${pacientes.length} registrado (o ya existente).`);
        } else {
          console.log(`>>>>>>⛔ Paciente ${i + 1}/${pacientes.length} NO registrado (CURP inválida u otra condición previa).`);
        }
      } catch (error) {
        console.error(`Error al registrar paciente #${i + 1}:`, error);
        const respuesta = await preguntarUsuario('¿Se registró el paciente? (si/no) ');

        paciente.registrado = (respuesta === 'si');

        if (!paciente.registrado) {
          console.log(`Paciente ${i + 1} marcado como NO registrado. Se continuará con el siguiente.`);
        }

        await writeFile('./pacientesParseados.json', JSON.stringify(pacientes, null, 2), 'utf-8');
      }
    }

    console.log('Proceso de registro finalizado.');
  } catch (err) {
    console.error('Error al procesar el archivo JSON:', err);
  } finally {
    rlInterface.close();
  }
}

// Iniciamos el proceso
procesarPacientes().catch(err => {
  console.error('Error inesperado durante el procesamiento:', err);
});

