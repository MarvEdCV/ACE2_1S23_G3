// funciones.hpp
void log(String s);
float tiempo_alerta_min(float time);
float tiempo_alerta_sec(float time);
IPAddress CharToIP(const char *str);
String ipStr(const IPAddress &ip);
String platform();
//String hexStr(const unsigned long &h, const byte &l = 8);
String idUnique();
String split(String data, char separator, int index);
String deviceID();

void sensores_test();