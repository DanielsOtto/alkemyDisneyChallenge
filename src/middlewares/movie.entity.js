export default function movieEntity(req, res, next) {
  req.entity = 'movie';
  next();
}
// middleware para el endpoint de movies,
// crea el atributo entity que se va a utilizar para elegir la tabla de movies