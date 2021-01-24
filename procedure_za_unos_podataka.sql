use fakultet;
/*upis administratora u bazi, samo jednom će se izvršiti ova procedure
  i tom prilikom će se uneti i podaci*/
delimiter \\
create procedure upis_administratora(in admin_ime varchar(45), in admin_lozinka varchar(255),
                                     in email_in varchar(45), in telefon_in varchar(45))
begin
	declare brojac tinyint unsigned default 1;
    declare godina_brojac tinyint unsigned default 0;
    declare id_prim tinyint unsigned default 0;
    declare admin_vec_registrovan tinyint unsigned default 0;
    
	declare exit handler for sqlexception
    begin
		rollback;
    end;
    
    start transaction;
    
    select count(*) into admin_vec_registrovan
    from administrator;
    
    if admin_vec_registrovan = 0 then
		insert into administrator(administrator_ime, administrator_lozinka, email, telefon)
		values(trim(admin_ime), admin_lozinka, trim(email_in), trim(telefon_in));
    
		insert into fakultetska_godina(fakultetska_godina)
		values('2017/18');
    
		select max(id) into id_prim
		from fakultetska_godina;   
    
		/*univerzitet*/
		call upis_univerziteta('univerzitet u nišu', 'srbija', 'niš');/*id - 1*/
		/*fakultet*/
		call dodaj_fakultet('prirodno-matematički fakultet', 'niš', 1);/*id 1*/
		/*smer*/
		call dodaj_smer(1, 'osnovne akademske studije', 'računarske nauke', 180, 3); /*id 1*/
    
		/*predmeti prva godina*/
		call dodaj_novi_predmet('uvod u programiranje', 1, 1, 8);
		call dodaj_novi_predmet('diskretne strukture 1', 1, 1, 7);
		call dodaj_novi_predmet('uvod u računarstvo', 1, 1, 7);
		call dodaj_novi_predmet('matematička analiza 1', 1, 1, 8);
    
		call dodaj_novi_predmet('objektnno-orijentisano programiranje 1', 1, 2, 8);
		call dodaj_novi_predmet('diskretne strukture 2', 1, 2, 7);
		call dodaj_novi_predmet('uvod u veb programiranje', 1, 2, 7);
		call dodaj_novi_predmet('matematička analiza 2', 1, 2, 8);
		/*druga*/
		/*call dodaj_novi_predmet('struktura podataka i algoritmi', 2, 3, 8);
		call dodaj_novi_predmet('linearna algebra', 2, 3, 7);
		call dodaj_novi_predmet('uvod u baze podataka', 2, 3, 8);
		call dodaj_novi_predmet('objektno-orijentisano programiranje 2', 2, 3, 7);
    
		call dodaj_novi_predmet('dizajn i analiza algoritama', 2, 4, 8);
		call dodaj_novi_predmet('objektno-orijentisano programiranje 3', 2, 4, 8);
		call dodaj_novi_predmet('uvod u operativne sisteme', 2, 4, 7);
		call dodaj_novi_predmet('elektronsko izdavaštvo', 2, 4, 7);*/
		/*treća*/
		/* call dodaj_novi_predmet('verovatnoća', 3, 5, 8);
		call dodaj_novi_predmet('numerički metodi 1', 3, 5, 7);
		call dodaj_novi_predmet('upravljanje projektima u IT', 3, 5, 8);
		call dodaj_novi_predmet('uvod u softversko inženjerstvo', 2, 5, 7);
    
		call dodaj_novi_predmet('Open source matematički softver', 3, 6, 7);
		call dodaj_novi_predmet('računarske mreže', 3, 6, 7);
		call dodaj_novi_predmet('engleski jezik 1', 3, 6, 5);
		call dodaj_novi_predmet('engleski jezik 2', 3, 6, 5);
		call dodaj_novi_predmet('veb programiranje', 3, 6, 6);*/
    
		/*student*/
		call dodaj_novog_studenta(1, 'nikola', 'tošić', 1998, 9, 4, 'trnavac', 'bb', 'bb', '0616066787', 'nikola.tosic@pmf.edu.rs', 1, 'nikola.tosic', 'nikola019', id_prim);
		/*profesor*/
		call dodaj_novog_profesora('pera', 'perić', 1972, 1, 16, '06547859', 'pera.peric@gmail.com', 'pera.peric', 'pera019');
    
		/*predmet na smeru, profesor na predmetu, student sluša predmet*/
		l : while brojac <= 8 do
			call dodaj_predmet_smer_par(brojac, 1);
			call dodaj_profesor_predmet_par(1, brojac, 1);
			call dodaj_student_slusa_predmet_par(1, brojac);
		
			set brojac = brojac + 1;
		end while l;
    
    end if;
	
	commit;
end\\
delimiter ;
/*upis univerziteta u bazi*/
delimiter \\
create procedure upis_univerziteta(in naziv varchar(50), in drzava varchar(45), in grad varchar(45))
begin
	insert into univerzitet(naziv, drzava, grad)
    values(trim(replace(naziv, '  ', '')), trim(replace(drzava, '  ', '')), trim(replace(grad, '  ', '')));
end\\
delimiter ;
/*upis fakulteta u bazi*/
delimiter \\
create procedure dodaj_fakultet(in naziv_in varchar(50), in mesto_in varchar(45), in univerzitet_in int)
begin
	insert into fakultet(naziv, mesto, univerzitet)
    values(trim(replace(naziv_in, '  ', '')), trim(replace(mesto_in, '  ', '')), univerzitet_in);
end\\
delimiter ;
/*upis smera na nekom fakultetu*/
delimiter \\
create procedure dodaj_smer(in fakultet_in int, in nivo_studija_in varchar(45), in naziv_in varchar(45),
							in espb_in smallint, in trajanje_in smallint)
begin
	insert into smer(naziv, nivo_studija, fakultet, espb, trajanje)
    values(trim(replace(naziv_in, '  ', '')), trim(replace(nivo_studija_in, '  ', '')), fakultet_in, 
		   trim(replace(espb_in, '  ', '')), trim(replace(trajanje_in, '  ', '')));
end\\
delimiter ;
/*upis novog studenta u bazi*/
delimiter \\
create procedure dodaj_novog_studenta(in smer_in int, in ime_in varchar(45), in prezime_in varchar(45),
									  in godina_rodjenja_in int, in mesec_rodjenja_in int,
                                      in dan_rodjenja_in int, in mesto_boravka_in varchar(45),
                                      in ulica_in varchar(45), in broj_in varchar(45),
                                      in telefon_in varchar(45), in email_in varchar(45), in status_in tinyint unsigned,
                                      in korisnicko_ime_in varchar(45), in lozinka_in varchar(200), in fak_godina_in tinyint unsigned)
begin
	declare hesirana_lozinka varchar(200) default '';
    declare exit handler for sqlexception
    begin
		rollback;
        select 'doslo je do greske' as 'msg';
    end;
    
    start transaction;
    set hesirana_lozinka = sha1(trim(replace(lozinka_in, '  ', '')));
    
    insert into student(smer,ime, prezime, godina_rodjenja, mesec_rodjenja,
						dan_rodjenja, mesto_boravka, ulica, broj, telefon, email, 
                        status_studenta, korisnicko_ime, lozinka, fakultetska_godina)
    values(smer_in,trim(replace(ime_in, '  ', '')), trim(replace(prezime_in, '  ', '')), godina_rodjenja_in, mesec_rodjenja_in,
		   dan_rodjenja_in, trim(replace(mesto_boravka_in, '  ', '')), trim(replace(ulica_in, '  ', '')), 
			trim(replace(broj_in, '  ', '')), trim(replace(telefon_in, '  ', '')), trim(replace(email_in, '  ', '')),
           status_in, trim(replace(korisnicko_ime_in, '  ', '')), hesirana_lozinka, fak_godina_in);
	commit;
end\\
delimiter ;
/*upis novog predmeta u bazi*/
delimiter \\
create procedure dodaj_novi_predmet(in naziv_in varchar(45), in godina_in tinyint, 
									in semestar_in tinyint, in espb_in tinyint)
begin
	insert into predmet(naziv, godina, semestar, espb)
    values(trim(replace(naziv_in, '  ', '')), trim(replace(godina_in, '  ', '')),
		   trim(replace(semestar_in, '  ', '')), trim(replace(espb_in, '  ', '')));
end\\
delimiter ;
/*upis novog profesora u bazi*/
delimiter \\
create procedure dodaj_novog_profesora(in ime_in varchar(45), in prezime_in varchar(45),
									  in godina_rodjenja_in SMALLINT, in mesec_rodjenja_in TINYINT,
                                      in dan_rodjenja_in TINYINT, in telefon_in varchar(45),
                                      in email_in varchar(45),
                                      in korisnicko_ime_in varchar(45), in lozinka_in varchar(45))
begin
	declare hesirana_lozinka varchar(200) default '';
    declare exit handler for sqlexception
    begin
		rollback;
        select 'doslo je do greske' as 'msg';
    end;
    
    start transaction;
    set hesirana_lozinka = sha1(trim(replace(lozinka_in, '  ', '')));
    
    insert into profesor(ime, prezime, godina_rodjenja, mesec_rodjenja, dan_rodjenja,
						  telefon, email, korisnicko_ime, lozinka)
	values(trim(replace(ime_in, '  ', '')), trim(replace(prezime_in, '  ', '')), godina_rodjenja_in,
           mesec_rodjenja_in, dan_rodjenja_in, trim(replace(telefon_in, '  ', '')),
           trim(replace(email_in, '  ', '')), trim(replace(korisnicko_ime_in, '  ', '')), hesirana_lozinka);
	commit;
end\\
delimiter ;
/*Unos nove fakultetske godine. Pre nego što se unese u bazi vrši se presek studenata.
  Na osnovu ostvarenih espb bodova u prethodnoj fakultetskoj godini će se utvrditi da li
  će student u novog fakultetskoj godini biti na budžetu ili ne */
delimiter \\
create procedure unos_nove_fakultetske_godine(in fakultetska_godina_in varchar(10))
begin
	declare broj_bodova smallint unsigned default 0;
    declare novi_status bit(1) default 0;
    declare student_indeks int unsigned default 0;
    declare potreban_broj_bodova tinyint unsigned default 48; /*potreban broj bodova za budzet*/
    
    declare id_stare_godine tinyint unsigned default 1;
    declare id_nove_godine tinyint unsigned default 1;
    
    declare c cursor for
		select broj_indeksa from student;
	
	declare exit handler for not found
    begin
    end;
    
    declare exit handler for sqlexception
    begin
        rollback;
         GET DIAGNOSTICS CONDITION 1
		@p2 = MESSAGE_TEXT;
        
        select @p2 as 'msg';
    end;
    
    start transaction;
    
    select max(id) into id_stare_godine
    from fakultetska_godina;
    
    insert into fakultetska_godina(fakultetska_godina)
    values(fakultetska_godina_in);
    
    select max(id) into id_nove_godine
	from fakultetska_godina;
    
    open c;
     l : loop
		fetch c into student_indeks;
        
        select sum(p.espb) into broj_bodova
        from predmet as p, student_polozio_predmet as spp
        where spp.predmet_id = p.id and spp.student_broj_indeksa = student_indeks
			  and spp.fakultetska_godina = id_stare_godine;
              
		if broj_bodova >= potreban_broj_bodova then
			set novi_status = 1;
        end if;
        
        update student
        set status_studenta = novi_status, fakultetska_godina = id_nove_godine
        where broj_indeksa = student_indeks;
        
     end loop l;
    close c;
    commit;
end\\
delimiter ;
