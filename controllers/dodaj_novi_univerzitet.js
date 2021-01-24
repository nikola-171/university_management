const con =  require('../library/mysql_connection');

exports.dodaj_novi_univerzitet = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        const {univerzitet_ime, zemlja, grad} = req.body;
        let data = {};
        data['title'] = 'upravljanje univerzitetima';

        if(!univerzitet_ime || !zemlja || !grad){
            let message = 'prazna polja nisu dozvoljena';
            data['university_error'] = message;
            return res.render('upravljanje_univerzitetima', data);
        }
    
        try{
        await con.con.promise().query('call upis_univerziteta(?,?,?)', [univerzitet_ime, zemlja, grad])
            .then(([row]) => {
                let message = 'uspešno registrovan';
                data['university_success'] = message;
                return res.render('upravljanje_univerzitetima', data);
            });
        }catch(error){
            console.log(error);
            res.status(500).render('error', {});
        }
    }else{
        return res.redirect('/administrator_logovanje'); 
    }
};