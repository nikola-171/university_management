CREATE VIEW `smerovi_po_fakultetima_i_univerzitetima` AS
select u.naziv as 'univerzitet', f.naziv as 'fakultet', s.naziv as 'smer', s.nivo_studija as 'nivo_studija', s.id as 'id'
	from smer as s, fakultet as f, univerzitet as u
	where s.fakultet = f.id and f.univerzitet = u.id
	order by u.naziv, f.naziv, s.nivo_studija;