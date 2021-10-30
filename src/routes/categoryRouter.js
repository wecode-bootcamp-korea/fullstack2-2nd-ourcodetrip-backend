import express from 'express';
import { categoryController } from '../controllers';

const router = express.Router();

router.get('/service', categoryController.getServiceCategories);
router.get('/main', categoryController.getMainCategories);
router.get('/main&sub', categoryController.getMainAndSubCategories);
router.get('/city', categoryController.getCityCategories);

export default router;
