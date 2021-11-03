import express from 'express';
import { categoryController } from '../controllers';

const categoryRouter = express.Router();

categoryRouter.get('/service', categoryController.getServiceCategories);
categoryRouter.get('/main', categoryController.getMainCategories);
categoryRouter.get('/main&sub', categoryController.getMainAndSubCategories);
categoryRouter.get('/city', categoryController.getCityCategories);

export default categoryRouter;
