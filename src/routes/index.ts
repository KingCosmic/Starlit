import { Router } from 'express'
const router = Router();

router.use('/twitch', require('./twitch'));

export default router;