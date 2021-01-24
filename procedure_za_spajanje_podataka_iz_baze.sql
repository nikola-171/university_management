use fakultet;
/*dodavanje predmeta na smeru*/
delimiter \\
create procedure dodaj_predmet_smer_par(in predmet_in int unsigned, in smer_in int unsigned)
begin
	declare zapis_vec_postoji tinyint unsigned default 0;
    
    declare exit handler for sqlexception
    begin
		rollback;
        GET DIAGNOSTICS CONDITION 1
		@p2 = MESSAGE_TEXT;
        
        select @p2 as 'msg';
    end;
    start transaction;
    select count(*) into zapis_vec_postoji
    from predmet_na_smeru
    where predmet = predmet_in and smer = smer_in;
    
    if zapis_vec_postoji = 0 then
		insert into predmet_na_smeru(predmet, smer)
		values(predmet_in, smer_in);
        
		select 'dodato' as 'msg';
    else
		select 'vec postoji' as 'msg';
	end if;
    commit;
end\\
delimiter ;
/*dodavanje profesora na predmetu*/
delimiter \\
create procedure dodaj_profesor_predmet_par(in profesor_in int unsigned, in predmet_in int unsigned,
											 in tip_in TINYINT)
begin
	declare zapis_vec_postoji tinyint unsigned default 0;
      declare exit handler for sqlexception
    begin
		rollback;
        GET DIAGNOSTICS CONDITION 1
		@p2 = MESSAGE_TEXT;
        
        select @p2 as 'msg';
    end;
    start transaction;
    
    select count(*) into zapis_vec_postoji
    from profesor_na_predmetu
    where profesor_id = profesor_in and predmet_id = predmet_in;
    
    if zapis_vec_postoji = 0 then
		insert into profesor_na_predmetu(profesor_id, predmet_id, tip)
        values(profesor_in, predmet_in, tip_in);
        
        select 'dodato' as 'msg';
	else
		select 'vec postoji' as 'msg';
    end if;
    
    commit;
end\\
delimiter ;
/*dodavanje položenog ispita studentu*/
delimiter \\
create procedure dodaj_polozen_ispit_studentu(in student_in int unsigned, in predmet_in int unsigned,
											  in ocena_in tinyint unsigned, in datum_in varchar(13))
begin
	declare student_slusa_predmet tinyint unsigned default 0;
    declare profesor_na_predmetu tinyint unsigned default 0;
    declare priv_fakultetska_godina tinyint unsigned default 0;
    /*novo*/
    
    
	declare exit handler for sqlexception
    begin
		GET DIAGNOSTICS CONDITION 1
		@p2 = MESSAGE_TEXT;
        
        select @p2 as 'msg';
		rollback;
    end;
	start transaction;
    
    select count(*) into student_slusa_predmet
    from student_slusa_predmet
    where student = student_in and predmet = predmet_in;
    
    select count(*) into profesor_na_predmetu
    from profesor_na_predmetu
    where predmet_id = predmet_in;
    
    if student_slusa_predmet != 0 and profesor_na_predmetu != 0 then
		
        select fakultetska_godina into priv_fakultetska_godina
        from student_slusa_predmet
        where student = student_in and predmet = predmet_in;
        
		insert into student_polozio_predmet(predmet_id, student_broj_indeksa,ocena,datum, fakultetska_godina)
		values(predmet_in, student_in, ocena_in, datum_in, trim(replace(priv_fakultetska_godina, '  ', '')));
    
		delete from student_slusa_predmet
		where student = student_in and predmet = predmet_in;
	end if;
    
    commit;
end\\
delimiter ;
/*dodavanje studenta na predmet*/
delimiter \\
create procedure dodaj_student_slusa_predmet_par(in student_in int unsigned, in predmet_in int unsigned)
begin
	declare zapis_vec_postoji tinyint unsigned default 0;
    declare diplomirao tinyint default 0;
    declare fak_godina_in tinyint unsigned default 0;
  
	declare exit handler for sqlexception
    begin
		rollback;
		GET DIAGNOSTICS CONDITION 1
		@p2 = MESSAGE_TEXT;
        
        select @p2 as 'msg';
    end;
        
    start transaction;
    
    select max(id) into fak_godina_in
    from fakultetska_godina;
    
    select s.diplomirao into diplomirao 
    from student as s 
    where s.broj_indeksa = student_in;
    
    if diplomirao = 0 then
		select count(*) into zapis_vec_postoji
		from student_slusa_predmet
		where student = student_in and predmet = predmet_in;
    
		if zapis_vec_postoji = 0 then
			insert into student_slusa_predmet(student, predmet, fakultetska_godina)
			values(student_in, predmet_in, fak_godina_in);
        
			select true as 'msg';
		else
			update student_slusa_predmet
			set fakultetska_godina = fak_godina_in, broj_slusanja = broj_slusanja + 1
			where student = student_in and predmet = predmet_in;
        
			select false as 'msg';
		end if;
    else
		select false as 'msg', 'student je diplomirao' as 'info';
    end if;
    
    commit;
end\\
delimiter ;
