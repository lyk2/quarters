/*
[{
	email: 'member1@house.com                                                                                   ',
	user_id: 6
}, {
	email: 'member2@house.com                                                                                   ',
	user_id: 7
}, {
	email: 'member3@house.com                                                                                   ',
	user_id: 8
}, {
	email: 'member4@house.com                                                                                   ',
	user_id: 9
}, {
	email: 'member5@house.com                                                                                   ',
	user_id: 10
}, {
	email: 'member6@house.com                                                                                   ',
	user_id: 11
}]
*/

insert into user_info (user_id, full_name, cell_num, description) values (6, 'James Asthony', 1333333, 'i like cheese');

insert into user_info (user_id, full_name, cell_num, description) values (7, 'Carolyn Dong', 1846399, 'i like cheese');
insert into user_info (user_id, full_name, cell_num, description) values (8, 'Chen Washroom', 8577284, 'i like cheese');
insert into user_info (user_id, full_name, cell_num, description) values (9, 'Spider man', 7483921, 'i like cheese');
insert into user_info (user_id, full_name, cell_num, description) values (10, 'Lighter', 0918312, 'i like cheese');
insert into user_info (user_id, full_name, cell_num, description) values (11, 'Bee Boop', 123927, 'i like cheese');

select role.user_id, role.role, full_name, cell_num
from role, user_info
where role.user_id = user_info.user_id
	and role.house_id = 26
;
