
long time_temp1, time_temp1_limit;
long time_temp2, time_temp2_limit;
long time_hum1, time_hum1_limit;
long time_dist1, time_dist1_limit;

long time_sensores_get;
long time_all_limit;

// topicos a publicar
char topic_temp1[35];
char topic_temp2[35];
char topic_hum1[35];
char topic_dist1[35];

//bomba
long tiempo_activa_bomba;
long control_bomba;
int bomba_status;
bool valida_bomba;
bool send_init_bomba = false;
bool send_end_bomba = false;

//temperatura
float temperatura1_read;
float temperatura2_read;
long time_temperatura;

//sonar
long duration;
float distanceCm;
float distanceInch;
long time_sensor;

//humedad
int porcentajehum;
float lectura_humedad;
long time_humedad;

//sonar
int nivel_agua_min;
int nivel_agua_max;

int altura_del_tanque;
int porcentajedist;