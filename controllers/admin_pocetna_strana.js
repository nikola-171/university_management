const con = require('../library/mysql_connection');

exports.admin_pocetna_strana = async (req, res) =>{
    /*ukoliko je admin nije ulogovan preusmeri se na stranici za logovanje admina */
    let session = req.session;
    if(session.admin_logged != undefined){
        let data = {};
        data['title'] = 'admin početna strana';
        try{
           
            await con.con.promise().query('call daj_administratora()')
            .then(([row])=> {
                data['admin'] = row[0][0];
                res.render('administrator_pocetna_strana', data);

           });
        }catch(error){
            console.log(error);
            res.status(500).render('error', {});
        }

    }else{
        res.redirect('/administrator_logovanje');
    }
}