
const con = require('../library/mysql_connection');

exports.upravljanje_predmetima = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        let data = {};
        data['title'] = 'upravljanje predmetima';

        try{

            await con.con.promise().query('call daj_predmete_koji_nisu_na_nekom_departmanu()')
            .then(([rows]) => {
                let predmeti = [];
                for(let i = 0; i < rows[0].length; i++){
                    predmeti.push(rows[0][i]);
                }
                data['predmeti'] = predmeti;
            });
    
        }catch(error){
            console.log(error);
            return res.render('error', {});
        }
        if(req.useragent.isMobile){
            data['mobilni'] = true;
        }
        return res.render('upravljanje_predmetima', data);
    }else{
        return res.redirect('/administrator_logovanje');
    }
};