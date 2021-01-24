exports.upravljanje_univerzitetima = (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        let data = {};
        data['title'] = 'upravljanje univerzitetima';
        return res.render('upravljanje_univerzitetima', data);

    }else{
        return res.redirect('/administrator_logovanje');
    }
}