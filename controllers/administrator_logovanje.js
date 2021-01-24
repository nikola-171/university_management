exports.administrator_logovanje = (req, res) => {
    /*ukoliko je admin ulogovan preusmeri se na njegovu početnu stranicu */
    let session = req.session;
    if(session.admin_logged != undefined){
        return res.redirect('/admin/pocetna_strana');
    }else{
        let parametri = {};
    
        parametri['title'] = 'administrator logovanje';
    
        return res.render('administrator_logovanje',parametri);
    }
};