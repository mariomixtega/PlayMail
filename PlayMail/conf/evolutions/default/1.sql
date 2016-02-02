# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table ejemplos (
  id                            bigint auto_increment not null,
  texto                         varchar(255),
  constraint pk_ejemplos primary key (id)
);


# --- !Downs

drop table if exists ejemplos;

