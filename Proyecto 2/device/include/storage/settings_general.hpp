
void settingsReset_general()
{
    //--------------------------------------------------------------------

    vNombrePlaca = "dispositivo-001";
    ssid_udp_sta = "data_test";
    password_udp_sta = "123456789000";
    intervalWIFI_STA = 5000; // 5 segundos de descanso antes de intentar conexion wifi
    reconexion_intentos = 3; // 3 intentos de conectar STA
    // -------------------------------------------------------------------

    // spifss
    spiffs_settings = true;
    //--------------------------------------------------------------------

    // debugger
    debugger_serial = true;
    debugger_store = true;
    // -------------------------------------------------------------------

    log("[Store] [ INFO ] Reinicio general");
    vTaskDelay(100);
}

// -------------------------------------------------------------------
// Leer settings.json
// -------------------------------------------------------------------
boolean settingsRead_general()
{

    DynamicJsonDocument jsonSettings(capacitySettings);

    File file = SPIFFS.open("/system/settings_general.json", "r");

    if (deserializeJson(jsonSettings, file))
    {
        // Tomar los valores de Fábrica
        settingsReset_general();
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

        String msgNombre = jsonSettings["vNombrePlaca"];
        vNombrePlaca = msgNombre;

        String ssid_sta = jsonSettings["ssid_udp_sta"];
        ssid_udp_sta = ssid_sta;

        String pass_sta = jsonSettings["password_udp_sta"];
        password_udp_sta = pass_sta;

        intervalWIFI_STA = jsonSettings["intervalWIFI_STA"];
        reconexion_intentos = jsonSettings["reconexion_intentos"];

        // -------------------------------------------------------------------
        // SPIFFS
        spiffs_settings = jsonSettings["spiffs_settings"];
        //--------------------------------------------------------------------

        // debugger
        debugger_serial = jsonSettings["debugger_serial"];
        debugger_store = jsonSettings["debugger_store"];

        file.close();
        // log("[ INFO ] Lectura de las configuraciones correcta");
        return true;
    }
}
// -------------------------------------------------------------------
// Guardar settings.json
// -------------------------------------------------------------------
boolean settingsSave_general()
{

    if (spiffs_settings == 0)
    {
        log("retorno spiffs settings_general");
        return false;
    }

    // StaticJsonDocument<capacitySettings> jsonSettings;
    DynamicJsonDocument jsonSettings(capacitySettings);

    File file = SPIFFS.open("/system/settings_general.json", "w+");

    if (file)
    {

        jsonSettings["vNombrePlaca"] = vNombrePlaca;
        
        jsonSettings["ssid_udp_sta"] = ssid_udp_sta;
        jsonSettings["password_udp_sta"] = password_udp_sta;
        jsonSettings["intervalWIFI_STA"] = intervalWIFI_STA;
        jsonSettings["reconexion_intentos"] = reconexion_intentos;

        //--------------------------------------------------------------------
        // SPIFFS
        jsonSettings["spiffs_settings"] = spiffs_settings;
        // -------------------------------------------------------------------

        // debugger
        //  -------------------------------------------------------------------
        jsonSettings["debugger_serial"] = debugger_serial;
        jsonSettings["debugger_store"] = debugger_store;

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