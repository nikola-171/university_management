use fakultet;
/*svake godine prazni arhive*/
delimiter \\
create event prazni_arhive
on schedule every 1 year
enable
do
begin
	declare id_prom int unsigned default 0;
	declare c_uni cursor for
		select id from univerzitet_arhiva;
	declare c_fakultet cursor for
		select id from fakultet_arhiva;
	declare c_stud cursor for
		select broj_indeksa from student_arhiva;
	declare c_prof cursor for
		select id from profesor_arhiva;
        
	declare exit handler for not found
    begin
		set id_prom = 0;
    end;
	
	declare exit handler for sqlexception
    begin
		GET DIAGNOSTICS CONDITION 1
		@p2 = MESSAGE_TEXT;
        select @p2 as 'msg';
    end;
    
    open c_uni;
		l: loop
			fetch c_uni into id_prom;
            delete from univerzitet_arhiva
            where id = id_prom;
        end loop l;
    close c_uni;
    open c_fakultet;
		l:loop
			fetch c_fakultet into id_prom;
			delete from fakultet_arhiva
			where id = id_prom;
        end loop l;
    close c_fakultet;
    open c_stud;
		l : loop
			fetch c_stud into id_prom;
			delete from student_arhiva
			where broj_indeksa = id_prom;
        end loop l;
    close c_stud;
    open c_prof;
		l:loop
			fetch c_prof into id_prom;
            delete from profesor_arhiva
            where id = id_prom;
		end loop l;
    close c_prof;
end\\
delimiter ;
/*kada brišemo univerzitet prebacujemo ga u arhivu*/
delimiter \\
create trigger tr_brisanje_univerziteta
	after delete on univerzitet
    for each row
    begin
		insert into univerzitet_arhiva(id,naziv,drzava,grad)
        values(old.id, old.naziv, old.drzava, old.grad);
    end\\
delimiter ;
/*kada brišemo fakultet prebacujemo ga u arhivu*/
delimiter \\
create trigger tr_brisanje_fakulteta
	after delete on fakultet
    for each row
    begin
		insert into fakultet_arhiva(id,naziv,mesto, univerzitet)
        values(old.id, old.naziv, old.mesto, old.univerzitet);
    end\\
delimiter ;
/*kada brišemo studenta prebacujemo ga u arhivu*/
delimiter \\
create trigger tr_brisanje_studenata
	after delete on student
    for each row
    begin
		insert into student_arhiva(broj_indeksa, ime, prezime, godina_rodjenja, mesec_rodjenja, dan_rodjenja,
								 mesto_boravka, ulica, broj, telefon, email, espb, diplomirao)
		values(old.broj_indeksa, old.ime, old.prezime, old.godina_rodjenja, old.mesec_rodjenja,
			   old.dan_rodjenja, old.mesto_boravka, old.ulica, old.broj, old.telefon, old.email,
               old.espb, old.diplomirao);
    end\\
delimiter ;
/*čuvamo promene izvršene nad nekim fakultetom*/
delimiter \\
create trigger tr_fakultet_promena
	after update on fakultet
    for each row
    begin
		declare poruka varchar(150) default '';
        declare fak_id int default old.id;
        
        if old.id != new.id then
			set poruka = concat(poruka, 'id ', old.id, '->', new.id, ' ');
            set fak_id = new.id;
        end if;
        if old.naziv != new.naziv then
			set poruka = concat(poruka, 'naziv ', old.naziv, '->', new.naziv, ' ' );
        end if;
        if old.mesto != new.mesto then
			set poruka = concat(poruka, 'mesto ', old.mesto, '->', new.mesto, ' ');
        end if;
        
		insert into fakultet_promena(korisnik, poruka, vreme, fakultet)
        values(user(), poruka, now(), fak_id);
		
    end\\
delimiter ;
/*čuvamo promene izvršene nad nekim univerzitetom*/
delimiter \\
create trigger tr_univerzitet_promena
	after update on univerzitet
    for each row
	begin
		declare poruka varchar(150) default '';
        declare uni_id int default old.id;
        if old.id != new.id then
			set poruka = concat(poruka, 'id ', old.id, '->', new.id, ' ');
            set uni_id = new.id;
        end if;
        if old.naziv != new.naziv then
			set poruka = concat(poruka, 'naziv ', old.naziv, '->', new.naziv, ' ' );
        end if;
        if old.drzava != new.drzava then
			set poruka = concat(poruka, 'drzava ', old.drzava, '->', new.drzava, ' ');
        end if;
        if old.grad != new.grad then
			set poruka = concat(poruka, 'grad ', old.grad, '->', new.grad);
        end if;
		insert into univerzitet_promena(korisnik, poruka, vreme, univerzitet)
        values(user(), poruka, now(), uni_id);
	end\\
delimiter ;
/*ažuriranje proseka studenta i broj espb bodova svaku put kada položi neki predmet*/
delimiter \\
create trigger update_student_prosek_espb
after insert on student_polozio_predmet
for each row
begin
	declare dodatnih_espb tinyint unsigned default 0;
    declare trenutno_espb smallint unsigned default 0; 
	declare potrebno_espb smallint unsigned default 0;
    
    declare broj_predmeta tinyint unsigned default 0;
    declare suma tinyint unsigned default 0;
    declare trenutna_ocena tinyint unsigned default 0;
    declare novi_prosek float default 0.0;
    
    declare c cursor for
		select ocena
		from student_polozio_predmet
		where student_broj_indeksa = new.student_broj_indeksa;

        
	 declare exit handler for not found
     begin
		set novi_prosek = suma / broj_predmeta;
        
		update student
        set prosek = novi_prosek
        where broj_indeksa = new.student_broj_indeksa;
    end;
    
    
    select espb into dodatnih_espb
    from predmet
    where id = new.predmet_id;
    
    update student
    set espb = espb + dodatnih_espb
    where broj_indeksa = new.student_broj_indeksa;
    
            
      select s.espb into potrebno_espb
      from smer as s, student as stud
      where s.id = stud.smer and stud.broj_indeksa = new.student_broj_indeksa;
      
      select s.espb into trenutno_espb
      from student as s
      where s.broj_indeksa = new.student_broj_indeksa;
      
      if trenutno_espb = potrebno_espb then
		update student
        set diplomirao = 1
        where broj_indeksa = new.student_broj_indeksa;
        
      end if;
    
    open c;
    petlja: loop
		
			fetch c into trenutna_ocena;
			set broj_predmeta = broj_predmeta + 1;
			set suma = suma + trenutna_ocena;
	
    end loop petlja;
    close c;
    
end\\
delimiter ;
/*brisanje profesora - prebacujemo ga u arhivu*/
delimiter \\
create trigger tr_brisanje_profesora
	after delete on profesor
    for each row
    begin
		insert into profesor_arhiva(id, ime, prezime, godina_rodjenja, mesec_rodjenja, dan_rodjenja,
									email, telefon)
		values(old.id, old.ime, old.prezime, old.godina_rodjenja, old.mesec_rodjenja, 
			   old.dan_rodjenja, old.email, old.telefon);
    end\\
delimiter ;
/*kada studentu obrišemo neki položen ispit moramo ponovo da mu ažuriramo prosek i broj espb bodova*/
delimiter \\
create trigger tr_brisanje_polozenog_predmeta
	after delete on student_polozio_predmet
    for each row
    begin
		declare espb_priv tinyint unsigned default 0;
        declare broj_predmeta tinyint default 0;
        declare suma_predmeta tinyint default 0;
		declare ocena_priv tinyint default 0;
        declare novi_prosek float default 0.0;
       
        declare c cursor for
			select ocena
            from student_polozio_predmet
            where student_broj_indeksa = old.student_broj_indeksa;
            
		declare exit handler for not found
        begin
			set novi_prosek = suma_predmeta / broj_predmeta;
            
            update student 
            set prosek = novi_prosek, espb = espb - espb_priv
            where broj_indeksa = old.student_broj_indeksa;
        end;
        
        select espb into espb_priv
        from predmet
        where id = old.predmet_id;
        
        open c;
        l : loop
			fetch c into ocena_priv;
            set broj_predmeta = broj_predmeta + 1;
            set suma_predmeta = suma_predmeta + ocena_priv;
        end loop l;
        close c;
       
    end\\
delimiter ;
