import crypto from 'crypto'

// Genera un nombre de archivo aleatorio
function generateRandomFileName() {
  const timestamp = Date.now(); // Marca de tiempo actual
  const randomValue = crypto.randomBytes(4).toString("hex"); // Valor aleatorio
  return `${timestamp}-${randomValue}`;
}

export default generateRandomFileName