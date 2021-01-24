
const con = require('../library/mysql_connection');

exports.izbrisi_fakultet = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        const {fakultet_id} = req.body;

        try{
            await con.con.promise().query('call izbrisi_fakultet(?)', [fakultet_id])
            .then(([row]) => {
                console.log(row);

                return res.redirect('/admin/prikaz_fakulteta');
             });
        }catch(error){
            console.log(error);
            return res.status(500).render('error',{});
        }
    }else{
        return res.redirect('/administrator_logovanje');
    }
};