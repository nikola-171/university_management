
const con = require('../library/mysql_connection');


exports.dodaj_novog_studenta = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        const {ime, prezime, godina, mesec,
               dan, mesto_boravka, ulica, broj,
               email, telefon, departman, status,
               korisnicko_ime, lozinka, lozinka_ponovo} = req.body;
        
        let data = {};
        let departmani = [];

        try{
            await con.con.promise().query('call daj_sve_smerove()')
            .then(([rows]) => {
                for(let i = 0; i < rows[0].length; i++){
                    departmani.push(rows[0][i]);
                }
                data['departmani'] = departmani;
            });

            data['title'] = 'dodaj novog studenta';
            if(!ime || !prezime || !godina || !mesec || !dan ||
                !mesto_boravka || !ulica || !broj || !email || !telefon || !departman ||
                !korisnicko_ime || !lozinka || !lozinka_ponovo){

                let message = 'prazna polja nisu dozvoljena';
                data['error'] = message;
                return res.render('upravljanje_studentima', data);

            }else{
                if(lozinka != lozinka_ponovo){
                    let message = 'lozinke se ne poklapaju';
                    data['error'] = message;
                    return res.render('upravljanje_studentima', data);
                }
           
            
                await con.con.promise().query('call dodaj_novog_studenta(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                    [departman, ime, prezime, godina, mesec, dan,
                    mesto_boravka, ulica, broj, telefon, email, status,korisnicko_ime, lozinka])
                .then(([row]) => {
                    console.log(row);
                    let message = 'uspešno dodat student';
                    data['success'] = message;
                    return res.render('upravljanje_studentima', data);

                });
            }
        }catch(error){
            console.log(error);
            return res.status(500).render('error',{});
        }

    }else{
        return res.redirect('/administrator_logovanje');
    }
};