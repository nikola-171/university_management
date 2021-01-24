const con = require('../library/mysql_connection');

exports.izbrisi_departman = async (req, res) => {
    let session = req.session;

    if(session.admin_logged != undefined){
        
        const {departman_id} = req.body;

        if(!departman_id){
            return res.redirect('/admin/dodaj_departman');
        }

        try{
            await con.con.promise().query('call izbrisi_smer(?)', [departman_id])
            .then(([row]) => {
                console.log(row);
                return res.redirect('/admin/dodaj_departman');
            });
        }catch(error){
            console.log(error);
            return res.render('error', {});
        }

    }else{
        return res.redirect('/administrator_logovanje');
    }
};