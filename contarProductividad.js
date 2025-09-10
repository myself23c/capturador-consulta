// Script en Node.js para leer el archivo pacientesParseados.json
// y realizar los conteos solicitados.

const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON (se asume que está en el mismo directorio que este script)
const archivoPath = path.join(__dirname, 'pacientesParseados.json');

fs.readFile(archivoPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  let pacientes;
  try {
    pacientes = JSON.parse(data);
  } catch (parseErr) {
    console.error('Error al parsear JSON:', parseErr);
    return;
  }

  // Inicialización de contadores
  let primeraVezSi = 0;
  let primeraVezNo = 0;

  let relacionTemporalPrimeraVez = 0;

  let edadMenor11 = 0;

  const contadorDiagnosticos = {
    faringitis: 0,
    gastroenteritis: 0,
    amigdalitis: 0,
    bronquitis: 0
  };

  // Recorrer cada paciente y actualizar contadores
  pacientes.forEach(paciente => {
    // Conteo de "primera_vez_ano" (si / no)
    const primera = (paciente.primera_vez_ano || '').toLowerCase();
    if (primera === 'si') {
      primeraVezSi++;
    } else if (primera === 'no') {
      primeraVezNo++;
    }

    // Conteo de "relacion_temporal" == "primera-vez"
    if ((paciente.relacion_temporal || '').toLowerCase() === 'primera-vez') {
      relacionTemporalPrimeraVez++;
    }

    // Conteo de "edad" < 11
    const edadNum = parseInt(paciente.edad, 10);
    if (!isNaN(edadNum) && edadNum < 11) {
      edadMenor11++;
    }

    // Conteo de diagnósticos que incluyan ciertos textos
    const diagnosticoTexto = (paciente.diagnostico || '').toLowerCase();
    if (diagnosticoTexto.includes('faringitis')) {
      contadorDiagnosticos.faringitis++;
    }
    if (diagnosticoTexto.includes('gastroenteritis')) {
      contadorDiagnosticos.gastroenteritis++;
    }
    if (diagnosticoTexto.includes('amigdalitis')) {
      contadorDiagnosticos.amigdalitis++;
    }
    if (diagnosticoTexto.includes('bronquitis')) {
      contadorDiagnosticos.bronquitis++;
    }
  });

  // Imprimir resultados en consola
  console.log('=== Resultados de los conteos ===\n');

  console.log('Propiedad "primera_vez_ano":');
  console.log(`  Sí: ${primeraVezSi}`);
  console.log(`  No: ${primeraVezNo}\n`);

  console.log('Propiedad "relacion_temporal" == "primera-vez":');
  console.log(`  Total: ${relacionTemporalPrimeraVez}\n`);

  console.log('Pacientes con edad < 11:');
  console.log(`  Total: ${edadMenor11}\n`);

  console.log('Conteo de diagnósticos:');
  console.log(`  Faringitis: ${contadorDiagnosticos.faringitis}`);
  console.log(`  Gastroenteritis: ${contadorDiagnosticos.gastroenteritis}`);
  console.log(`  Amigdalitis: ${contadorDiagnosticos.amigdalitis}`);
  console.log(`  Bronquitis: ${contadorDiagnosticos.bronquitis}`);
});
