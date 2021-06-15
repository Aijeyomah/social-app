import 'dotenv/config';

export default {
  DATABASE_URL: process.env.STREAM_POSTGRES_DEV_URL,
  GOOGLE_CALLBACK_URL:process.env.GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
};
