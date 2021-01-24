CREATE VIEW `predmeti_po_smerovima` AS
select distinct pns.predmet as 'predmet', pns.smer as 'smer', p.naziv as 'predmet_naziv',
		   p.godina as 'predmet_godina', p.espb as 'predmet_espb', 
           s.naziv as 'smer_naziv', p.semestar as 'predmet_semestar'
           
    from predmet_na_smeru as pns, predmet as p, smer as s
    where pns.predmet = p.id and pns.smer = s.id and pns.smer = s.id
    order by  p.naziv,s.naziv, p.semestar asc;