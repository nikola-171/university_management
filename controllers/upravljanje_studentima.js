const con = require('../library/mysql_connection');

exports.upravljanje_studentima = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        let data = {};
        data['title'] = 'upravljanje studentima';
        try{
        await con.con.promise().query('call daj_sve_smerove()')
            .then(([rows]) => {
                let departmani = [];
                for(let i = 0; i < rows[0].length; i++){
                    departmani.push(rows[0][i]);
                }
                data['departmani'] = departmani;
                res.render('upravljanje_studentima', data);
            });
        }catch(error){
            console.log('doslo je do greske prilikom ucitavanja stranice - upravljanje studentima -');
            console.log(error);
            return res.render('error',{});
        }
    }else{
        return res.redirect('/administrator_logovanje');
    }
};