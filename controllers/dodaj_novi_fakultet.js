const con =  require('../library/mysql_connection');

exports.dodaj_novi_fakultet = async (req, res) => {
    /*ako admin nije ulogovan zabrani pristup */
    let session = req.session;
    if(session.admin_logged != undefined){
        
        const {univerzitet, naziv_fakulteta, grad} = req.body;     
        let data = {};
        data['title'] = 'upravljanje fakultetima';

        try{
            await con.con.promise().query('call daj_sve_univerzitete()')
            .then(([rows]) => {
                let unis = [];
                for(let i = 0; i < rows[0].length; i++){
                    unis.push(rows[0][i]);
                }
                data['data'] = unis;
            });

            await con.con.promise().query('call daj_sve_fakultete')
            .then(([rows]) => {
                let fakulteti = [];
                for(let i = 0; i < rows[0].length; i++){
                    fakulteti.push(rows[0][i]);
                }
                data['fakulteti'] = fakulteti;
            });

        
            if(!univerzitet || !naziv_fakulteta || !grad){
                /*ukoliko postoji neko prazno polje */

                let message = 'prazna polja nisu dozvoljena';
                data['empty_error'] = message;

                if(data['data'].length <= 0){
                    let empty = 'trenutno ne postoje registrovani univerziteti';
                    data['empty_error'] = empty;
                }

                return res.render('upravljanje_fakultetima', data);
         
            }else{
                /*ukoliko su svi uslovi ispunjeni, nema praznih polja i izabran je neki univerzitet, onda
                ide upis fakulteta u bazi */
                await con.con.promise().query('call dodaj_fakultet(?,?,?)', [naziv_fakulteta, grad, univerzitet])
                .then(([rows])=>{
                    console.log(rows);
                    return res.redirect('/admin/upravljanje_fakultetima');
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