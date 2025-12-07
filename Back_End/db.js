import sql from "mssql";

const config = {
  user: 'sa',
  password: 'TempP4ssw0rd',
  server: 'localhost',
  database: 'OnlineStore',
  options: {
    trustServerCertificate: true
  }
};

export async function getPool(){
  try{
    const pool = await sql.connect(config);
    return pool;
  }catch(err){
    console.error("DB Connection Error:", err);
    throw err;
  }
}
