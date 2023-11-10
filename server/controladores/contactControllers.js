import {saveMessageInDB} from '../db/queries/contactQueries.js'


async function sendMessage(req, res, next) {
  try {
    const { nombre, email, telefono, mensaje } = req.body;

    if (!nombre)
      throw new ValidationError({
        message: "El campo nombre es obligatorio",
        field: "nombre",
      });
    if (!email)
      throw new ValidationError({
        message: "El campo email es obligatorio",
        field: "email",
      });
    if (!telefono)
      throw new ValidationError({
        message: "El campo telefono es obligatorio",
        field: "telefono",
      });
    if (!mensaje)
      throw new ValidationError({
        message: "El campo mensaje es obligatorio",
        field: "mensaje",
      });

    // Llama a la función para guardar el mensaje en la base de datos
    const result = await saveMessageInDB(nombre, email, telefono, mensaje);

    if (result instanceof Error) throw result;

    res.json({
      status: "ok",
      message: "Mensaje guardado exitosamente",
    });
  } catch (err) {
    next(err);
  }
}

export{
    sendMessage
}