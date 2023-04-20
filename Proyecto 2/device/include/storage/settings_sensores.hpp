
void settingsReset_sensores()
{
    //--------------------------------------------------------------------
    // publicaciones
    strlcpy(topic_temp1, "device/temp1/set", sizeof(topic_temp1));
    strlcpy(topic_temp2, "device/temp2/set", sizeof(topic_temp2));
    strlcpy(topic_hum1, "device/hum1/set", sizeof(topic_hum1));
    strlcpy(topic_dist1, "device/dist1/set", sizeof(topic_dist1));
    strlcpy(topic_all, "device/sensores/all", sizeof(topic_all));

    // subscripciones
    strlcpy(sub_config, "device/sensores/config", sizeof(sub_config));

    // timepo de envios al broker
    time_temp1_limit = 1000;
    time_temp2_limit = 1000;
    time_hum1_limit = 1000;
    time_dist1_limit = 1000;

    time_all_limit = 1000;
    //--------------------------------
    nivel_agua_min = 50;
    nivel_agua_max = 80;
    tiempo_activa_bomba = 10000; // 10 sec

    altura_del_tanque = 100; // centimetros
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

        strlcpy(topic_temp1, jsonSettings["topic_temp1"], sizeof(topic_temp1));
        strlcpy(topic_temp2, jsonSettings["topic_temp2"], sizeof(topic_temp2));
        strlcpy(topic_hum1, jsonSettings["topic_hum1"], sizeof(topic_hum1));
        strlcpy(topic_dist1, jsonSettings["topic_dist1"], sizeof(topic_dist1));

        strlcpy(topic_all, jsonSettings["topic_all"], sizeof(topic_all));

        strlcpy(sub_config, jsonSettings["sub_config"], sizeof(sub_config));

        time_temp1_limit = jsonSettings["time_temp1_limit"];
        time_temp2_limit = jsonSettings["time_temp2_limit"];
        time_hum1_limit = jsonSettings["time_hum1_limit"];
        time_dist1_limit = jsonSettings["time_dist1_limit"];

        time_all_limit = jsonSettings["time_all_limit"];

        nivel_agua_min = jsonSettings["nivel_agua_min"];
        nivel_agua_max = jsonSettings["nivel_agua_max"];
        tiempo_activa_bomba = jsonSettings["tiempo_activa_bomba"];

        altura_del_tanque = jsonSettings["altura_del_tanque"];
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
        jsonSettings["topic_temp1"] = topic_temp1;
        jsonSettings["topic_temp2"] = topic_temp2;
        jsonSettings["topic_hum1"] = topic_hum1;
        jsonSettings["topic_dist1"] = topic_dist1;

        jsonSettings["topic_all"] = topic_all;

        jsonSettings["sub_config"] = sub_config;

        jsonSettings["time_temp1_limit"] = time_temp1_limit;
        jsonSettings["time_temp2_limit"] = time_temp2_limit;
        jsonSettings["time_hum1_limit"] = time_hum1_limit;
        jsonSettings["time_dist1_limit"] = time_dist1_limit;

        jsonSettings["time_all_limit"] = time_all_limit;

        jsonSettings["nivel_agua_min"] = nivel_agua_min;
        jsonSettings["nivel_agua_max"] = nivel_agua_max;
        jsonSettings["tiempo_activa_bomba"] = tiempo_activa_bomba;

        jsonSettings["altura_del_tanque"] = altura_del_tanque;
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