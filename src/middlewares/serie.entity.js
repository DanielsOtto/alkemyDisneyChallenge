export default function serieEntity(req, res, next) {
  req.entity = 'serie';
  next();
}