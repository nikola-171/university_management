CREATE VIEW `profesori_po_predmetima` AS
select n.id as 'profesor_id', n.ime as 'profesor_ime', n.prezime as 'profesor_prezime',
		   p.id as 'predmet_id', p.naziv as 'predmet_naziv',
           s.naziv as 'smer_naziv', f.naziv as 'fakultet_naziv'
	from predmet as p, profesor as n, smer as s, fakultet as f, profesor_na_predmetu as np, predmet_na_smeru as pns
    where n.id = np.profesor_id and np.predmet_id = p.id and p.id = pns.predmet and pns.smer = s.id and s.id = f.id
    order by n.ime, n.prezime asc;