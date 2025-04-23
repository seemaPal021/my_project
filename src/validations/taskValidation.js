import Joi from 'joi';

export const taskValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
  dueDate: Joi.date().optional(),
  priority: Joi.string().valid('low', 'medium', 'high').optional(),
  assignedTo: Joi.string().optional()
});

export const updateTaskValidation = Joi.object({
    title: Joi.string(),
    description: Joi.string().allow('').optional(),
    status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
    dueDate: Joi.date().optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional(),
    assignedTo: Joi.string().optional()
  });