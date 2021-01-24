const con = require('../library/mysql_connection');

exports.dodaj_departman = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined) {
        let data = {};
        data['title'] = 'dodaj departman';
        /*uzimamo sve smerove iz baze */

        try{
            await con.con.promise().query('call daj_sve_smerove()')
            .then(([rows]) => {
                 let departmani = [];
                for(let i = 0; i < rows[0].length; i++){
                    departmani.push(rows[0][i]);
                }
                data['departmani'] = departmani;
            });
            /*uzimamo sve fakultete iz baze */

            await con.con.promise().query('call daj_sve_fakultete()')
            .then(([rows]) => {
                let fakulteti = [];
                for(let i = 0; i < rows[0].length; i++){
                    fakulteti.push(rows[0][i]);
                }
                data['fakulteti'] = fakulteti;
            });

            await con.con.promise().query('call prikaz_smerova_po_fakultetima_i_univerzitetima()')
            .then(([rows]) => {
                let priv = [];
                for(let i = 0; i < rows[0].length; i++){
                    priv.push(rows[0][i]);
                }
                data['data'] = priv;
            });
        }catch(error){
            console.log(error);
            res.status(500).render('error', {});
         }

         if(req.useragent.isMobile){
            data['mobilni'] = true;
         }

        return res.render('dodaj_departman', data);

    }else{
        return res.redirect('/administrator_logovanje');
    }
};