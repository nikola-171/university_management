const con = require('../library/mysql_connection');

exports.izbrisi_profesora_sa_predmeta = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        const {profesor, predmet} = req.body;

        try{
            await con.con.promise().query('call izbrisi_profesora_sa_predmeta(?,?)', [profesor, predmet])
            .then(([row]) => {
                console.log(row);
            });
        }catch(error){
            console.log('doslo je do greske prilikom brisanja profesora sa predmeta');
            console.log(error);
            return res.status(500).render('error', {});
        }

        return res.redirect('/admin/dodaj_profesora_predmetu');
    }else{
        return res.redirect('/administrator_logovanje');
    }
};