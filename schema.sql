-- create a datbase
CREATE DATABASE "instagram_db"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- select the database (all commands below this will run on this database, for example, if you create a table then it will be created 
-- in instagram database)
\c instagram_db;

-- enables UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Instagram Database has 4 main tables - Users, Posts, Comments, Likes then we got Followers

-- users table
create table if not exists public.users(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, -- primary key as auto generated UUID
    email varchar(254) not null unique, -- email is required, must be unique in table and longest email address allowed is 254 characters
    password text, -- password can be any undetermined length (because of hashing we don't know exact size)
    username varchar(50) not null unique, -- username is atmost 50 characters long, is required and must be unique in table.
    first_name varchar(100), -- first name, optional, at most 100 characters 
    last_name varchar(100), -- last name, optional, at most 100 characters 
    avatar_url text, -- optional profile picture URL , length is unknown,
    bio varchar(500), -- user bio optional, at most 500 characters 
    verified boolean default 'false', -- column indicates if user has verified the email address, default is false.
    birth_date DATE, -- birth date is optional,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- column indicates when user registered
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP -- column indicates when was the last time user updated profile.
);

-- posts table
create table if not exists public.posts(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, -- primary key as auto generated UUID
    photo_url text not null, -- photo is required in post,
    caption varchar(1000), -- photo caption, optional, max 1000 characters
    author_id UUID not null, -- post must have a author,
    body varchar(5000), -- post text body is optional and max 5000 characters allowed,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- column indicates when post created
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- column indicates when was the last time user updated profile.
    FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE CASCADE
);

-- post likes table (this is called a join table)
create table if not exists public.post_likes(
    post_id UUID not null, -- which post
    user_id UUID not null, -- who liked it
    FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

-- post comments
create table if not exists public.post_comments(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, -- primary key as auto generated UUID
    post_id UUID not null, -- on which post
    author_id UUID not null, -- who commented it
    body varchar(1000) not null, -- comment body is required, at max 1000 characters
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- column indicates when comment created
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, -- column indicates when was the last time user updated comment.
    FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE, -- if post with id = post_id is deleted from posts table then delete this record
    FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE CASCADE -- if user with id = author_id is deleted from users table then delete this record
);

-- followers
create table if not exists public.user_followers(
    user_id UUID not null, -- the user who is being followed
    follower_id UUID not null, -- the user who is following
    FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE,
    FOREIGN KEY (follower_id) REFERENCES public.users(id) ON DELETE CASCADE
);


