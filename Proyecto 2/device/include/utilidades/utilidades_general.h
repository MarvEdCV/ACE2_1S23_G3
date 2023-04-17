
#define TEXTIFY(A) #A
#define ESCAPEQUOTE(A) TEXTIFY(A)
String device_fw_version = ESCAPEQUOTE(BUILD_TAG);
// -------------------------------------------------------------------

size_t content_len;
#define U_PART U_SPIFFS
// -------------------------------------------------------------------

#define define_task 2

#define FRECUENCIA_ESP32 240   // Mhz
#define TIME_INICIO 100        // TIEMPO DE INICIO PROGRAMACION
#define null 0
#define LED_ON LOW
#define LED_OFF HIGH

