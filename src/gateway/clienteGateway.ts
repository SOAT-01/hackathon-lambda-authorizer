import { createConnection } from "@/external/postgres/createConnection";

export const getClienteByCpf = async (cpf: string) => {
  const connection = await createConnection();
  const result = await connection.query(
    `SELECT * FROM clientes WHERE cpf = '${cpf}';`
  );
  connection.close();
  return result;
};
