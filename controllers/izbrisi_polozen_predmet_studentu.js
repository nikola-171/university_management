const con = require('../library/mysql_connection');

exports.izbrisi_polozen_predmet_studentu = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        const {predmet, student} = req.body;

        try{
            await con.con.promise().query('call izbrisi_polozen_ispit_studentu(?,?)', [student, predmet])
            .then(([row]) => {
                console.log(row);
            });
        }catch(error){
            console.log('doslo je do greske prilikom brisanja polozenog predmeta studentu');
            console.log(error);
            return res.status(500).render('error', {});
        }

        return res.redirect('/admin/student_polozio_predmet');
    }else{
        return res.redirect('/administrator_logovanje');
    }
};