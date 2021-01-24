CREATE VIEW `studenti_koji_nisu_diplomirali` AS
select * from student where diplomirao = 0;