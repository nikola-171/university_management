const con =  require('../library/mysql_connection');

exports.izmeni_univerzitet = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        const {id, naziv, drzava, grad} = req.body;
        let data = {};
        data['title'] = 'izmeni univerzitet';
        if(!id || !naziv || !drzava || !grad){
            let message_ = 'prazna polja nisu dozvoljena';
            data['message'] = message_;
            
            let form_data = {id : id, naziv : naziv, drzava : drzava, grad : grad};
            console.log(form_data);
            data['data'] = form_data;
            return res.render('promeni_univerzitet', data);
        }else{
            try{
                await con.con.promise().query('call promeni_univerzitet(?,?,?,?)', [id, naziv, drzava, grad])
                .then(([row])=>{
               
                    return res.redirect('/admin/prikaz_univerziteta');
                });
            }catch(error){
                console.log(error);
                return res.status(500).render('error',{});
            }
        }

    }else{
        return res.redirect('/administrator_logovanje');
    }
};