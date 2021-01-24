var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var app = express();
const nocache = require('nocache');
const dotenv = require('dotenv');
var useragent = require('express-useragent');


/*GET routers */
var indexRouter = require('./routes/index');
var administrator_logovanje = require('./routes/administrator_logovanje');//gotovo
var admin_pocetna_stranaRouter = require('./routes/admin_pocetna_strana');//gotovo
var upravljanje_univerzitetimaRouter = require('./routes/upravljanje_univerzitetima');//gotovo
var prikaz_univerzitetaRouter = require('./routes/prikaz_univerziteta');//gotovo
var promeni_univerzitetRouter = require('./routes/promeni_univerzitet');//gotovo
var administrator_registracijaRouter = require('./routes/administrator_registracija');//gotovo
var upravljanje_fakultetimaRouter = require('./routes/upravljanje_fakultetima');//gotovo
var prikaz_fakultetaRouter = require('./routes/prikaz_fakulteta');//gotovo
var izmeni_fakultetRouter = require('./routes/izmeni_fakultet');//gotovo
var dodaj_departmanRouter = require('./routes/dodaj_departman');//gotovo
var upravljanje_studentimaRouter = require('./routes/upravljanje_studentima');//gotovo
var prikaz_studenataRouter = require('./routes/prikaz_studenata');//gotovo
var upravljanje_predmetimaRouter = require('./routes/upravljanje_predmetima');//gotovo
var upravljanje_profesorimaRouter = require('./routes/upravljanje_profesorima');//gotovo
var dodaj_predmet_departmanuRouter = require('./routes/dodaj_predmet_departmanu');//gotovo
var dodaj_profesora_predmetuRouter = require('./routes/dodaj_profesora_predmetu');//gotovo
var student_polozio_predmetRouter = require('./routes/student_polozio_predmet');//gotovo
var student_slusa_predmetRouter = require('./routes/student_slusa_predmet');//gotovo
var prikaz_profesoraRouter = require('./routes/prikaz_profesora');//gotovo

/*POST routers */
var izmeni_univerzitetRouter = require('./routes/izmeni_univerzitet');//gotovo
var registruj_administratoraRouter = require('./routes/registruj_administratora');//gotovo
var uloguj_administratoraRouter = require('./routes/uloguj_administratora');//gotovo
var admin_logout = require('./routes/admin_logout');
var dodaj_novi_univerzitetRouter = require('./routes/dodaj_novi_univerzitet');//gotovo
var izbrisi_univerzitetRouter = require('./routes/izbrisi_univerzitet');//gotovo
var dodaj_novi_fakultetRouter = require('./routes/dodaj_novi_fakultet');//gotovo
var izbrisi_fakultetRouter = require('./routes/izbrisi_fakultet');//gotovo
var sacuvaj_izmene_na_fakultetuRouter = require('./routes/sacuvaj_izmene_na_fakultetu');//gotovo
var dodaj_novi_departman_fakultetuRouter = require('./routes/dodaj_novi_departman_fakultetu');//gotovo
var dodaj_novog_studentaRouter = require('./routes/dodaj_novog_studenta');//gotovo
var izbrisi_departmanRouter = require('./routes/izbrisi_departman');//gotovo
var dodaj_novi_predmetRouter = require('./routes/dodaj_novi_predmet');//gotovo
var dodaj_novog_profesoraRouter = require('./routes/dodaj_novog_profesora');//gotovo
var dodaj_novi_predmet_na_departmanRouter = require('./routes/dodaj_novi_predmet_na_departman');//gotovo
var dodaj_novog_profesora_predmetuRouter = require('./routes/dodaj_novog_profesora_predmetu');//gotovo
var dodaj_novog_studenta_na_predmetuRouter = require('./routes/dodaj_novog_studenta_na_predmetu');//gotovo
var dodaj_novog_studenta_polozio_predmetRouter = require('./routes/dodaj_novog_studenta_polozio_predmet');//gotovo
var izbrisi_profesoraRouter = require('./routes/izbrisi_profesora');//gotovo
var izbrisi_studentaRouter = require('./routes/izbrisi_studenta');//gotovo
var izbrisi_predmet_sa_departmanaRouter = require('./routes/izbrisi_predmet_sa_departmana');//gotovo
var izbrisi_predmetRouter = require('./routes/izbrisi_predmet');//gotovo
var izbrisi_profesora_sa_predmetaRouter = require('./routes/izbrisi_profesora_sa_predmeta');//gorovo
var izbrisi_studenta_sa_predmetaRouter = require('./routes/izbrisi_studenta_sa_predmeta');//gotovo
var izbrisi_polozen_predmet_studentuRouter = require('./routes/izbrisi_polozen_predmet_studentu');//gotovo
var azuriraj_status_studenataRouter = require('./routes/azuriraj_status_studenata');//gotovo


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(useragent.express());
dotenv.config({path : './.env'});

app.use(session({
  cookieName: 'session',
  secret: process.env.SECRET,
  duration: process.env.DURATION,
  activeDuration: process.env.ACTIVEDURATION,
  resave: true,
    saveUninitialized: true
}));

app.use(nocache());

/*GET metode */
app.use('/', indexRouter);
app.use('/administrator_registracija', administrator_registracijaRouter);//gotovo
app.use('/administrator_logovanje', administrator_logovanje);//gotovo
app.use('/admin/pocetna_strana', admin_pocetna_stranaRouter);//gotovo
app.use('/admin/upravljanje_univerzitetima', upravljanje_univerzitetimaRouter);//gotovo
app.use('/admin/prikaz_univerziteta', prikaz_univerzitetaRouter);//gotovo
app.use('/admin/promeni_univerzitet', promeni_univerzitetRouter);//gotovo
app.use('/admin/upravljanje_fakultetima', upravljanje_fakultetimaRouter);//gotovo
app.use('/admin/prikaz_fakulteta', prikaz_fakultetaRouter);//gotovo
app.use('/admin/izmeni_fakultet', izmeni_fakultetRouter);//gotovo
app.use('/admin/dodaj_departman', dodaj_departmanRouter);//gotovo
app.use('/admin/upravljanje_studentima', upravljanje_studentimaRouter);//gotovo
app.use('/admin/prikaz_studenata', prikaz_studenataRouter);//gotovo
app.use('/admin/upravljanje_predmetima', upravljanje_predmetimaRouter);//gotovo
app.use('/admin/upravljanje_profesorima', upravljanje_profesorimaRouter);//gotovo
app.use('/admin/dodaj_predmet_departmanu', dodaj_predmet_departmanuRouter);//gotovo
app.use('/admin/dodaj_profesora_predmetu', dodaj_profesora_predmetuRouter);//gotovo
app.use('/admin/student_polozio_predmet', student_polozio_predmetRouter);//gotovo
app.use('/admin/student_slusa_predmet', student_slusa_predmetRouter);//gotovo
app.use('/admin/prikaz_profesora', prikaz_profesoraRouter);//gotovo

/*POST metode */
app.use('/registruj_administratora', registruj_administratoraRouter);//gotovo
app.use('/uloguj_administratora', uloguj_administratoraRouter);//gotovo
app.use('/admin_logout', admin_logout);
app.use('/dodaj_novi_univerzitet', dodaj_novi_univerzitetRouter);//gotovo
app.use('/izbrisi_univerzitet', izbrisi_univerzitetRouter);//gotovo
app.use('/izmeni_univerzitet', izmeni_univerzitetRouter);//gotovo
app.use('/dodaj_novi_fakultet', dodaj_novi_fakultetRouter);//gotovo
app.use('/izbrisi_fakultet', izbrisi_fakultetRouter);//gotovo
app.use('/sacuvaj_izmene_na_fakultetu', sacuvaj_izmene_na_fakultetuRouter);//gotovo
app.use('/dodaj_novi_departman_fakultetu', dodaj_novi_departman_fakultetuRouter);//gotovo
app.use('/dodaj_novog_studenta', dodaj_novog_studentaRouter);//gotovo
app.use('/izbrisi_departman', izbrisi_departmanRouter);//gotovo
app.use('/dodaj_novi_predmet', dodaj_novi_predmetRouter);//gotovo
app.use('/dodaj_novog_profesora', dodaj_novog_profesoraRouter);//gotovo
app.use('/dodaj_novi_predmet_na_departman', dodaj_novi_predmet_na_departmanRouter);//gotovo
app.use('/dodaj_novog_profesora_predmetu', dodaj_novog_profesora_predmetuRouter);//gotovo
app.use('/dodaj_novog_studenta_na_predmetu', dodaj_novog_studenta_na_predmetuRouter);//gotovo
app.use('/dodaj_novog_studenta_polozio_predmet', dodaj_novog_studenta_polozio_predmetRouter);//gotovo
app.use('/izbrisi_profesora', izbrisi_profesoraRouter);//gotovo
app.use('/izbrisi_studenta', izbrisi_studentaRouter);//gotovo
app.use('/izbrisi_predmet_sa_departmana', izbrisi_predmet_sa_departmanaRouter);//gotovo
app.use('/izbrisi_predmet', izbrisi_predmetRouter);//gotovo
app.use('/izbrisi_profesora_sa_predmeta', izbrisi_profesora_sa_predmetaRouter);//gotovo
app.use('/izbrisi_studenta_sa_predmeta', izbrisi_studenta_sa_predmetaRouter);//gotovo
app.use('/izbrisi_polozen_predmet_studentu', izbrisi_polozen_predmet_studentuRouter);//gotovo
app.use('/azuriraj_status_studenata', azuriraj_status_studenataRouter);//gotovo

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
