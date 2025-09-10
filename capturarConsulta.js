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



// inicia menu datos del paciente


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




async function menu_datos_generales_paciente_presionar_boton_cerrar_datos_del_paciente(page) {


    // Presionar el botón de cerrar datos del paciente
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
            frame.locator('::-p-aria(Cerrar)'),
            frame.locator('#modal_datos_paciente button.red'),
            frame.locator('::-p-xpath(//*[@id=\\"modal_datos_paciente\\"]/div[3]/button[2])'),
            frame.locator(':scope >>> #modal_datos_paciente button.red')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 47.203125,
                y: 16.140625,
              },
            });
    }
    console.log('Botón de cerrar datos del paciente presionado exitosamente.');

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



}



//termina menu datos del paciente

//menu buscar paciente



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


async function menu_buscar_paciente_presionar_boton_cancelar()  {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
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
            frame.locator('::-p-aria(Cancelar)'),
            frame.locator('#modal_buscar_paciente button.red'),
            frame.locator('::-p-xpath(//*[@id=\\"modal_buscar_paciente\\"]/div[3]/button[3])'),
            frame.locator(':scope >>> #modal_buscar_paciente button.red')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 44.921875,
                y: 17.734375,
              },
            });
    }

   console.log('Botón de cancelar buscar paciente presionado exitosamente.');

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

//termina menu buscar paciente




//menu rellenado de datos del paciente




async function menu_signos_vitales_fecha_consulta (page, pacienteFechaConsulta) {

    const fechaConsulta = pacienteFechaConsulta; // Formato: 'DD/MM/YYYY'

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
            frame.locator('#fechaConsulta'),
            frame.locator('::-p-xpath(//*[@id=\\"fechaConsulta\\"])'),
            frame.locator(':scope >>> #fechaConsulta')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 103.625,
                y: 10.90625,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#fechaConsulta'),
            frame.locator('::-p-xpath(//*[@id=\\"fechaConsulta\\"])'),
            frame.locator(':scope >>> #fechaConsulta')
        ])
            .setTimeout(timeout)
            .fill('25');
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
            frame.locator('#fechaConsulta'),
            frame.locator('::-p-xpath(//*[@id=\\"fechaConsulta\\"])'),
            frame.locator(':scope >>> #fechaConsulta')
        ])
            .setTimeout(timeout)
            .fill('25/05');
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
            frame.locator('#fechaConsulta'),
            frame.locator('::-p-xpath(//*[@id=\\"fechaConsulta\\"])'),
            frame.locator(':scope >>> #fechaConsulta')
        ])
            .setTimeout(timeout)
            .fill(fechaConsulta);
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await targetPage.keyboard.down('Enter');
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await targetPage.keyboard.up('Enter');
    }

    console.log(`Fecha de consulta del paciente ${fechaConsulta} ingresada exitosamente.`);

}




async function menu_signos_vitales_seleccionar_consulta_externa (page)  {

    const timeout = 15000;
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
            frame.locator('div.ocultar-titulos-acordeon > div:nth-of-type(4) i'),
            frame.locator('::-p-xpath(//*[@id=\\"form_servicio\\"]/div/div/div/div[1]/i)'),
            frame.locator(':scope >>> div.ocultar-titulos-acordeon > div:nth-of-type(4) i')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 4.75,
                y: 15.265625,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('div.ocultar-titulos-acordeon > div:nth-of-type(4) div.menu > div:nth-of-type(1)'),
            frame.locator('::-p-xpath(//*[@id=\\"form_servicio\\"]/div/div/div/div[1]/div[2]/div[1])'),
            frame.locator(':scope >>> div.ocultar-titulos-acordeon > div:nth-of-type(4) div.menu > div:nth-of-type(1)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 205.625,
                y: 10.578125,
              },
            });
    }
    console.log('Consulta externa seleccionada exitosamente.');
 
}


async function parsearTensionArterial(tensionArterial){
    let tension = tensionArterial.split("/")
    let tensionArterialSistolica = tension[0]
    let tensionArterialDiastolica = tension[1]

    return {tensionArterialSistolica, tensionArterialDiastolica}
}


async function parsearTalla (talla){
    let tallaParseada = talla * 100
    //let tallaString = talla.toString() 
    //return tallaString.replace(".", "");
    return tallaParseada.toString()
}


async function menu_signos_vitales_rellenado_signos_vitales(page,pacienteFrecuenciaCardiaca,pacienteFrecuenciaRespiratoria,pacienteTemperatura,pacientePeso,pacienteTalla,pacienteTensionArterial)  {

    const {tensionArterialSistolica, tensionArterialDiastolica} = await parsearTensionArterial(pacienteTensionArterial);
    const tallaParseada = await parsearTalla(pacienteTalla);

    const fc = pacienteFrecuenciaCardiaca;
    const fr = pacienteFrecuenciaRespiratoria;
    const temperatura = pacienteTemperatura;
    const peso = pacientePeso;
    const talla = tallaParseada;    
    const presionSistolica = tensionArterialSistolica;
    const presionDiastolica = tensionArterialDiastolica;


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
            frame.locator('#peso'),
            frame.locator('::-p-xpath(//*[@id=\\"peso\\"])'),
            frame.locator(':scope >>> #peso')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 70.625,
                y: 13.125,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#peso'),
            frame.locator('::-p-xpath(//*[@id=\\"peso\\"])'),
            frame.locator(':scope >>> #peso')
        ])
            .setTimeout(timeout)
            .fill(peso);
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#talla'),
            frame.locator('::-p-xpath(//*[@id=\\"talla\\"])'),
            frame.locator(':scope >>> #talla')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 89.625,
                y: 16.125,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#talla'),
            frame.locator('::-p-xpath(//*[@id=\\"talla\\"])'),
            frame.locator(':scope >>> #talla')
        ])
            .setTimeout(timeout)
            .fill(talla);
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#presionSistolica'),
            frame.locator('::-p-xpath(//*[@id=\\"presionSistolica\\"])'),
            frame.locator(':scope >>> #presionSistolica')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 48,
                y: 18.015625,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#presionSistolica'),
            frame.locator('::-p-xpath(//*[@id=\\"presionSistolica\\"])'),
            frame.locator(':scope >>> #presionSistolica')
        ])
            .setTimeout(timeout)
            .fill(tensionArterialSistolica);
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#presionDiastolica'),
            frame.locator('::-p-xpath(//*[@id=\\"presionDiastolica\\"])'),
            frame.locator(':scope >>> #presionDiastolica')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 38,
                y: 15.015625,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#presionDiastolica'),
            frame.locator('::-p-xpath(//*[@id=\\"presionDiastolica\\"])'),
            frame.locator(':scope >>> #presionDiastolica')
        ])
            .setTimeout(timeout)
            .fill(tensionArterialDiastolica);
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#frecuenciaCardiaca'),
            frame.locator('::-p-xpath(//*[@id=\\"frecuenciaCardiaca\\"])'),
            frame.locator(':scope >>> #frecuenciaCardiaca')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 63.1875,
                y: 8.015625,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#frecuenciaCardiaca'),
            frame.locator('::-p-xpath(//*[@id=\\"frecuenciaCardiaca\\"])'),
            frame.locator(':scope >>> #frecuenciaCardiaca')
        ])
            .setTimeout(timeout)
            .fill(fc);
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#frecuenciaRespiratoria'),
            frame.locator('::-p-xpath(//*[@id=\\"frecuenciaRespiratoria\\"])'),
            frame.locator(':scope >>> #frecuenciaRespiratoria')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 15.1875,
                y: 17.015625,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#frecuenciaRespiratoria'),
            frame.locator('::-p-xpath(//*[@id=\\"frecuenciaRespiratoria\\"])'),
            frame.locator(':scope >>> #frecuenciaRespiratoria')
        ])
            .setTimeout(timeout)
            .fill(fr);
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#temperatura'),
            frame.locator('::-p-xpath(//*[@id=\\"temperatura\\"])'),
            frame.locator(':scope >>> #temperatura')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 63.625,
                y: 10.5625,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#temperatura'),
            frame.locator('::-p-xpath(//*[@id=\\"temperatura\\"])'),
            frame.locator(':scope >>> #temperatura')
        ])
            .setTimeout(timeout)
            .fill(temperatura);
    }

    console.log('Signos vitales del paciente rellenados exitosamente.');


}


//termina funcion menu rellenado de datos del paciente


//menu primera vez y modalidad




async function menu_modalidad_primera_vez_ano (page, pacientePrimeraVezAno)  {

    console.log("valorando si el paciente es primera vez en el año");
    if (pacientePrimeraVezAno !== "si") {
        console.log("El paciente no es primera vez en el año, no se rellenará el campo se cancela ejecucion de la funcion");
        return;
    }

    console.log("El paciente es primera vez en el año, se rellenará el campo");

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
            frame.locator('div:nth-of-type(6) div.seccion-form > div:nth-of-type(1) > div > div:nth-of-type(1) label'),
            frame.locator('::-p-xpath(//*[@id=\\"form_otros_datos\\"]/div/div[3]/div[1]/div/div[1]/div/label)'),
            frame.locator(':scope >>> div:nth-of-type(6) div.seccion-form > div:nth-of-type(1) > div > div:nth-of-type(1) label'),
            frame.locator('::-p-text(Primera vez en el)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 7.625,
                y: 9.5625,
              },
            });
    }

    console.log('Formulario de primera vez en el año presionado exitosamente.');

}





async function modalidad_primera_vez(page)  {

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
            frame.locator('#form_consulta > div > div:nth-of-type(1) i'),
            frame.locator('::-p-xpath(//*[@id=\\"form_consulta\\"]/div/div[1]/div/div/i)'),
            frame.locator(':scope >>> #form_consulta > div > div:nth-of-type(1) i')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 12.75,
                y: 6.109375,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#form_consulta > div > div:nth-of-type(1) div.menu > div:nth-of-type(1)'),
            frame.locator('::-p-xpath(//*[@id=\\"form_consulta\\"]/div/div[1]/div/div/div[2]/div[1])'),
            frame.locator(':scope >>> #form_consulta > div > div:nth-of-type(1) div.menu > div:nth-of-type(1)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 99.625,
                y: 15.421875,
              },
            });
    }


}



async function modalidad_subsecuente (page) {


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
            frame.locator('#form_consulta > div > div:nth-of-type(1) i'),
            frame.locator('::-p-xpath(//*[@id=\\"form_consulta\\"]/div/div[1]/div/div/i)'),
            frame.locator(':scope >>> #form_consulta > div > div:nth-of-type(1) i')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 13.75,
                y: 12.109375,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#form_consulta > div > div:nth-of-type(1) div.menu > div:nth-of-type(2)'),
            frame.locator('::-p-xpath(//*[@id=\\"form_consulta\\"]/div/div[1]/div/div/div[2]/div[2])'),
            frame.locator(':scope >>> #form_consulta > div > div:nth-of-type(1) div.menu > div:nth-of-type(2)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 107.625,
                y: 14.21875,
              },
            });
    }



}


async function menu_modalidad_relacion_temporal (page, pacienteRelacionTemporal)  {
    console.log("valorando si el paciente es primera vez en la relacion temporal");
    if (pacienteRelacionTemporal === "primera-vez") { await modalidad_primera_vez(page);
        console.log("El paciente es primera vez en la relacion temporal, se rellena el campo");
         return; }
    else {await modalidad_subsecuente(page);
         console.log("El paciente no es primera vez en la relacion temporal, se cancela ejecucion de la funcion");
          return;
        }

}





//termina menu primera vez y modalidad

//utilidades para rellenar diagnosticos
async function scrollPage(page) {


    // Desplaza 1000 píxeles hacia abajo
    await page.evaluate(() => {
        window.scrollBy(0, 500);
    });

    // Opcionalmente, espera un tiempo para ver el scroll
    

    // Cierra el navegador

}


async function menu_diagnosticos_primer_diagnostico (page, pacienteDiagnostico)  {

    const diagnostico = pacienteDiagnostico;

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
            frame.locator('#descripcionDiagnostico1'),
            frame.locator('::-p-xpath(//*[@id=\\"descripcionDiagnostico1\\"])'),
            frame.locator(':scope >>> #descripcionDiagnostico1')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 225.625,
                y: 23.828125,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#descripcionDiagnostico1'),
            frame.locator('::-p-xpath(//*[@id=\\"descripcionDiagnostico1\\"])'),
            frame.locator(':scope >>> #descripcionDiagnostico1')
        ])
            .setTimeout(timeout)
            .fill(diagnostico);
    }

    console.log(`Diagnóstico del paciente ${diagnostico} ingresado exitosamente.`);

}


// termina utilidades para rellenar diagnosticos




//inicia bloque de  promocion de la salud



async function menu_promocion_salud_linea_de_vida(page, pacienteLineaVida)  {


    if (pacienteLineaVida !== "si") {
        console.log("El paciente no tiene linea de vida, no se rellenará el campo se cancela ejecucion de la funcion"); return }
    else {
        console.log("El paciente tiene linea de vida, se rellenará el campo");}

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
            frame.locator('div:nth-of-type(18) div:nth-of-type(1) > div.grid > div > div:nth-of-type(2) label'),
            frame.locator('::-p-xpath(//*[@id=\\"form_promocion_salud\\"]/div[1]/div[2]/div/div[2]/div/label)'),
            frame.locator(':scope >>> div:nth-of-type(18) div:nth-of-type(1) > div.grid > div > div:nth-of-type(2) label'),
            frame.locator('::-p-text(Consulta integrada)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 13.8125,
                y: 8.515625,
              },
            });
    }

    console.log('Formulario de linea de vida presionado exitosamente.');

}




async function menu_promocion_salud_presenta_cartilla(page, pacientePresentaCartilla)  {


    if (pacientePresentaCartilla !== "sipresenta") {
        console.log("El paciente no presenta cartilla, no se rellenará el campo se cancela ejecucion de la funcion");
        return;
    }else {
        console.log("El paciente presenta cartilla, se rellenará el campo");
    }


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
            frame.locator('div:nth-of-type(18) div:nth-of-type(3) label'),
            frame.locator('::-p-xpath(//*[@id=\\"form_promocion_salud\\"]/div[1]/div[2]/div/div[3]/div/label)'),
            frame.locator(':scope >>> div:nth-of-type(18) div:nth-of-type(3) label'),
            frame.locator('::-p-text(Presenta cartilla)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 10,
                y: 9.515625,
              },
            });
    }

    console.log('Formulario de presenta cartilla presionado exitosamente.');

}



async function menu_referido(page, pacienteReferido)  {

    if (pacienteReferido !== "referido") {            
        console.log("El paciente no es referido, no se rellenará el campo se cancela ejecucion de la funcion");
        return;
    } else {
        console.log("El paciente es referido, se rellenará el campo");}



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
            frame.locator('#contenedor div:nth-of-type(18) i'),
            frame.locator('::-p-xpath(//*[@id=\\"form_promocion_salud\\"]/div[2]/div[2]/div/div[1]/div/i)'),
            frame.locator(':scope >>> #contenedor div:nth-of-type(18) i')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 7.75,
                y: 11.21875,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('div:nth-of-type(18) div:nth-of-type(6)'),
            frame.locator('::-p-xpath(//*[@id=\\"form_promocion_salud\\"]/div[2]/div[2]/div/div[1]/div/div[2]/div[6])'),
            frame.locator(':scope >>> div:nth-of-type(18) div:nth-of-type(6)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 74.625,
                y: 13.453125,
              },
            });
    }

    console.log('Formulario de referido presionado exitosamente.');

}









async function presionar_boton_guardar_consulta (page) {

    const timeout = 10000;
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
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(frame.waitForNavigation());
        }
        await puppeteer.Locator.race([
            frame.locator('::-p-aria(Aceptar)'),
            frame.locator('#modal_respuesta button.primary'),
            frame.locator('::-p-xpath(//*[@id=\\"modal_respuesta\\"]/div[3]/button[4])'),
            frame.locator(':scope >>> #modal_respuesta button.primary'),
            frame.locator('::-p-text(Aceptar)')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 60.171875,
                y: 23.984375,
              },
            });
        await Promise.all(promises);
    }

    console.log('ventana exito de guardar consulta Botón de guardar consulta presionado exitosamente.');

}





async  function menu_guardar_precionar_boton_aceptar_exito(page) {

  console.log("---- empezando protocolo aceptar con exito--- Accion dar click aceptar el el boton exito guardado exitosamente");
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
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(frame.waitForNavigation());
        }
        await puppeteer.Locator.race([
            frame.locator('::-p-aria(Aceptar)'),
            frame.locator('#modal_respuesta button.primary'),
            frame.locator('::-p-xpath(//*[@id=\\"modal_respuesta\\"]/div[3]/button[4])'),
            frame.locator(':scope >>> #modal_respuesta button.primary'),
            frame.locator('::-p-text(Aceptar)')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 60.171875,
                y: 23.984375,
              },
            });
        await Promise.all(promises);
    }

    console.log('ventana exito de guardar consulta Botón de aceptar consulta presionado exitosamente.');

}





/*

async function menu_guardar_consulta_clickear_guardar_aceptar(page)  {

    console.log("---- empezando protocolo --- Accion dar click en acciones y guardar y aceptar el el boton exito guardado exitosamente");

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
            frame.locator('div.col div:nth-of-type(18)'),
            frame.locator('::-p-xpath(//*[@id=\\"segmento\\"]/div[2]/div[18])'),
            frame.locator(':scope >>> div.col div:nth-of-type(18)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 829.8125,
                y: 276.359375,
              },
            });
    }
    // Espera un segundo para que el menú se abra
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#aco_acciones > div.title > i'),
            frame.locator('::-p-xpath(//*[@id=\\"aco_acciones\\"]/div[1]/i)'),
            frame.locator(':scope >>> #aco_acciones > div.title > i')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 5.65625,
                y: 8.1875,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('#aco_acciones > div.title > i'),
            frame.locator('::-p-xpath(//*[@id=\\"aco_acciones\\"]/div[1]/i)'),
            frame.locator(':scope >>> #aco_acciones > div.title > i')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 6.375,
                y: 5.203125,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        await puppeteer.Locator.race([
            frame.locator('::-p-aria( Guardar)'),
            frame.locator('#bt_guardar'),
            frame.locator('::-p-xpath(//*[@id=\\"bt_guardar\\"])'),
            frame.locator(':scope >>> #bt_guardar')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 71.625,
                y: 19.390625,
              },
            });
    }
    {
        const targetPage = page;
        let frame = targetPage.mainFrame();
        frame = frame.childFrames()[0];
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(frame.waitForNavigation());
        }
        await puppeteer.Locator.race([
            frame.locator('::-p-aria(Aceptar)'),
            frame.locator('#modal_respuesta button.primary'),
            frame.locator('::-p-xpath(//*[@id=\\"modal_respuesta\\"]/div[3]/button[4])'),
            frame.locator(':scope >>> #modal_respuesta button.primary'),
            frame.locator('::-p-text(Aceptar)')
        ])
            .setTimeout(timeout)
            .on('action', () => startWaitingForEvents())
            .click({
              offset: {
                x: 66.171875,
                y: 26.984375,
              },
            });
        await Promise.all(promises);
    }

    console.log('accion dar click en acciones y guardar y aceptar el el boton exito guardado exitosamente');

}
*/

async function menu_guardar_consulta_clickear_guardar_aceptar(page) {
  console.log("---- empezando protocolo --- Accion dar click en acciones y guardar y aceptar el el boton exito guardado exitosamente");

  const timeout = 5000;
  page.setDefaultTimeout(timeout);

  try {
    // Ajuste de viewport
    await page.setViewport({
      width: 1365,
      height: 911
    });

    // Primer click (seleccionar acción 18)
    {
      const frame = page.mainFrame().childFrames()[0];
      await puppeteer.Locator.race([
        frame.locator('div.col div:nth-of-type(18)'),
        frame.locator('::-p-xpath(//*[@id="segmento"]/div[2]/div[18])'),
        frame.locator(':scope >>> div.col div:nth-of-type(18)')
      ])
        .setTimeout(timeout)
        .click({
          offset: { x: 829.8125, y: 276.359375 }
        });
    }

    // Abrir menú de acciones (primer click en el ícono)
    {
      const frame = page.mainFrame().childFrames()[0];
      await puppeteer.Locator.race([
        frame.locator('#aco_acciones > div.title > i'),
        frame.locator('::-p-xpath(//*[@id="aco_acciones"]/div[1]/i)'),
        frame.locator(':scope >>> #aco_acciones > div.title > i')
      ])
        .setTimeout(timeout)
        .click({
          offset: { x: 5.65625, y: 8.1875 }
        });
    }

    // Cerrar y volver a abrir menú de acciones (segundo click en el mismo ícono)
    {
      const frame = page.mainFrame().childFrames()[0];
      await puppeteer.Locator.race([
        frame.locator('#aco_acciones > div.title > i'),
        frame.locator('::-p-xpath(//*[@id="aco_acciones"]/div[1]/i)'),
        frame.locator(':scope >>> #aco_acciones > div.title > i')
      ])
        .setTimeout(timeout)
        .click({
          offset: { x: 6.375, y: 5.203125 }
        });
    }

    // Click en "Guardar"
    {
      const frame = page.mainFrame().childFrames()[0];
      await puppeteer.Locator.race([
        frame.locator('::-p-aria( Guardar)'),
        frame.locator('#bt_guardar'),
        frame.locator('::-p-xpath(//*[@id="bt_guardar"])'),
        frame.locator(':scope >>> #bt_guardar')
      ])
        .setTimeout(timeout)
        .click({
          offset: { x: 71.625, y: 19.390625 }
        });
    }

    // Click en "Aceptar" y esperar navegación
    {
      const frame = page.mainFrame().childFrames()[0];
      const promises = [];
      const startWaitingForEvents = () => {
        promises.push(frame.waitForNavigation());
      };
      await puppeteer.Locator.race([
        frame.locator('::-p-aria(Aceptar)'),
        frame.locator('#modal_respuesta button.primary'),
        frame.locator('::-p-xpath(//*[@id="modal_respuesta"]/div[3]/button[4])'),
        frame.locator(':scope >>> #modal_respuesta button.primary'),
        frame.locator('::-p-text(Aceptar)')
      ])
        .setTimeout(timeout)
        .on('action', () => startWaitingForEvents())
        .click({
          offset: { x: 66.171875, y: 26.984375 }
        });
      await Promise.all(promises);
    }

    console.log('accion dar click en acciones y guardar y aceptar el el boton exito guardado exitosamente');
  } catch (err) {
    // Si ocurre cualquier error, se ignora para no interrumpir funciones posteriores
  }
}







async function lanzarErrorDePrueba() {
  throw new Error('Este es un error de prueba generado por lanzarErrorDePrueba()');
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





/*
const paciente = {
    curp: 'CURP1234567890',
    nombres: 'ENRIQUE',
    apellido_paterno: 'RUIZ',
    apellido_materno: 'DELGADO',
    fecha_de_nacimiento: '18/08/1961',
    fecha_consulta : '25/05/2025',
    peso: '70',
    talla: '1.75', // en metros       
    tension_arterial: '120/80', // Formato: 'Sistolica/Diastolica'
    frecuencia_cardiaca: '75', // en latidos por minuto
    frecuencia_respiratoria: '16', // en respiraciones por minuto
    temperatura: '36.5',
    sexo: "H",
    lugar_de_nacimiento: "CAMPECHE",
    
    
    numero_de_expediente: "135",
    //"fecha_consulta": "2025-05-26 00:00:00",
    hora: "09:49:57",

    dxtx: "98",


    primera_vez_ano: "si",
    relacion_temporal: "subsecuente", // "primera-vez" o "subsecuente"
    diagnostico: "Enfermedad hipertensiva crónica",
    dm2: "no",
    has: "no",
    ira: "no",
    asma: "no",
    conjuntivitis: "no",
    otitis: "no",
    deteccion_salud_mental: "no",
    folio_receta: "0",
    promocion_de_la_salud: "sipresenta",
    linea_vida: "si",
    esquema_vacunacion: "norealizada",
    referido: "noreferido",
    deteccion_adicciones: "norealizada",
    deteccion_violencia_mujer: "norealizada",
    prueba_edi: "norealizada",
    resultado_edi: "0",
    resultado_battelle: "0",
    eda_tratamiento: "0",
    ira_tratamiento: "no",
    aplicacion_cedula_cancer_ano: "norealizada",
    INTERVENCIONES_GERONTOLOGICAS: "0",
    alergia: "no",

    telefono: "no",
    febril: "nofebril",
    embarazada: "sinembarazo",
    nutricion: "obesidad",
    eda: "no" 
    
};
*/

/*
const paciente =          {
    "ID": "7",
    "nombre": "DEYSI HERNANDEZ DIAZ",
    "nombres": "DEYSI",
    "apellido_paterno": "HERNANDEZ",
    "apellido_materno": "DIAZ",
    "edad": "58",
    "sexo": "M",
    "lugar_de_nacimiento": "CAMPECHE",
    "fecha_de_nacimiento": "14/03/1967",
    "curp": "HEDD670314MCCRZY08",
    "numero_de_expediente": "289",
    "fecha_consulta": "2025-05-27 00:00:00",
    "hora": "10:47:57",
    "peso": "62",
    "talla": "1.62",
    "tension_arterial": "110/70",
    "fc": "70",
    "fr": "20",
    "temperatura": "36",
    "dxtx": "0",
    "imc": "23.624447492760247",
    "cc": "0",
    "plan": "ANTECEDNETE DE DM2 , NIEGA ALERGIA A MEDICAMENTOS",
    "subjetivo": "PACIENTEA CUDE POR PRESENTAR INFLAMAPACION ALREDEDOR DE UNIA DE MANO DERECHA DE 1ER DEDO SECUDNRO A ARRANCACER PEDISO DE PIEL CON PSOTERIOR DOLOR INFALAMACION Y SALIDA DE LIQUIDO SEROSO Y ENROJECICIMIENTO DE 1 SEMANA DE EEVOLUICON",
    "neurologico": "PACIENTE CONCIENTE REACTIVO EN SUS 3 ESFERAS NEUROLOGICAS, COOPERADOR AL MOMENTO DE ATENDERLO, NO DATOS DE ALTERACIONES",
    "cabeza": "MUCOSAS HIDRATADAS DE BUEN COLOR, FARINGE NORMAL NO DATOS DE INFECCION ACTIVA, CUELLO SIN GANGLIOS PALPABLES",
    "torax": "TORAX CON MURMULLO VESICULAR PRESENTE SIN AGREGADOS, CON BUENA ENTRADA Y SALIDA DE AIRE, AMPLEXION Y AMPLEXACION CORRECTOS SIN DATOS DE DIFICULTAD RESPIRATORIA ACTIVA",
    "abdomen": "ABDOMEN BLANDO DEPRESIBLE NO DOLOROSO A LA PALPACION PROFUNDA O LEVE, NO SE PALPAN TUMORACIONES, BORDE HEPATICO CORRECTO, PERITALSIS CORRECTA, MCBURNEY NEGATIVO ,JORDANO NEGATIVO NO DATOS DE IRRITACION PERITONEAL EN ESTE MOMENTO O SINTOMATOLOGIA DE ABDOMEN AGUDO, NO SE PALPAN HERNIAS",
    "extremidades": "DEDO GORDO CON INFALAMACION ENJOCIMIENTO DEL MISMO Y SALIDA DE LIQUIDO HIALINO",
    "analisis": "PACIENTE CURSANDO CON PB INFECCION EN ZONA DE UNIA O PB INSERCCION DE UNIA EN LA MISMA, SE TA TRATAMIENTO ANTIBIOTICO Y REVALORACION EN 2 DIAS PARA EXTRACCION DEL MISMO",
    "diagnostico": "INFECCION DEDO",
    "tratamiento": "CONTINUAR CON TX PARA DM2 DE SIDAGLIPTINA/ METFORMIAN 1X12, SE INCIIA AMOXICILINA CON ACIDO CLAVULNICO 1X8 POR 6 DIAS, NAPROXENO 1X8 POR 3 DIAS",
    "medicamentos": "0: 0; 0: 0; 0: 0",
    "pronostico": "pronostico bueno",
    "primera_vez_ano": "no",
    "relacion_temporal": "primera-vez",
    "dm2": "si",
    "has": "no",
    "ira": "no",
    "asma": "no",
    "conjuntivitis": "no",
    "otitis": "no",
    "deteccion_salud_mental": "no",
    "folio_receta": "0",
    "promocion_de_la_salud": "sipresenta",
    "linea_vida": "no",
    "esquema_vacunacion": "norealizada",
    "referido": "noreferido",
    "deteccion_adicciones": "norealizada",
    "deteccion_violencia_mujer": "norealizada",
    "prueba_edi": "norealizada",
    "resultado_edi": "0",
    "resultado_battelle": "0",
    "eda_tratamiento": "0",
    "ira_tratamiento": "no",
    "aplicacion_cedula_cancer_ano": "norealizada",
    "INTERVENCIONES_GERONTOLOGICAS": "0",
    "alergia": "ninguno",
    "CHISME": "ningun chisme",
    "telefono": "no",
    "febril": "nofebril",
    "embarazada": "sinembarazo",
    "nutricion": "peso-normal",
    "eda": "no"
  }
*/

/*
async function capturarConsulta() {

    const fecha_consulta = formatearFecha(paciente.fecha_consulta);




    const { pages, page } = await establecerConeccion();



    // bloque de buscar datos del paciente
    await menu_datos_generales_paciente_presionar_boton_datos_del_paciente(page);
    await menu_buscar_paciente_presionar_boton_buscar_paciente(page);
    await menu_buscar_paciente_presionar_formulario_buscar_por_nombre(page);
    await menu_buscar_paciente_relleno_nombre_fecha_de_nacimiento(page, paciente.nombres, paciente.apellido_paterno, paciente.apellido_materno, paciente.fecha_de_nacimiento);
    await menu_buscar_paciente_presionar_boton_buscar(page);
    await menu_buscar_paciente_presionar_sobre_paciente_encontrado(page);
    await new Promise(resolve => setTimeout(resolve, 6000)); // Esperar a que se cargue el paciente
    await menu_datos_generales_paciente_intentar_asignar_otro_genero(page, paciente.sexo);
    await menu_datos_generales_paciente_asignar_numero_de_expediente(page, paciente.numero_de_expediente);
    await menu_datos_generales_presionar_boton_guardar(page);
    await new Promise(resolve => setTimeout(resolve, 7000)); // Esperar a que se guarde el paciente
    //await menu_datos_generales_paciente_presionar_boton_cerrar_datos_del_paciente(page);
    //termina bloque de buscar datos del paciente

    // bloque de rellenado de datos del paciente
    await menu_signos_vitales_seleccionar_consulta_externa(page);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar a que se cargue la consulta externa
    await menu_signos_vitales_fecha_consulta(page, fecha_consulta);    
    await new Promise(resolve => setTimeout(resolve, 25000)); // Esperar a que se cargue la fecha de consulta    
    await menu_signos_vitales_rellenado_signos_vitales(page, paciente.fc, paciente.fr, paciente.temperatura, paciente.peso, paciente.talla, paciente.tension_arterial);
    await new Promise(resolve => setTimeout(resolve, 2000))
    //termina bloque de rellenado de datos del paciente


    //bloque de modalidad y relacion temporal
    await menu_modalidad_primera_vez_ano(page, paciente.primera_vez_ano);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar a que se cargue el formulario de modalidad
    await menu_modalidad_relacion_temporal(page, paciente.relacion_temporal);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar a que se cargue la relacion temporal

    //termina bloque de modalidad y relacion temporal

    
    //menu diagnosticos
    await new Promise(resolve => setTimeout(resolve, 2000));
    await scrollPage(page)
    await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar a que se cargue la pagina
    await menu_diagnosticos_primer_diagnostico(page, paciente.diagnostico);
    //termina menu diagnosticos

    //menu promocion de la salud
    await menu_promocion_salud_linea_de_vida(page, paciente.linea_vida);
    await menu_promocion_salud_presenta_cartilla(page, paciente.promocion_de_la_salud);
    //termina menu promocion de la salud

    //menu referido
    await menu_referido(page, paciente.referido);
    //termina menu referido


}	



capturarConsulta()
    .then(() => console.log('Consulta capturada exitosamente.'))
    .catch(error => console.error('Error al capturar la consulta:', error));


    */

// capturarConsulta.js
const { readFile, writeFile } = require('fs').promises;


// -- Aquí van tus funciones importadas (formatearFecha, establecerConeccion, etc.) --

let rl; // Interfaz de readline global para preguntar al usuario

/**
 * Función modificada para recibir un objeto `paciente`.
 */
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
  await menu_buscar_paciente_presionar_boton_buscar(page);
  await menu_buscar_paciente_presionar_sobre_paciente_encontrado(page);
  await new Promise(resolve => setTimeout(resolve, 10000)); // Esperar a que se cargue el paciente
  await menu_datos_generales_paciente_asignar_numero_de_expediente(page, paciente.numero_de_expediente);
  await menu_datos_generales_paciente_intentar_asignar_otro_genero(page, paciente.sexo);
  
   await new Promise(resolve => setTimeout(resolve, 1500));
  await menu_datos_generales_presionar_boton_guardar(page);
  await new Promise(resolve => setTimeout(resolve, 7000)); // Esperar a que se guarde el paciente
  // -----------------------------------------------

  console.log("============bloque relleno de datos del paciente >>terminado<< ============");

  console.log("============bloque relleno de fecha de consulta y signos vitales ============");
  // --- Bloque de rellenado de datos del paciente ---
  await menu_signos_vitales_seleccionar_consulta_externa(page);
  await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar a que se cargue la consulta externa
  await menu_signos_vitales_fecha_consulta(page, fecha_consulta);
  await new Promise(resolve => setTimeout(resolve, 10000)); // Esperar a que se cargue la fecha de consulta
  await menu_signos_vitales_rellenado_signos_vitales(
    page,
    paciente.fc,
    paciente.fr,
    paciente.temperatura,
    paciente.peso,
    paciente.talla,
    paciente.tension_arterial
    //paciente.tensionArterial
  );
  await new Promise(resolve => setTimeout(resolve, 2000));
  // -----------------------------------------------
    console.log("============bloque relleno de fecha de consulta y signos vitales >>terminado<< ============");



  // --- Bloque de modalidad y relación temporal ---

  console.log("============bloque de modalidad y relacion temporal iniciado============");
  await menu_modalidad_primera_vez_ano(page, paciente.primera_vez_ano);
  await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar a que se cargue el formulario de modalidad
  await menu_modalidad_relacion_temporal(page, paciente.relacion_temporal);
  await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar a que se cargue la relación temporal
  // -----------------------------------------------
    console.log("============bloque de modalidad y relacion temporal >>terminado<< ============");




  // --- Menú de diagnósticos ---

    console.log("============bloque de diagnosticos iniciado============");
  await new Promise(resolve => setTimeout(resolve, 2000));
  await scrollPage(page);
  await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar a que se cargue la página
  await menu_diagnosticos_primer_diagnostico(page, paciente.diagnostico);
    // -----------------------------------------------
        console.log("============bloque de diagnosticos >>terminado<< ============");
  // -----------------------------------------------



    // --- Menú de promoción de la salud ---
    console.log("============bloque de promocion de la salud iniciado============");
  await menu_promocion_salud_linea_de_vida(page, paciente.linea_vida);
  await menu_promocion_salud_presenta_cartilla(page, paciente.promocion_de_la_salud);
  await new Promise(resolve => setTimeout(resolve, 1500));
  // -----------------------------------------------
    console.log("============bloque de promocion de la salud >>terminado<< ============");
  // -----------------------------------------------

  // --- Menú referido ---
  console.log("============bloque de referido iniciado============");
  await menu_referido(page, paciente.referido);
  
  // -----------------------------------------------
    console.log("============bloque de referido >>terminado<< ============");
  // -----------------------------------------------


  //await lanzarErrorDePrueba(); // Lanza un error de prueba para verificar el manejo de errores



  console.log("============bloque de guardado de consulta iniciado============");

  /*
  //await new Promise(resolve => setTimeout(resolve, 5000)); // Esperar a que se cargue el formulario de referido
  await presionar_boton_guardar_consulta(page);

  await new Promise(resolve => setTimeout(resolve, 3000)); // Esperar a que se guarde la consulta
    await presionar_boton_aceptar_exito_consulta_capturada(page);
  await new Promise(resolve => setTimeout(resolve, 20000)); // Esperar a que se guarde la consulta
*/



await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar a que se cargue la página
await menu_guardar_consulta_clickear_guardar_aceptar(page);
  await new Promise(resolve => setTimeout(resolve, 5000)); // Esperar a que se guarde la consulta
    await menu_guardar_precionar_boton_aceptar_exito(page)

await new Promise(resolve => setTimeout(resolve, 18000)); // Esperar a que se guarde la consulta    

   console.log("++++++============EXITO LA CAPTURA DE LA CONSULTA DEL PACIENTE A TERMINADO SATISFACTORIAMENTE ============+++++");
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

/**
 * Función principal: procesa cada paciente desde ./pacientesParseados.json,
 * llama a capturarConsulta(paciente) y, en caso de error, pregunta si marcarlo
 * como capturado o no. Actualiza el JSON inmediatamente tras cada intento.
 */
async function procesarPacientes() {
  // Crear la interfaz de readline una sola vez
  const rlInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl = rlInterface;

  try {
    // 1. Leer y parsear el JSON (usando fs.promises.readFile como readFile)
    const data = await readFile('./pacientesParseados.json', 'utf-8');
    const pacientes = JSON.parse(data);

    console.log(`>>>>>Total de pacientes a procesar: ${pacientes.length}`);
    // 2. Iterar sobre cada paciente
    for (let i = 0; i < pacientes.length; i++) {
      const paciente = pacientes[i];

      // Si ya tiene capturado === true, saltar
      if (paciente.capturado === true) {
        continue;
      }

      try {
        // Intentamos ejecutar la automatización
        await capturarConsulta(paciente);

        // Si no hubo error, marcamos capturado y reescribimos el JSON
        paciente.capturado = true;
        await writeFile(
          './pacientesParseados.json',
          JSON.stringify(pacientes, null, 2),
          'utf-8'
        );
        console.log(`>>>>>>!! Paciente ${i + 1}/${pacientes.length} capturado exitosamente.`);
      } catch (error) {
        // Si ocurre un error dentro de capturarConsulta, preguntamos al usuario
        console.error(`Error al capturar paciente #${i + 1}:`, error);
        const respuesta = await preguntarUsuario('se capturo el paciente? (si/no) ');

        if (respuesta === 'si') {
          paciente.capturado = true;
          await writeFile(
            './pacientesParseados.json',
            JSON.stringify(pacientes, null, 2),
            'utf-8'
          );
          console.log(`Paciente ${i + 1} marcado manualmente como capturado.`);
        } else {
          // Si responde "no", no marcamos capturado y seguimos al siguiente
          console.log(`Paciente ${i + 1} omitido. Se continuará con el siguiente.`);
          // Aunque no cambie el objeto, reescribimos para asegurarnos de persistir el orden
          await writeFile(
            './pacientesParseados.json',
            JSON.stringify(pacientes, null, 2),
            'utf-8'
          );
        }
      }
    }

    console.log('Proceso de captura finalizado.');
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
