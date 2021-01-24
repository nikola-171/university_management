exports.admin_logout = (req, res) => {
    /*prazni sesiju i preusmeri na početnu stranicu */
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect('/');
    });
};