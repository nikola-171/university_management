const con = require('../library/mysql_connection');

exports.student_slusa_predmet = async(req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        let data = {};
        data['title'] = 'student sluša predmet';

        try{
            await con.con.promise().query('call daj_sve_predmete()')
            .then(([rows]) => {
                let predmeti = [];
                for(let i = 0; i < rows[0].length; i++){
                    predmeti.push(rows[0][i]);
                }
                data['predmeti'] = predmeti;
            });

            await con.con.promise().query('call daj_studente_koji_nisu_diplomirali()')
            .then(([rows]) => {
                let studenti = [];
                for(let i = 0; i < rows[0].length; i++){
                    studenti.push(rows[0][i]);
                }
                data['studenti'] = studenti;
            });

            await con.con.promise().query('call daj_studente_sa_predmetima_koje_slusaju()')
            .then(([rows]) => {
                let priv = [];
                for(let i = 0; i < rows[0].length; i++){
                    priv.push(rows[0][i]);
                }
                data['data'] = priv;
            });
        }catch(error){
            console.log(error);
            return res.status(500).render('error',{});
        }
        if(req.useragent.isMobile){
            data['mobilni'] = true;
        }

        return res.render('student_slusa_predmet', data);
    }else{
        return res.redirect('/administrator_logovanje');
    }
};