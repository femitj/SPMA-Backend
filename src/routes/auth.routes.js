import { Router } from 'express';
import Auth from '../controllers/Auth';
// import validator from '../middlewares/validator';

const authRoute = Router();

authRoute.post('/signup', Auth.create);

authRoute.post('/login', Auth.login);

authRoute.get('/all_users', Auth.allUsers);

export default authRoute;
