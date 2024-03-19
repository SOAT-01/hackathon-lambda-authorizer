const ApiResponse = (statusCode = 500, data = {}) => {
  return {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Credentials": true,
    },
    statusCode,
    body: JSON.stringify(data),
  };
};

export default ApiResponse;
