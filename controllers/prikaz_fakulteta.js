const con =  require('../library/mysql_connection');

exports.prikaz_fakulteta = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        let params = {};
        params['title'] = 'izmeni fakultete';
        /*uzimam sve fakultete za prikaz */
        try{
            await con.con.promise().query('call daj_sve_fakultete()')
            .then(([rows])=>{
                let fakulteti = [];

                for(let i = 0; i < rows[0].length; i++){
                    fakulteti.push(rows[0][i]);
                }
                params['data'] = fakulteti;

                return res.render('prikaz_fakulteta', params);
            });
        }catch(error){
            console.log(error);
            return res.status(500).render('error',{});
        }

    }else{
        return res.redirect('/administrator_logovanje');

    }
    
};