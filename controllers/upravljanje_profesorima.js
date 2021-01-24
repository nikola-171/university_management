
const con = require('../library/mysql_connection');

exports.upravljanje_profesorima = async (req, res) => {
    let session = req.session;
    if(session.admin_logged != undefined){
        let data = {};
        data['title'] = 'upravljanje profesorima';

        return res.render('upravljanje_profesorima', data);
    }else{
        return res.redirect('/administrator_logovanje');
    }
};