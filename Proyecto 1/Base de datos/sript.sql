create table if not exists tiempo_default
(
    tiempo_default_id int auto_increment
        primary key,
    tiempo_pomodoro   int                                not null,
    tiempo_descanso   int                                not null,
    fecha_creacion    datetime default CURRENT_TIMESTAMP not null
);

create table if not exists tipo_ciclo
(
    tipo_ciclo_id int auto_increment
        primary key,
    tipo          varchar(50) not null
);

create table if not exists tipo_penalizacion
(
    tipo_penalizacion_id int auto_increment
        primary key,
    nombre               varchar(100) not null
);

create table if not exists usuario
(
    usuario_id          int auto_increment
        primary key,
    nombre              varchar(150)                         not null,
    es_activo           tinyint(1) default 0                 not null,
    fecha_creacion      datetime   default CURRENT_TIMESTAMP not null,
    tiempo_default_id   int                                  not null,
    fecha_actualizacion datetime   default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    constraint usuario_tiempo_default_tiempo_default_id_fk
        foreign key (tiempo_default_id) references tiempo_default (tiempo_default_id)
);

create table if not exists pomodoro
(
    pomodoro_id    int auto_increment
        primary key,
    fecha_creacion datetime default CURRENT_TIMESTAMP not null,
    usuario_id     int                                not null,
    constraint pomodoro_usuario_usuario_id_fk
        foreign key (usuario_id) references usuario (usuario_id)
);

create table if not exists ciclo
(
    ciclo_id       int auto_increment
        primary key,
    tiempo         int                                not null,
    fecha_creacion datetime default CURRENT_TIMESTAMP not null,
    tipo_ciclo_id  int                                not null,
    pomodoro_id    int                                not null,
    numero_ciclo   int                                not null,
    constraint ciclo_pomodoro_pomodoro_id_fk
        foreign key (pomodoro_id) references pomodoro (pomodoro_id),
    constraint ciclo_tipo_ciclo_tipo_ciclo_id_fk
        foreign key (tipo_ciclo_id) references tipo_ciclo (tipo_ciclo_id)
);

create table if not exists penalizacion
(
    penalizacion_id      int auto_increment
        primary key,
    tiempo               decimal(10, 2)                     not null,
    fecha_creacion       datetime default CURRENT_TIMESTAMP not null,
    tipo_penalizacion_id int                                not null,
    pomodoro_id          int                                not null,
    constraint penalizacion_pomodoro_pomodoro_id_fk
        foreign key (pomodoro_id) references pomodoro (pomodoro_id),
    constraint penalizacion_tipo_penalizacion_tipo_penalizacion_id_fk
        foreign key (tipo_penalizacion_id) references tipo_penalizacion (tipo_penalizacion_id)
);

