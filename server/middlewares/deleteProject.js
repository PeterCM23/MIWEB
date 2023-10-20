import fs from "fs-extra";

async function xProjectFolder(folderPath) {
    console.log(folderPath)
  try {
    // Verifica si la carpeta existe y elimínala si es así
    const exists = await fs.pathExists(folderPath);
    if (exists) {
      await fs.remove(folderPath);
      console.log("Carpeta del proyecto eliminada con éxito:", folderPath);
    }
  } catch (error) {
    console.error("Error al eliminar la carpeta del proyecto:", error);
    throw error;
  }
}
 export default xProjectFolder