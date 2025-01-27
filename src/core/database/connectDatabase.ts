import { sequelizeInstance } from '../../config/sequelize.config';
import { EErrorTypes } from '../enum/errorTypes.enum';
import { AppError } from '../utils/AppError';

// Function to test database connection
const connectToDatabase = async () => {
  try {
    await sequelizeInstance.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    throw new AppError(EErrorTypes.INTERNAL_SERVER_ERROR, 'database Connection failed', error);
  }
};

export {connectToDatabase}