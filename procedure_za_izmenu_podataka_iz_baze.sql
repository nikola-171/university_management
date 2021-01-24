use fakultet;
/*izmena univerziteta*/
delimiter \\
create procedure promeni_univerzitet(in id_in int, in naziv_in varchar(50),
									 in drzava_in varchar(45), in grad_in varchar(45))
begin
	update univerzitet
    set naziv = trim(replace(naziv_in, '  ', '')), drzava = trim(replace(drzava_in, '  ', '')),
		grad = trim(replace(grad_in, '  ', ''))
    where id = id_in;
end\\
delimiter ;
/*izmena fakulteta*/
delimiter \\
create procedure promeni_fakultet(in id_in int, in naziv_in varchar(50), in mesto_in varchar(45))
begin
	update fakultet
    set naziv = trim(replace(naziv_in, '  ', '')), mesto = trim(replace(mesto_in, '  ', ''))
    where id = id_in;
end\\
delimiter ;
