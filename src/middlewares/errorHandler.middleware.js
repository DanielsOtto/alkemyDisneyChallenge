export function errorHandler(error, req, res, next) {
  switch (error.type) {
    case 'EMPTY_COLLECTION':
      res.status(204);
      break;
    case 'UNSAVED_OBJECT':
    case 'INVALID_ARGUMENT':
      res.status(400);
      break;
    case 'UNAUTHORIZED':
      res.status(401);
      break;
    case 'FORBIDDEN_ACCESS':
      res.status(403);
      break;
    case 'NOT_FOUND':
      res.status(404);
      break;
    case 'CHAR_REGISTER':
    case 'EMAIL_REGISTER':
      res.status(409);
      break;
    case 'INVALID_FORMAT':
      res.status(422);
      break;
    default:
      res.status(500);
  }
  res.json({ ERROR: error.message });
}