
const con = require('../library/mysql_connection');

exports.prikaz_profesora = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){

        let data = {};
        data['title'] = 'prikaz profesora';

        try{
            await con.con.promise().query('call daj_sve_profesore()')
            .then(([rows]) => {
                let profesori = [];
                for(let i = 0; i < rows[0].length; i++){
                    profesori.push(rows[0][i]);
                }
                data['profesori'] = profesori;
            });

        }catch(error){
            console.log(error);
            return res.render('error', {});
        }

        if(req.useragent.isMobile){
            data['mobilni'] = true;
        }
        return res.render('prikaz_profesora',data)
    }else{
        return res.redirect('/administrator_logovanje');
    }
};