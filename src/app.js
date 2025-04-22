import express, { json } from 'express';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
const app = express();

app.use(json());
app.use('/api/users', userRoutes);
app.use('/api/task',taskRoutes);


export default app;
