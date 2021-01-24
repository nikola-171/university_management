const con =  require('../library/mysql_connection');


exports.promeni_univerzitet = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        if(req.query.id != undefined){
            const id = req.query.id;
            let data = {};
            data['title'] = 'izmeni univerzitet';

            try{
                await con.con.promise().query('call daj_univerzitet(?)', [id])
                .then(([row, fields]) => {
                    if(row[0][0] != undefined){
                        console.log(row[0][0]);
                        let univerzitet = row[0][0];
                        data['data'] = univerzitet;
                        return res.render('promeni_univerzitet', data);
                    }else{
                        /*traženi univerzitet ne postoji, stoga nema šta da se promeni */
                        let poruka = 'traženi univerzitet ne postoji';
                        data['error'] = poruka;
                        return res.render('promeni_univerzitet', data);
                    }
                });
            }catch(error){
                console.log(error);
                return res.status(500).render('error',{});
            }

        }else{
            let poruka = 'traženi univerzitet ne postoji';
            data['error'] = poruka;
            return res.render('promeni_univerzitet', data); 
        }
    }else{
        return res.redirect('/administrator_logovanje'); 
    }
};