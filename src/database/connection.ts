import client from './config';

const databaseInit = async (): Promise<void> => {
  await client.connect();
  console.log('Database connected.');
};

export default databaseInit;