const con =  require('../library/mysql_connection');

exports.izmeni_fakultet = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        let data = {};
        const message = 'fakultet koji tražite ne postoji';

        data['title'] = 'izmeni fakultet';

        if(req.query.id != undefined){

            const id = req.query.id;

            try{
                await con.con.promise().query('call daj_fakultet(?)', [id])
                .then(([row]) => {
                    /*mozda ne postoji? */
                    console.log(row[0][0]);
                    if(row[0][0] != undefined){
                         /*postoji */
                        data['fakultet'] = row[0][0];
                        return res.render('izmeni_fakultet', data);

                    }else{
                        /*traženi fakultet ne postoji */
                        data['empty'] = message;
                        return res.render('izmeni_fakultet', data);
                    }
                });
            }catch(error){
                console.log(error);
                return res.status(500).render('error',{});
            }

        }else{
            data['error'] = message;
            return res.render('izmeni_fakultet', data);
        }

      
    }else{
        return res.redirect('/administrator_logovanje');
    }
};