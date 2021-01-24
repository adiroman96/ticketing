import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/orders/:orderdId', async (req: Request, res: Response) => {
  res.send({});
});

export { router as showOrderRouter };
