
const con = require('../library/mysql_connection');

exports.izbrisi_profesora = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        const {id} = req.body;
        try{
            await con.con.promise().query('call izbrisi_profesora(?)', [id])
            .then(([row]) => {
                console.log(row);
            });
        }catch(error){
            console.log(error);
            return res.render('error', {});
        }

        return res.redirect('/admin/prikaz_profesora');

    }else{
        return res.redirect('/administrator_logovanje');
    }

};