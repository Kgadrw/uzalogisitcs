import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

export function validateRequest(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error.details[0].message,
      };
      return res.status(400).json(response);
    }
    
    next();
  };
}
