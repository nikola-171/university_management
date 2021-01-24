const con = require('../library/mysql_connection');
const bcrypt = require('bcryptjs');

exports.uloguj_administratora = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        return res.redirect('/admin/home_page');
    }
    const neispravni_unos = 'administrator ime ili lozinka nisu ispravni';
    let data = {};
    data['title'] = 'administrator logovanje';

    const {administrator_ime, administrator_lozinka} = req.body;
    if(!administrator_ime || !administrator_lozinka){
        data['error'] = 'prazna polja nisu dozvoljena';
        return res.render('administrator_logovanje', data);
    }
    try{
        await con.con.promise().query('call daj_administratora()')
        .then(([row]) => {
            if(row[0].length > 0){
       
                if(row[0][0].administrator_ime !== administrator_ime){
                /*admin ime nije ispravno */

                    data['error'] = neispravni_unos;
                    return res.render('administrator_logovanje', data);
                }else{
                    bcrypt.compare(administrator_lozinka, row[0][0].administrator_lozinka, (err, result) => {
                        if(err) throw err;

                        if(!result){
                            /*admin lozinka nije ispravna */

                            data['error'] = neispravni_unos;
                            return res.render('administrator_logovanje', data);
                        }else{
                            /*sve je legalno, moze se ulogovati */
                        
                            session.admin_logged = true;
                            return res.redirect('/admin/pocetna_strana');
                        }
                    });
                }
            }else{
                data['error'] = neispravni_unos;
                return res.render('administrator_logovanje', data);
            }
        });
    }catch(error){
        console.log('doslo je do greske prilikom logovanja administratora');
        console.log(error);
        return res.status(500).render('error', data);
    };
};