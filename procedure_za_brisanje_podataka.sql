use fakultet;
/*brisanje univerziteta na osnovu njegovog ID-a*/
delimiter \\
create procedure izbrisi_univerzitet(in id_in int)
begin
	 declare exit handler for sqlexception
     begin
        GET DIAGNOSTICS CONDITION 1
		@p2 = MESSAGE_TEXT;
        
        select @p2 as 'msg';
     end;
	delete from univerzitet
    where id = id_in;
end\\
delimiter ;
/*brisanje fakulteta na osnovu njegovo ID-a*/
delimiter \\
create procedure izbrisi_fakultet(in id_in int)
begin
	declare exit handler for sqlexception
     begin
		  GET DIAGNOSTICS CONDITION 1
		  @p2 = MESSAGE_TEXT;
        
          select @p2 as 'msg';
     end;
	delete from fakultet
    where id = id_in;
end\\
delimiter ;
/*brisanje smera na osnovu njegovo ID-a*/
delimiter \\
create procedure izbrisi_smer(in id_in int)
begin
	declare exit handler for sqlexception
     begin
		  GET DIAGNOSTICS CONDITION 1
		@p2 = MESSAGE_TEXT;
        
        select @p2 as 'msg';
     end;
	delete from smer
    where id = id_in;
end\\
delimiter ;
/*brisanje profesora na osnovu njegovog ID-a*/
delimiter \\
create procedure izbrisi_profesora(in id_in int unsigned)
begin
	declare exit handler for sqlexception
    begin
		  GET DIAGNOSTICS CONDITION 1
		@p2 = MESSAGE_TEXT;
        
        select @p2 as 'msg';
    end;
    
	delete from profesor
    where id = id_in;
end\\
delimiter ;
/*brisanje studenta na osnovu ID-a, tj. broja indeksa*/
delimiter \\
create procedure izbrisi_studenta(in id_in int unsigned)
begin
	declare exit handler for sqlexception
    begin
		  GET DIAGNOSTICS CONDITION 1
		@p2 = MESSAGE_TEXT;
        
        select @p2 as 'msg';
    end;
    
    delete from student
    where broj_indeksa = id_in;
end\\
delimiter ;
/*brisanje predmeta sa smera*/
delimiter \\
create procedure izbrisi_predmet_sa_smera(in predmet_in int unsigned, in smer_in int unsigned)
begin
	declare exit handler for sqlexception
    begin
		  GET DIAGNOSTICS CONDITION 1
		@p2 = MESSAGE_TEXT;
        
        select @p2 as 'msg';
    end;
    
    delete from predmet_na_smeru
    where predmet = predmet_in and smer = smer_in;
end\\
delimiter ;
/*brisanje predmeta*/
delimiter \\
create procedure izbrisi_predmet(in predmet_in int unsigned)
begin
	declare exit handler for sqlexception
    begin
		  GET DIAGNOSTICS CONDITION 1
		@p2 = MESSAGE_TEXT;
        
        select @p2 as 'msg';
    end;
    
    delete from predmet
    where id = predmet_in;
    
end\\
delimiter ;
/*brisanje profesora sa predmeta*/
delimiter \\
create procedure izbrisi_profesora_sa_predmeta(in profesor_in int unsigned, in predmet_in int unsigned)
begin
	declare exit handler for sqlexception
    begin
		  GET DIAGNOSTICS CONDITION 1
		@p2 = MESSAGE_TEXT;
        
        select @p2 as 'msg';
    end;
    
    delete from profesor_na_predmetu
    where predmet_id = predmet_in and profesor_id = profesor_in;
end\\
delimiter ;
/*brisanje studenta sa predmeta*/
delimiter \\
create procedure izbrisi_studenta_sa_predmeta(in student_in int unsigned, in predmet_in int unsigned)
begin
	declare exit handler for sqlexception
    begin
		  GET DIAGNOSTICS CONDITION 1
		@p2 = MESSAGE_TEXT;
        
        select @p2 as 'msg';
    end;
    
    delete from student_slusa_predmet
    where student = student_in and predmet = predmet_in;
end\\
delimiter ;
/*brisanje položenog ispita studentu, ukoliko je ispit položen u nekoj starijoj fakultetskoj godini
  onda brisanje nije moguće. Moguće je samo obrisati predmete u tekućoj godini*/
delimiter \\
create procedure izbrisi_polozen_ispit_studentu(in student_in int unsigned, in predmet_in int unsigned)
begin
	
    declare id_godine_kada_je_ispit_polozen tinyint unsigned default 0;
    declare tekuca_godina tinyint unsigned default 0;
     declare exit handler for sqlexception
    begin
		  GET DIAGNOSTICS CONDITION 1
		@p2 = MESSAGE_TEXT;
        
        select @p2 as 'msg';
    end;
    select fakultetska_godina into id_godine_kada_je_ispit_polozen
    from student_polozio_predmet
    where predmet_id = predmet_in and student_broj_indeksa = student_in;
    
    select max(id) into tekuca_godina
    from fakultetska_godina;
  
     if id_godine_kada_je_ispit_polozen = tekuca_godina then
		delete from student_polozio_predmet
		where predmet_id = predmet_in and student_broj_indeksa = student_in;
     else
		select 'nije moguće brisati položen predmet iz starije fakultetske godine' as 'msg';
     end if;
     
end\\
delimiter ;
