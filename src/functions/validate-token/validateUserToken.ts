import { Callback, Context } from "aws-lambda";
import jwt from "jsonwebtoken";
import { getUsuarioByMatricula } from "@/gateway/usuarioGateway";

const validateUserToken = async (
  event: any,
  _: Context,
  callback: Callback
) => {
  const [tokenType, token] = event?.headers?.authorization?.split(" ") || [
    "",
    "",
  ];

  if (tokenType !== "Bearer" || !token) {
    return callback(null, { isAuthorized: false });
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.PUBLIC_KEY) as {
      matricula?: string;
    };

    const user = await getUsuarioByMatricula(verifiedToken.matricula);

    if (user.length === 0) {
      return callback(null, { isAuthorized: false });
    }

    return callback(null, { isAuthorized: true });
  } catch (error) {
    console.error(error);
    return callback(null, { isAuthorized: false });
  }
};

module.exports.handler = validateUserToken;
