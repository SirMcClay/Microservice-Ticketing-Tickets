import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@sirmctickets/commontickets';

const router = express.Router();

router.post(
	'/api/tickets',
	requireAuth,
	[
		body('title').not().isEmpty().withMessage('Title is required'),
		body('price')
			.isFloat({ gt: 0 })
			.withMessage('Price must be greater then 0'),
	],
	validateRequest,
	(req: Request, res: Response) => {
		res.sendStatus(200);
	}
);

export { router as createTicketRouter };