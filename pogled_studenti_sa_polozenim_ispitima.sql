CREATE VIEW `studenti_sa_predmetima_koje_su_polozili` AS
select  distinct s.broj_indeksa as 'broj_indeksa', s.ime as 'ime', s.prezime as 'prezime',
			s.email as 'email', p.naziv as 'predmet_naziv', spp.ocena as 'ocena',
            spp.datum as 'datum', p.id as 'predmet_id', spp.fakultetska_godina, fg.fakultetska_godina as 'fakultetska_godina'
    from student as s, student_polozio_predmet as spp, predmet as p, predmet_na_smeru as pns, smer as sm, fakultetska_godina as fg
	where s.broj_indeksa = spp.student_broj_indeksa and spp.predmet_id = p.id and p.id = pns.predmet and spp.fakultetska_godina = fg.id
    order by s.broj_indeksa asc, spp.fakultetska_godina,  sm.naziv asc;