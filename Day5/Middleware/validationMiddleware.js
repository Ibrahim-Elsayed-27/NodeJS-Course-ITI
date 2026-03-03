import userValidationSchema from "../Validation/userValidation.js";

const validationMiddleware = (req, res, next) => {
  const validation = userValidationSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(422)
      .json({ message: validation.error.details[0].message });
  }
  next();
};

export default validationMiddleware;
