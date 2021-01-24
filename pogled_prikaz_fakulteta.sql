CREATE VIEW `prikaz_fakulteta` AS
select f.id, f.naziv, f.mesto, u.naziv as 'univerzitet'
    from fakultet as f
    inner join univerzitet as u on f.univerzitet = u.id;