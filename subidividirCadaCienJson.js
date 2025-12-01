const fs = require('fs');

// Configuración
const INPUT_FILE = './pacientesParseados.json'; // Nombre del archivo origen
const CHUNK_SIZE = 100; // Cantidad de objetos por archivo

async function dividirArchivo() {
    try {
        console.log(`🔍 Leyendo archivo: ${INPUT_FILE}...`);

        // 1. Leer y parsear el archivo original
        if (!fs.existsSync(INPUT_FILE)) {
            throw new Error(`El archivo ${INPUT_FILE} no existe.`);
        }
        
        const rawData = fs.readFileSync(INPUT_FILE, 'utf-8');
        const pacientes = JSON.parse(rawData);

        // Validar que sea un array
        if (!Array.isArray(pacientes)) {
            throw new Error("El archivo JSON no contiene un array de objetos.");
        }

        console.log(`✅ Archivo cargado. Total de pacientes: ${pacientes.length}`);

        // 2. Procesar en bloques de 100
        let fileCounter = 1;
        
        for (let i = 0; i < pacientes.length; i += CHUNK_SIZE) {
            // Cortar el array desde i hasta i + 100
            const bloque = pacientes.slice(i, i + CHUNK_SIZE);
            
            // Crear nombre del archivo (ej: pacientesParseados1.json)
            const outputFileName = `pacientesParseados${fileCounter}.json`;
            
            // Escribir el nuevo archivo
            fs.writeFileSync(outputFileName, JSON.stringify(bloque, null, 2));
            
            console.log(`   📄 Creado: ${outputFileName} con ${bloque.length} pacientes.`);
            
            fileCounter++;
        }

        console.log(`\n🎉 Proceso terminado. Se crearon ${fileCounter - 1} archivos.`);

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

dividirArchivo();