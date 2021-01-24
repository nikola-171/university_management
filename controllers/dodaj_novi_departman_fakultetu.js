const con = require('../library/mysql_connection');

exports.dodaj_novi_departman_fakultetu = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        const {fakultet, nivo_studija, naziv_departmana, espb, trajanje} = req.body;
        let data = {};
        data['title'] = 'dodaj departman';

        try{
            await con.con.promise().query('call daj_sve_smerove()')
            .then(([rows]) => {
                let departmani = [];
                for(let i = 0; i < rows[0].length; i++){
                    departmani.push(rows[0][i]);
                }
                data['departmani'] = departmani;
            });

            await con.con.promise().query('call daj_sve_fakultete()')
            .then(([rows]) => {
                let fakulteti = [];
                for(let i = 0; i < rows[0].length; i++){
                    fakulteti.push(rows[0][i]);
                }
                data['fakulteti'] = fakulteti;
            });

            if(!fakultet || !nivo_studija || !naziv_departmana || !espb || !trajanje){
                let message = 'prazna polja nisu dozvoljena';
                data['error'] = message;
          
                return res.render('dodaj_departman', data);
            }else{
            await con.con.promise().query('call dodaj_smer(?,?,?,?,?)', [fakultet, nivo_studija, naziv_departmana, espb, trajanje])
                .then(([row]) => {
                    console.log(row);
                    return res.redirect('/admin/dodaj_departman');
                }); 
            }
        }catch(error){
            console.log(error);
            res.status(500).render('error', {});
        }
    }else{
        return res.redirect('/administrator_logovanje');
    }
};