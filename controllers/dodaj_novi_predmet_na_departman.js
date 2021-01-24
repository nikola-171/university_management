const con = require('../library/mysql_connection');

exports.dodaj_novi_predmet_na_departman = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        
        const {departman, predmet} = req.body;

        if(!departman || !predmet){

            return res.redirect('/admin/dodaj_predmet_departmanu');

        }else{
            try{
                await con.con.promise().query('call dodaj_predmet_smer_par(?,?)', [predmet, departman])
                .then(([row]) => {
                    console.log(row);
                    return res.redirect('/admin/dodaj_predmet_departmanu');

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