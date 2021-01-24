const con = require('../library/mysql_connection');

exports.prikaz_univerziteta = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        let data = {};
        data['title'] = 'prikaz univerziteta';
        try{
            await con.con.promise().query('call daj_sve_univerzitete()')
            .then(([rows])=>{
                let unis = []
           
                for(let i = 0; i < rows[0].length;i++){
                    unis.push(rows[0][i]);
                }
                data['universities'] = unis;
                if(req.useragent.isMobile){
                    data['mobilni'] = true;
                }

                return res.render('prikaz_univerziteta', data);
            });
        }catch(error){
            console.log(error);
            return res.status(500).render('error',{});
        }
    }else{
       
        return res.redirect('/administrator_logovanje');
    }};