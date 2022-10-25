import dotenv from "dotenv";
dotenv.config();

const cache = {};

const accessEnv = (key: string) => {
  if (!(key in process.env)) {
    throw new Error(`${key} not found in process.env!`);
  }

  if (cache[key]) {
    return cache[key];
  }

  cache[key] = process.env[key];

  return process.env[key];
};

export default accessEnv;
