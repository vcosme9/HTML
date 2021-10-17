create table Medicion (
    usuario TEXT(8) not null,
    fecha TEXT(20) not null,
    medicion float(80) not null,
    primary key (usuario)
);