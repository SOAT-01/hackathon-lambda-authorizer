import { Callback, Context } from "aws-lambda";
import jwt from "jsonwebtoken";
import { getClienteByCpf } from "@/gateway/clienteGateway";

const validateUserToken = async (
  event: any,
  _: Context,
  callback: Callback
) => {
  const [tokenType, token] = event?.headers?.authorization?.split(" ");

  if (tokenType !== "Bearer") {
    return callback(null, { isAuthorized: false });
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.PUBLIC_KEY) as {
      cpf?: string;
    };

    if (!!verifiedToken?.cpf) {
      const results = await getClienteByCpf(verifiedToken?.cpf);
      if (results[0].length === 0) {
        return callback(null, { isAuthorized: false });
      }
    }

    return callback(null, { isAuthorized: true });
  } catch (error) {
    console.error(error);
    return callback(null, { isAuthorized: false });
  }
};

module.exports.handler = validateUserToken;
