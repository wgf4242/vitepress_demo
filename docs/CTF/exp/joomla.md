

在数据库中添加 admin2/secret的超级管理员：
```sql
INSERT INTO `am2zu_users` (`name`, `username`, `password`, `params`, `registerDate`, `lastvisitDate`, `lastResetTime`) VALUES ('Administrator2', 'admin2','d2064d358136996bd22421584a7cb33e:trd7TvKHx6dMeoMmBVxYmg0vuXEA4199', '', NOW(), NOW(), NOW());
INSERT INTO `am2zu_user_usergroup_map` (`user_id`,`group_id`) VALUES (LAST_INSERT_ID(),'8');
```
