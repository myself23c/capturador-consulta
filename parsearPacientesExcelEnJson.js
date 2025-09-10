// generarPacientesJson.js

// 1. Importamos las librerías necesarias
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// 2. Definimos la ruta de entrada (Excel) y salida (JSON)
const nombreArchivoExcel = 'DUMPEOFINALAGOSTO.xlsx';
// Si tu archivo se llama "pacientes-mayo.xls", cámbialo aquí:
const rutaExcel = path.join(__dirname, nombreArchivoExcel);

const nombreArchivoJson = 'pacientesParseados.json';
const rutaJsonSalida = path.join(__dirname, nombreArchivoJson);

try {
  // 3. Leemos el libro de Excel
  const libro = XLSX.readFile(rutaExcel);

  // 4. Tomamos la primera hoja (puedes cambiar el índice si no es la primera)
  const nombreHoja = libro.SheetNames[0];
  const hoja = libro.Sheets[nombreHoja];

  // 5. Convertimos la hoja a un arreglo de objetos JS:
  //    -> Cada objeto corresponde a una fila.
  //    -> Las keys de cada objeto son los nombres de columna.
  const datosComoObjetos = XLSX.utils.sheet_to_json(hoja, {
    defval: null,      // Si una celda está vacía, su valor será null en vez de omitirse.
    raw: false         // Intenta parsear fechas/números según formato de celda.
  });

  // 6. Serializamos el array a JSON con indentación para legibilidad
  const contenidoJSON = JSON.stringify(datosComoObjetos, null, 2);

  // 7. Escribimos el JSON en el archivo de salida
  fs.writeFileSync(rutaJsonSalida, contenidoJSON, 'utf8');

  console.log(`✅ Se generó correctamente '${nombreArchivoJson}' con ${datosComoObjetos.length} registros.`);
} catch (error) {
  console.error('❌ Ocurrió un error al procesar el archivo de Excel:', error);
  process.exit(1);
}
