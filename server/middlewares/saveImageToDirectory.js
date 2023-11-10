function saveImageToDirectory(req, res, next) {
  if (req.files && req.files.projectImage) {
    const file = req.files.projectImage;
    const projectId = req.body.projectId; // Asegúrate de que envías el ID del proyecto en el cuerpo de la solicitud
    const folderPath = path.join(__dirname, UPLOADS_DIR, projectId); // Ruta completa para la carpeta de destino

    // Verifica si el directorio de destino existe, y créalo si no
    fs.promises
      .mkdir(folderPath, { recursive: true })
      .then(() => {
        const destPath = path.join(folderPath, file.name); // Ruta completa de destino para la imagen
        return fs.promises.rename(file.tempFilePath, destPath); // Mueve la imagen al directorio de destino
      })
      .then(() => {
        // La imagen se ha guardado correctamente
        next();
      })
      .catch((error) => {
        console.error("Error al guardar la imagen:", error);
        res.status(500).json({ error: "Error al guardar la imagen" });
      });
  } else {
    // Si no se proporcionó una imagen, continúa con la siguiente función middleware
    next();
  }
}
