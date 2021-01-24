const con = require('../library/mysql_connection');

exports.izbrisi_predmet_sa_departmana = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        const {predmet, smer} = req.body;

        try{
            await con.con.promise().query('call izbrisi_predmet_sa_smera(?,?)', [predmet, smer])
            .then(([row]) => {
                console.log(row);
            });
        }catch(error){
            console.log('doslo je do greske prilikom brisanja predmeta sa smera');
            console.log(error);
            return res.status(500).render('error', {});
        }

        return res.redirect('/admin/dodaj_predmet_departmanu');
    }else{
        return res.redirect('/administrator_logovanje');
    }
};