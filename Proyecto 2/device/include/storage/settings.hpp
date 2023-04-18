#include <SPIFFS.h>
#include <SD.h>

#include "settings_general.hpp"
#include "settings_mqtt.hpp"

#include "settings_sensores.hpp"

void inicia_setting()
{
    // Iniciar el SPIFFS
    if (!SPIFFS.begin(true))
    {
        log("[Store] [ ERROR ] Fallo del SPIFFS");
        // while (true)
        //     ;
        ESP.restart();
    }

    // Leer el Archivo
    // [settings_general.json]
    if (!settingsRead_general())
    {
        settingsSave_general();
        vTaskDelay(100);
    }
    else
        log("[Store] [/system/settings_general.json] success");

    // Leer el Archivo
    // [settings_mqtt.json]
    if (!settingsRead_mqtt())
    {
        settingsSave_mqtt();
        vTaskDelay(100);
    }
    else
        log("[Store] [/system/settings_mqtt.json] success");

    // Leer el Archivo
    // [settings_sensores.json]
    if (!settingsRead_sensores())
    {
        settingsSave_sensores();
        vTaskDelay(100);
    }
    else
        log("[Store] [/system/settings_sensores.json] success");

    log("[Store] Iniciamos datos desde spiffs");
}
