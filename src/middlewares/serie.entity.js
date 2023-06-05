export default function serieEntity(req, res, next) {
  req.entity = 'serie';
  next();
}
// middleware para el endpoint de series,
// crea el atributo entity que se va a utilizar para elegir la tabla de series