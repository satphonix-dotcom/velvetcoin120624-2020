import { validationResult } from 'express-validator';
import { ApiError } from '../utils/api-error.js';
import sanitizeHtml from 'sanitize-html';

const sanitizeOptions = {
  allowedTags: [],
  allowedAttributes: {},
  disallowedTagsMode: 'recursiveEscape'
};

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest('Validation failed', 
      errors.array().reduce((acc, err) => {
        acc[err.param] = err.msg;
        return acc;
      }, {})
    );
  }
  next();
};

export const sanitizeOutput = (data) => {
  if (Array.isArray(data)) {
    return data.map(item => sanitizeOutput(item));
  }
  
  if (data && typeof data === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      if (!['password', 'salt', '__v', 'privateKey'].includes(key)) {
        sanitized[key] = sanitizeOutput(value);
      }
    }
    return sanitized;
  }
  
  if (typeof data === 'string') {
    return sanitizeHtml(data, sanitizeOptions);
  }
  
  return data;
};

export const validateInput = (input, type) => {
  const patterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    username: /^[a-zA-Z0-9_-]{3,16}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    walletAddress: /^0x[a-fA-F0-9]{40}$/,
    url: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
    ipAddress: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  };

  if (!patterns[type]) {
    throw new Error(`Invalid validation type: ${type}`);
  }

  return patterns[type].test(input);
};