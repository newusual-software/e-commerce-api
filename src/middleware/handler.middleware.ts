import { Request,Response,NextFunction } from "express";


// route not found
export function routeNotFound(req: Request, res: Response, next: NextFunction){
	const error = new Error(`${req.originalUrl} route not found!`);
	res.status(404);
	next(error);
}

// error handler
export function errorHandler(error: Error,req: Request, res: Response, next: NextFunction){
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.send(error);
}