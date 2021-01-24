const con = require('../library/mysql_connection');

exports.dodaj_profesora_predmetu = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        let data = {};
        data['title'] = 'dodaj profesora predmetu';

        try{
            await con.con.promise().query('call daj_sve_predmete()')
            .then(([rows]) => {
                let predmeti = [];
                for(let i = 0; i < rows[0].length; i++){
                    predmeti.push(rows[0][i]);
                }
                data['predmeti'] = predmeti;
            });

            await con.con.promise().query('call daj_sve_profesore()')
            .then(([rows]) => {
                let profesori = [];
                for(let i = 0; i < rows[0].length; i++){
                    profesori.push(rows[0][i]);
                }
                data['profesori'] = profesori;
            });

            await con.con.promise().query('call daj_profesore_po_predmetima()')
            .then(([rows]) => {
                let profesor_na_predmetu = [];
                for(let i = 0; i < rows[0].length; i++){
                    profesor_na_predmetu.push(rows[0][i]);
                }
                data['profesor_na_predmetu'] = profesor_na_predmetu;
            });
        }catch(error){
            console.log(error);
            return res.status(500).render('error',{});
        }
        if(req.useragent.isMobile){
            data['mobilni'] = true;
        }
        return res.render('dodaj_profesora_predmetu', data);
    }else{
        return res.redirect('/administrator_logovanje');
    }
};