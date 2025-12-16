import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  // const dbVersionResult = await database.query("SELECT version();");
  const dbVersionResult = await database.query("SHOW server_version;");
  const dbVersionValue = dbVersionResult.rows[0].server_version;

  const dbMaxConnectionsResult = await database.query("SHOW max_connections;");
  const dbMaxConnectionsValue = parseInt(
    dbMaxConnectionsResult.rows[0].max_connections,
  );

  // const dbOpenedConnectionsResult = await database.query(
  //   // `SELECT COUNT(datname)::int FROM pg_stat_database WHERE datname = $1;`,
  //   `SELECT COUNT(datname)::int FROM pg_stat_activity WHERE datname = $1;`,
  //   [process.env.POSTGRES_DB],
  // );
  const dbOpenedConnectionsResult = await database.query({
    text: `SELECT COUNT(datname)::int FROM pg_stat_activity WHERE datname = $1;`,
    values: [process.env.POSTGRES_DB],
  });

  const dbOpenedConnectionsValue = dbOpenedConnectionsResult.rows[0].count;

  const responseBody = {
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersionValue,
        max_connections: dbMaxConnectionsValue,
        opened_connections: dbOpenedConnectionsValue,
      },
    },
  };

  response.status(200).json(responseBody);
}

export default status;
