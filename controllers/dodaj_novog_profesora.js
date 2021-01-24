const con = require('../library/mysql_connection');

exports.dodaj_novog_profesora = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        let data = {};
        data['title'] = 'upravljanje profesorima';

        const {ime, prezime, dan, mesec, godina,
               email, telefon, korisnicko_ime,
               lozinka, lozinka_ponovo} = req.body;
        
        if(!ime || !prezime || !dan || !mesec || !godina ||
           !email || !telefon || !korisnicko_ime || !lozinka || !lozinka_ponovo){

                data['error'] = 'prazna polja nisu dozvoljena';
                return res.render('upravljanje_profesorima', data);


        }else if(lozinka !== lozinka_ponovo){
            data['error'] = 'lozinke se ne poklapaju';
            return res.render('upravljanje_profesorima', data);

        }else{
            try{
                await con.con.promise().query('call dodaj_novog_profesora(?,?,?,?,?,?,?,?,?)',
                                    [ime, prezime, godina, mesec, dan,
                                     telefon, email, korisnicko_ime, lozinka])
                .then(([row]) => {
                    console.log(row);
                    data['success'] = 'uspešno registrovan profesor';
                    return res.render('upravljanje_profesorima', data);
                });
            }catch(error){
                console.log(error);
                return res.status(500).render('error',{});
            }
      }

    }else{
        return res.redirect('/administrator_logovanje');
    }
};