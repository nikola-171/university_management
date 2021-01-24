const con = require('../library/mysql_connection');

exports.dodaj_novog_studenta_polozio_predmet = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
    
        const {student, predmet, ocena, datum} = req.body;

        if(!student || !predmet || !ocena || !datum){
            return res.redirect('/admin/student_polozio_predmet');
        }else{
            
            try{
                await con.con.promise().query('call dodaj_polozen_ispit_studentu(?,?,?,?)',
                                    [student, predmet, ocena, datum])
                .then(([row]) => {
                    console.log(row);
                });
            }catch(error){
                console.log(error);
                return res.render('error', {});
            }

            return res.redirect('/admin/student_polozio_predmet');
        }

    }else{
        return res.redirect('/administrator_logovanje');
    }
};