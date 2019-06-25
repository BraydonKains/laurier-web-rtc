create table users (
    user_id serial primary key,
    username varchar(50) unique not null,
    password varchar(50) not null,
    email varchar(355) unique not null,
    created_at timestamp not null
    last_login timestamp
);
