bool spiffs_settings; // activa o desactiva el guardado en spiffs para todos

bool debugger_serial;
bool debugger_store;

long intervalWIFI_STA;
int reconexion_intentos;

bool reconect_wifi_sta = false;
bool activar_wifi_sta = false;
int wifi_mode;

String vNombrePlaca;
String ssid_udp_sta;         // Nombre de la red WiFi
String password_udp_sta;     // Contraseña de la Red WiFi
String device_id;
int cont_out;

long tiempo_previo_sta;