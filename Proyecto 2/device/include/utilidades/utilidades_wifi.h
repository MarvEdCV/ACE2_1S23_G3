
#define Modo_AP 0
#define Modo_STA 1
#define Modo_AP_STA 2
#define Modo_Null -1

// protocol/wifi/WIFI.hpp

void Wifi_udp_sta(void);
void Wifi_mod(byte modos);
void cliente_udp_sta();

void conexion_wifi();
