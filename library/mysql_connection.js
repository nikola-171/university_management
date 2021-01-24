var mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({path : './.env'});

/*kreiranje konekcije ka bazi, koristim pool da mi server brze obrađivao zahteve tako što reciklira 
  već korišćene konekcije umesto da svaki put uspostavi novu. */
exports.con = mysql.createPool({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
