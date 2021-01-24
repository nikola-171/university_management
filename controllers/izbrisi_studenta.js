const con = require('../library/mysql_connection');

exports.izbrisi_studenta = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        const {id} = req.body;
        console.log(id);
        try{
            await con.con.promise().query('call izbrisi_studenta(?)', [id])
            .then(([row]) => {
                console.log(row);
            });
        }catch(error){
           
            console.log(error);
            return res.render('error',{});
        }
        return res.redirect('/admin/prikaz_studenata');

    }else{
        return res.redirect('/administrator_logovanje');
    }
};