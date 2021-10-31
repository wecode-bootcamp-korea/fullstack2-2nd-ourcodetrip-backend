const invalidPathHandler = (req, res, next) => {
  res.redirect('/not-found');
};

const errorLogger = (err, req, res, next) => {
  console.error(err);
  next(err);
};

const errorResponder = (err, req, res, next) => {
  const { status, message } = err;
  res
    .status(status || 500)
    .json({ message: message || 'internal server error' });
};

export { invalidPathHandler, errorLogger, errorResponder };
