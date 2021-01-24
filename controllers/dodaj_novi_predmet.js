
const con = require('../library/mysql_connection');

exports.dodaj_novi_predmet = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        let data = {};
        data['title'] = 'upravljanje predmetima';

        const {naziv, godina, semestar, espb} = req.body;

        if(!naziv || !godina || !semestar || !espb){
            return res.redirect('/admin/upravljanje_predmetima');
        }else{
            try{
                await con.con.promise().query('call dodaj_novi_predmet(?,?,?,?)', [naziv, godina, semestar, espb])
                .then(([row]) => {
                    console.log(row);
                    return res.redirect('/admin/upravljanje_predmetima');

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