
exports.administrator_registracija = function(req, res){
    /*ukoliko je admin ulogovan, preusmeri se na njegovu početnu stranicu */
    let session = req.session;
    if(session.admin_logged != undefined){
        return res.redirect('/admin/home_page');
    }
    let parametri = {};
    
    parametri['title'] = 'administrator registracija';

    res.render('administrator_registracija',parametri);
}