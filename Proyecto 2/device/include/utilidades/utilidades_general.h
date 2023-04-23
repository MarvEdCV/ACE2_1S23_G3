
#define TEXTIFY(A) #A
#define ESCAPEQUOTE(A) TEXTIFY(A)
String device_fw_version = ESCAPEQUOTE(BUILD_TAG);
// -------------------------------------------------------------------

size_t content_len;
#define U_PART U_SPIFFS
// -------------------------------------------------------------------
#define DEBUGER 115200

#define define_task 3

#define FRECUENCIA_ESP32 240   // Mhz
#define TIME_INICIO 100        // TIEMPO DE INICIO PROGRAMACION
#define null 0
#define LED_ON LOW
#define LED_OFF HIGH

void debugger_recibe_json(void);
void debugger_envia_json(void);

#define LED_ON LOW
#define LED_OFF HIGH

// main
void Serial_Mod();
