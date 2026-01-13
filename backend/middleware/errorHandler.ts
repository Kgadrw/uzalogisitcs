import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', err);

  const statusCode = (err as any).statusCode || 500;
  const message = err.message || 'Internal server error';

  const response: ApiResponse<null> = {
    success: false,
    error: message,
  };

  res.status(statusCode).json(response);
}

export function notFoundHandler(req: Request, res: Response) {
  const response: ApiResponse<null> = {
    success: false,
    error: 'Route not found',
  };
  res.status(404).json(response);
}
