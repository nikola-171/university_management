const con =  require('../library/mysql_connection');

exports.upravljanje_fakultetima = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        /*uzimam listu svih univerziteta */
        let data = {};
        data['title'] = 'upravljanje fakultetima';

        try{
            await con.con.promise().query('call daj_sve_fakultete()')
            .then(([rows]) => {
                let fakulteti = [];
                for(let i = 0; i < rows[0].length; i++){
                    fakulteti.push(rows[0][i]);
                }
                data['fakulteti'] = fakulteti;
            });

            await con.con.promise().query('call daj_sve_univerzitete()')
            .then(([rows]) => {
                let unis = [];
                for(let i = 0; i < rows[0].length; i++){
                    unis.push(rows[0][i]);
                }
                data['data'] = unis;
            });
        }catch(error){
            console.log('doslo je do greske prilikom ucitavanja stranice - upravljanje fakultetima-');
            console.log(error);
            return res.status(500).render('error',{});
        }

        if(data['data'].length <= 0){
            let message = 'trenutno ne postoje registrovani univerziteti';
            data['error'] = message;
        }
        
        return res.render('upravljanje_fakultetima', data);


    }else{
        return res.redirect('/administrator_logovanje');

    }
};