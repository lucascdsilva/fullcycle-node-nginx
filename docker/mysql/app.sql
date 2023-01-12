USE app;
CREATE TABLE IF NOT EXISTS people (id VARCHAR(36) DEFAULT (uuid()) primary key, name varchar(50));
