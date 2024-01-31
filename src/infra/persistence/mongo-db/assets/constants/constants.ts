import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_DB_HOUSI_CHALLENGE = 'mongo_database_connection:housi_challenge';

const MONGO_DB_CONNECTION_URI = `${process.env.MONGO_DB_CONNECTION_URI}/${process.env.MONGO_DB_DATABASE_NAME}?${process.env.MONGO_DB_CONNECTION_QUERY_OPTIONS}`;

export { MONGO_DB_HOUSI_CHALLENGE, MONGO_DB_CONNECTION_URI };
