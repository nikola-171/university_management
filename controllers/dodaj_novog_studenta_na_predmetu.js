const con = require('../library/mysql_connection');

exports.dodaj_novog_studenta_na_predmetu = async(req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        const {student, predmet} = req.body;

        if(!student || !predmet){
            
            return res.redirect('/admin/student_slusa_predmet');
        }else{
          
            try{
                await con.con.promise().query('call dodaj_student_slusa_predmet_par(?,?)', [student, predmet])
                .then(([row]) => {
                
                    console.log(row);
                    return res.redirect('/admin/student_slusa_predmet');
                });
            }catch(error){
                console.log(error);
                return res.render('error', {});
            }
        }
    }else{

        return res.redirect('/administrator_logovanje');
    }
};