const errorThrow = (message: string, status: number) => {
  throw new Error(JSON.stringify({ message, status }));
};

export default errorThrow;
