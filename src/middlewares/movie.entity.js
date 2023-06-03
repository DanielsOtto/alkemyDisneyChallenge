export default function movieEntity(req, res, next) {
  req.entity = 'movie';
  next();
}