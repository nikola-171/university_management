const con = require('../library/mysql_connection');

exports.azuriraj_status_studenata = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        const {fakultetska_godina} = req.body;

        try{
            await con.con.promise().query('call unos_nove_fakultetske_godine(?)',[fakultetska_godina])
            .then(([row]) => {
                console.log(row);
            });
        }catch(error){
            console.log('doslo je do greske prilikom azuriranja statusa studenata');
            console.log(error);
            return res.status(500).render('error', {});
        }

        return res.redirect('/admin/pocetna_strana');
    }else{
        return res.redirect('/administrator_logovanje');
    }
};