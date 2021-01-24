const con =  require('../library/mysql_connection');
const bcrypt = require('bcryptjs');


exports.registruj_administratora = async (req, res) => {
    const {administrator_ime, administrator_lozinka, administrator_lozinka_ponovo, email, telefon} = req.body;
    let data = {};
    data['title'] = 'administrator registracija';

    if(!administrator_ime || !administrator_lozinka || !administrator_lozinka_ponovo ||!email || !telefon){
        let message = 'prazna polja nisu dozvoljena';
        data['error'] = message;
        return res.render('administrator_registracija', data);
    }
    if(administrator_lozinka != administrator_lozinka_ponovo){
        let message = 'lozinke se ne poklapaju';
        data['error'] = message;
        return res.render('administrator_registracija', data);
    }
    
    try{
        await con.con.promise().query('call daj_administratora()')
        .then(([row]) => {
            if(row[0].length > 0){
                /*vec postoji administrator u bazi */
                let message = 'administrator je vec registrovan';
                data['exists'] = message;
                return res.render('administrator_registracija', data);
            }else{
                /*upis administraora u bazu */
                bcrypt.hash(administrator_lozinka, 8, (err, hash) => {
                    if (err) throw err;
                    con.con.promise().query('call upis_administratora(?,?,?,?)', [administrator_ime, hash, email, telefon])
                    .then(([row, fields]) => {
                        let message = 'uspesno ste se registrovali';
                        data['success'] = message;
                        return res.render('administrator_registracija', data);
                    });
                });
            }
        });
    }catch(error){
            console.log(error);
            return res.status(500).render('error',{});
    }
};