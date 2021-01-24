const con = require('../library/mysql_connection');

exports.dodaj_novog_profesora_predmetu = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
       
        const {profesor, predmet, tip_profesora} = req.body;
        if(!profesor || !predmet || !tip_profesora){
            
            return res.redirect('/admin/dodaj_profesora_predmetu');
        }else{
          
            try{
                await con.con.promise().query('call dodaj_profesor_predmet_par(?,?,?)',
                                     [profesor, predmet, tip_profesora])
                .then(([row]) => {
                    console.log(row);
                    return res.redirect('/admin/dodaj_profesora_predmetu');
                });
            }catch(error){
                console.log(error);
                return res.render('error', {});
            }
        }
    }else{
        return res.redirect('/administrator_logovanje');
    }
}