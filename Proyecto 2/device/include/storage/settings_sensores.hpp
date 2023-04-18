
void settingsReset_sensores()
{
    //--------------------------------------------------------------------

    // -------------------------------------------------------------------

    log("[Store] [ INFO ] Reinicio sensores");
    vTaskDelay(100);
}

boolean settingsRead_sensores()
{

    DynamicJsonDocument jsonSettings(capacitySettings);

    File file = SPIFFS.open("/system/settings_sensores.json", "r");

    if (deserializeJson(jsonSettings, file))
    {
        // Tomar los valores de Fábrica
        settingsReset_sensores();
        DeserializationError error = deserializeJson(jsonSettings, file);
        log("[Store] [ ERROR ] Fallo la lectura de las configuraciones, tomando valores por defecto");
        if (error)
        {
            log("[Store] [ ERROR ] " + String(error.c_str()));
        }
        return false;
    }
    else
    {

        //--------------------------------------------------------------------

        // -------------------------------------------------------------------

        file.close();
        // log("[ INFO ] Lectura de las configuraciones correcta");
        return true;
    }
}
// -------------------------------------------------------------------
// Guardar settings.json
// -------------------------------------------------------------------
boolean settingsSave_sensores()
{

    if (spiffs_settings == 0)
    {
        log("retorno spiffs settings_sensores");
        return false;
    }

    // StaticJsonDocument<capacitySettings> jsonSettings;
    DynamicJsonDocument jsonSettings(capacitySettings);

    File file = SPIFFS.open("/system/settings_sensores.json", "w+");

    if (file)
    {

        //--------------------------------------------------------------------

        // -------------------------------------------------------------------

        serializeJsonPretty(jsonSettings, file);
        file.close();
        log("[Store] [ INFO ] Configuracion Guardada correctamente");
        if (debugger_store == true)
            serializeJsonPretty(jsonSettings, Serial);
        return true;
    }
    else
    {
        log("[Store] [ ERROR ] Fallo el guardado de la configuracion");
        return false;
    }
}