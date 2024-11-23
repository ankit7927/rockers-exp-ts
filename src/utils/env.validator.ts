const envNames = ["NODE_ENV", "MONGO_URL", "REDIS_URL"];

const validateEnv = () => {
  envNames.map((env: string) => {
    if (!process.env[env]) {
      console.error("required env variables are not defined");
    }
  });
};

export default validateEnv;
