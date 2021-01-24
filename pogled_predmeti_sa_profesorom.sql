CREATE VIEW `predmeti_sa_profesorom` AS
select * 
	from predmet as p, profesor_na_predmetu as np
    where p.id = np.predmet_id;