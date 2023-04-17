
char host_mqtt[25];
int port_mqtt = 1883;
String mqtt_clientId;
String user_mqtt;
String pass_mqtt;
int suscripcionQos = 0;

char willMsg[25];
char backMsg[25];
int willQos = 0;
bool willRetain;
bool cleanSession;

int mqtt_keepalive;
int mqtt_sockettimeout;
int mqtt_buffer;

long intervalWIFI_MQTT;
long time_send_mqtt;

char topic[75];
char topicWill[75];

long time_reconect_mqtt;