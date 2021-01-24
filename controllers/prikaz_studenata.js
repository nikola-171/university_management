const con = require('../library/mysql_connection');

exports.prikaz_studenata = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        let data = {};
        data['title'] = 'prikaz studenata';
        try{
            await con.con.promise().query('call daj_sve_studente()')
            .then(([rows]) => {
                let studenti = [];
                for(let i = 0; i < rows[0].length; i++){
                    studenti.push(rows[0][i]);
                }
                data['studenti'] = studenti;
                console.log(studenti);
            });
        }catch(error){
            console.log(error);
            return res.render('error', {});
        }

        if(req.useragent.isMobile){
            data['mobilni'] = true;
        }
        return res.render('prikaz_studenata', data);
    }else{
        return res.redirect('/administrator_logovanje');
    }
};