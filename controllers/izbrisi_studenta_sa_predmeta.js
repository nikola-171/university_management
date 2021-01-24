const con = require('../library/mysql_connection');

exports.izbrisi_studenta_sa_predmeta = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        const {student, predmet} = req.body;

        try{
            await con.con.promise().query('call izbrisi_studenta_sa_predmeta(?,?)', [student, predmet])
            .then(([row]) => {
                console.log(row);
            });
        }catch(error){
            console.log('greska prilikom brisanja studenta sa predmeta');
            console.log(error);
            return res.status(500).render('error', {});
        }

        return res.redirect('/admin/student_slusa_predmet');
    }else{
        return res.redirect('/administrator_logovanje');
    }
};