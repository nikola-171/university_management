CREATE VIEW `prikaz_studenata` AS
select s.broj_indeksa, s.ime, s.prezime, sm.naziv, f.naziv as 'fakultet', s.diplomirao, s.espb, s.prosek, s.status_studenta as 'status_studenta'
    from student as s, smer as sm, fakultet as f
    where s.smer = sm.id and sm.fakultet = f.id
    order by sm.naziv asc;