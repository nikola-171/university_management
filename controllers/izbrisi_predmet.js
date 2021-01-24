const con = require('../library/mysql_connection');

exports.izbrisi_predmet = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        const {predmet} = req.body;

        try{
            await con.con.promise().query('call izbrisi_predmet(?)', [predmet])
            .then(([row]) => {
                console.log(row);
            });
        }catch(error){
            console.log('doslo je do greske prilikom brisanja predmeta');
            console.log(error);
            return res.status(500).render('error', {});
        }

        return res.redirect('/admin/upravljanje_predmetima');
    }else{
        return res.redirect('/administrator_logovanje');
    }
};