// leer-excel.js

/**
 * Este script:
 * 1. Lee todos los archivos .xls de la carpeta "archivos-excel".
 * 2. Por cada archivo, abre el libro de Excel usando SheetJS (xlsx).
 * 3. Recorre todas las hojas (sheets) y muestra en consola el contenido de cada una.
 */

const fs    = require('fs');
const path  = require('path');
const XLSX  = require('xlsx');
const chalk = require('chalk'); // Opcional, solo para colorear la salida

// Ruta a la carpeta donde están los archivos .xls
const CARPETA_EXCEL = path.join(__dirname, 'archivos-excel');

function leerCarpetaYProcesar() {
  // 1. Leer todos los nombres de archivos en la carpeta
  fs.readdir(CARPETA_EXCEL, (err, archivos) => {
    if (err) {
      console.error(chalk.red(`Error al leer la carpeta ${CARPETA_EXCEL}:`), err);
      return;
    }

    // Filtrar sólo los que terminen en .xls (Excel 97-2003)
    const xlsFiles = archivos.filter(nombre => /\.xls$/i.test(nombre));

    if (xlsFiles.length === 0) {
      console.log(chalk.yellow('No se encontraron archivos .xls en la carpeta.'));
      return;
    }

    // Procesar uno a uno
    xlsFiles.forEach(nombreArchivo => {
      const rutaArchivo = path.join(CARPETA_EXCEL, nombreArchivo);
      console.log(chalk.green.bold(`\n=== Leyendo "${nombreArchivo}" ===\n`));

      try {
        // 2. Leer el libro de Excel (.xls)
        //    La librería XLSX detecta automáticamente formato antiguo (.xls) o nuevo (.xlsx)
        const workbook = XLSX.readFile(rutaArchivo, { type: 'binary' });

        // 3. Obtener todas las hojas (sheet names)
        const hojas = workbook.SheetNames;

        hojas.forEach(nombreHoja => {
          console.log(chalk.blue(`Hoja: "${nombreHoja}"`));

          // Convertir la hoja completa a JSON (array de objetos)
          // Opciones:
          //   header: 1 => devuelve cada fila como array de celdas (en lugar de objetos con clave-columna)
          //   defval: '' => celdas vacías como cadena vacía
          const sheet = workbook.Sheets[nombreHoja];
          const datos = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            defval: ''
          });

          if (datos.length === 0) {
            console.log(chalk.yellow('  (Hoja vacía)\n'));
            return;
          }

          // 4. Mostrar cada fila en consola
          datos.forEach((fila, idx) => {
            // Puedes formatear la fila como prefieras. Aquí la mostramos con tabulaciones.
            const textoFila = fila.map(celda => String(celda)).join('\t');
            console.log(`  Fila ${idx + 1}: ${textoFila}`);
          });

          console.log(''); // línea en blanco entre hojas
        });

      } catch (e) {
        console.error(chalk.red(`Error al procesar "${nombreArchivo}":`), e.message);
      }
    });
  });
}

// Ejecutar función principal
leerCarpetaYProcesar();
