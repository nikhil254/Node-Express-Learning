import express from 'express';
import { healthCheck } from './health.controller';
const router = express.Router();

router.get('/health', healthCheck);

export default router;