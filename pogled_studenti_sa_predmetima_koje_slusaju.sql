CREATE VIEW `studenti_sa_predmetima_koje_slusaju` AS
select s.broj_indeksa as 'indeks', s.ime as 'ime', s.prezime as 'prezime',
		   sm.naziv as 'smer', p.naziv as 'predmet', p.id as 'id', f.fakultetska_godina as 'fakultetska_godina'
    from student as s, predmet as p, smer as sm, student_slusa_predmet as ssp, fakultetska_godina as f
    where s.broj_indeksa = ssp.student and s.smer = sm.id and ssp.predmet = p.id and ssp.fakultetska_godina = f.id
    order by s.broj_indeksa desc;