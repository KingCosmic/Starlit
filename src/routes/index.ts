import { Router } from 'express'

import twitchRoutes from './twitch'

const router = Router();

router.use('/twitch', twitchRoutes);

export default router;