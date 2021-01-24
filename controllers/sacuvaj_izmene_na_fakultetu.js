const con =  require('../library/mysql_connection');

exports.sacuvaj_izmene_na_fakultetu = async (req, res) => {
    let session = req.session;
    let data = {};
    data['title'] = 'izmena fakulteta';
    if(session.admin_logged != undefined){
        const {fakultet_id, fakultet_naziv, fakultet_grad} = req.body;

        if(!fakultet_id || !fakultet_naziv || !fakultet_grad){
            /*prazna polja nisu dozvoljena */
            const fakultet = {id : fakultet_id, naziv : fakultet_naziv, mesto : fakultet_grad};
            data['fakultet'] = fakultet;
            data['empty_fields'] = 'prazna polja nisu dozvoljena';
            return res.render('izmeni_fakultet', data);
        }else{
            try{
                await con.con.promise().query('call promeni_fakultet(?,?,?)',[fakultet_id, fakultet_naziv, fakultet_grad])
                .then(([row]) => {
                    data['success'] = 'uspešno sačuvane izmene';
                    const faculty = {id : fakultet_id, naziv : fakultet_naziv, mesto : fakultet_grad};
                    data['fakultet'] = faculty;
                    return res.render('izmeni_fakultet', data);
                });
            }catch(error){
                console.log(error);
                return res.status(500).render('error',{});
            }
        }

    }else{
        /*admin nije ulogovan */
        return res.redirect('/administrator_logovanje');

    }
};