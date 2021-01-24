use fakultet;
/*napravili smo korisnika koji će moći samo da poziva ugrađene procedure*/
create user 'fakultet_administrator'@'localhost' identified by 'admin_lozinka';
grant execute on fakultet.* to 'fakultet_administrator'@'localhost';
