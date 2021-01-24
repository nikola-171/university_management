CREATE VIEW `predmeti_koji_nisu_na_nekom_departmanu` AS
select distinct p.id, p.naziv, p.godina, p.semestar, p.espb
	from predmet as p
	where p.id not in (select distinct predmet
					   from predmet_na_smeru);