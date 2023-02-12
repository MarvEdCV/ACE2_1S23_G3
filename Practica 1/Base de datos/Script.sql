create schema acye2_p1;
use acye2_p1;
create table if not exists humedad
(
    id_humedad       int auto_increment
        primary key,
    humedad_relativa double                             not null,
    punto_rocio      double                             not null,
    fecha_creacion   datetime default CURRENT_TIMESTAMP not null
);

create table if not exists presion_barometrica
(
    id_presion_barometrica int auto_increment
        primary key,
    presion_barometrica    double                             not null,
    fecha_creacion         datetime default CURRENT_TIMESTAMP not null
);

create table if not exists temperatura
(
    id_temperatura int auto_increment
        primary key,
    temperatura    double                             not null,
    fecha_creación datetime default CURRENT_TIMESTAMP not null
);

create table if not exists viento
(
    id_viento      int auto_increment
        primary key,
    velocidad      double                             not null,
    direccion      double                             not null,
    fecha_creacion datetime default CURRENT_TIMESTAMP not null
);