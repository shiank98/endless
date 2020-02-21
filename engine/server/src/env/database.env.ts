/**
 * The constants for connecting to the MongoDB database instance.
 */
const con = {
  user: 'DB_USER',
  pass: 'DB_PASS',
  db: 'DB_NAME',
  cluster: 'DB_CLUSTER',
  instance: 'DB_INSTANCE',
  port: 'DB_PORT'
};

/**
 * The constant containing the Mongoose config data required to connect to the database.
 */
export const db = {
  uri: `mongodb://${con.user}:${con.pass}@${con.cluster}-shard-00-00-${con.instance}.mongodb.net:${con.port},${con.cluster}-shard-00-01-${con.instance}.mongodb.net:${con.port},${con.cluster}-shard-00-02-${con.instance}.mongodb.net:${con.port}/${con.db}?ssl=true&replicaSet=${con.cluster}-shard-0&authSource=admin&retryWrites=true&w=majority`,

  settings: {
    useNewUrlParser: true,
  }
};
