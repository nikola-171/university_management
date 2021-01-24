const con = require('../library/mysql_connection');

exports.student_polozio_predmet = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        let data = {};
        data['title'] = 'student položio predmet';
        
        try{
            await con.con.promise().query('call daj_studente_koji_nisu_diplomirali()')
            .then(([rows]) => {
                let pod = [];
                for(let i = 0; i < rows[0].length; i++){
                    pod.push(rows[0][i]);
                }
                data['data'] = pod;
            });

            await con.con.promise().query('call daj_predmete()')
            .then(([rows]) => {
                let predmeti = [];
                for(let i = 0; i < rows[0].length; i++){
                    predmeti.push(rows[0][i]);
                }
                 data['predmeti'] = predmeti;
            });

            await con.con.promise().query('call daj_student_polozeni_predmeti()')
            .then(([rows]) => {
                let studenti = [];
                for(let i = 0; i < rows[0].length; i++){
                    rows[0][i].datum = String(rows[0][i].datum);
                    studenti.push(rows[0][i]);
                }
                data['studenti'] = studenti;
            });
        }catch(error){
            console.log(error);
            return res.render('error', {});
        }
        if(req.useragent.isMobile){
            data['mobilni'] = true;
        }
        return res.render('student_polozio_predmet',data);
    }else{
        return res.redirect('/administrator_logovanje');
    }
};