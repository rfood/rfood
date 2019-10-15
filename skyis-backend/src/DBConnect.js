import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: process.env.MARIA_HOST, port: process.env.MARIA_PORT,
    user: process.env.MARIA_USER, password: process.env.MARIA_PW,
    connectionLimit: 5
});

export const dbCon = () => {
    pool.getConnection()
        .then(conn => {
            conn.query("SELECT 1 as val")
                .then((rows) => {
                    console.log(rows);
                    return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
                })
                .then((res) => {
                    console.log(res);
                    conn.end();
                })
                .catch(err => {
                    conn.end();
                })
        }).catch(err => {
    });
}




