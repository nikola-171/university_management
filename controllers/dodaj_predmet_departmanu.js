
const con = require('../library/mysql_connection');

exports.dodaj_predmet_departmanu = async (req, res) =>{
    let session = req.session;
    if(session.admin_logged != undefined){
        let data = {};
        data['title'] = 'dodaj predmet departmanu';

        try{
            await con.con.promise().query('call daj_sve_smerove()')
            .then(([rows]) => {
                let departmani = [];
                for(let i = 0; i < rows[0].length; i++){
                    departmani.push(rows[0][i]);
                }
                data['departmani'] = departmani;
            });

            await con.con.promise().query('call daj_sve_predmete()')
            .then(([rows]) => {
                let predmeti = [];
                for(let i = 0; i < rows[0].length; i++){
                    predmeti.push(rows[0][i]);
                }
                data['predmeti'] = predmeti;
            });

            await con.con.promise().query('call daj_predmete_po_smerovima()')
            .then(([rows]) => {
                let predmeti_na_departmanu = [];
                for(let i = 0; i < rows[0].length; i++){
                    predmeti_na_departmanu.push(rows[0][i]);
                }
                console.log(rows);
                data['predmeti_na_departmanu'] = predmeti_na_departmanu;
            });
        }catch(error){
            console.log(error);
            return res.status(500).render('error',{});
        }
        
        if(req.useragent.isMobile){
            data['mobilni'] = true;
        }
        return res.render('dodaj_predmet_departmanu', data);
    }else{
        return res.redirect('/administrator_logovanje');
    }
};