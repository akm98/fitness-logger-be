import dotenvFlow from 'dotenv-flow'

if(process.env.NODE_ENV === 'development') {
dotenvFlow.config();

}

export default {
  ENV : process.env.ENV ,
  PORT: process.env.PORT, 
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  SERVER_URL: process.env.SERVER_URL,
  DATABASE_URL: process.env.DATABASE_URL,
}