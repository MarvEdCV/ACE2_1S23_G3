
// -------------------------------------------------------------------
// Valores de Fábrica al settings.json
// -------------------------------------------------------------------
void settingsReset_mqtt()
{
    // -------------------------------------------------------------------
    // mqtt settings.json
    // -------------------------------------------------------------------

    strlcpy(host_mqtt, "54.183.38.85", sizeof(host_mqtt));
    strlcpy(willMsg, "device OFF", sizeof(willMsg));
    strlcpy(backMsg, "device ON", sizeof(backMsg));
    port_mqtt = 1883;
    suscripcionQos = 0;
    willQos = 0;
    willRetain = false;
    cleanSession = true;
    mqtt_keepalive = 60;
    mqtt_sockettimeout = 15;
    mqtt_buffer = 512;

    // MQTT
    intervalWIFI_MQTT = 30000;

    log("[Store] [ INFO ] Reinicio mqtt"); 
    vTaskDelay(100);
}

// -------------------------------------------------------------------
// Leer settings.json
// -------------------------------------------------------------------
boolean settingsRead_mqtt()
{

    DynamicJsonDocument jsonSettings(capacitySettings);

    File file = SPIFFS.open("/system/settings_mqtt.json", "r");

    if (deserializeJson(jsonSettings, file))
    {
        // Tomar los valores de Fábrica
        settingsReset_mqtt();
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
        // -------------------------------------------------------------------
        // Dispositivo settings.json
        // -------------------------------------------------------------------
        // mqtt settings.json

        strlcpy(host_mqtt, jsonSettings["host_mqtt"], sizeof(host_mqtt));
        strlcpy(willMsg, jsonSettings["willMsg"], sizeof(willMsg));
        strlcpy(backMsg, jsonSettings["backMsg"], sizeof(backMsg));
        port_mqtt = jsonSettings["port_mqtt"];
        suscripcionQos = jsonSettings["suscripcionQos"];
        willQos = jsonSettings["willQos"];
        willRetain = jsonSettings["willRetain"];
        cleanSession = jsonSettings["cleanSession"];
        mqtt_keepalive = jsonSettings["mqtt_keepalive"];
        mqtt_sockettimeout = jsonSettings["mqtt_sockettimeout"];
        mqtt_buffer = jsonSettings["mqtt_buffer"];

        intervalWIFI_MQTT = jsonSettings["intervalWIFI_MQTT"];
        // -------------------------------------------------------------------

        file.close();
        // log("[ INFO ] Lectura de las configuraciones correcta");
        return true;
    }
}
// -------------------------------------------------------------------
// Guardar settings.json
// -------------------------------------------------------------------
boolean settingsSave_mqtt()
{

    if (spiffs_settings == 0)
    {
        log("retorno spiffs settings_mqtt");
        return false;
    }

    // StaticJsonDocument<capacitySettings> jsonSettings;
    DynamicJsonDocument jsonSettings(capacitySettings);

    File file = SPIFFS.open("/system/settings_mqtt.json", "w+");

    if (file)
    {
        // -------------------------------------------------------------------
        // mqtt settings.json

        jsonSettings["host_mqtt"] = host_mqtt;
        jsonSettings["willMsg"] = willMsg;
        jsonSettings["backMsg"] = backMsg;
        jsonSettings["port_mqtt"] = port_mqtt;
        jsonSettings["suscripcionQos"] = suscripcionQos;
        jsonSettings["willQos"] = willQos;
        jsonSettings["willRetain"] = willRetain;
        jsonSettings["cleanSession"] = cleanSession;
        jsonSettings["mqtt_keepalive"] = mqtt_keepalive;
        jsonSettings["mqtt_sockettimeout"] = mqtt_sockettimeout;
        jsonSettings["mqtt_buffer"] = mqtt_buffer;

        // MQTT
        jsonSettings["intervalWIFI_MQTT"] = intervalWIFI_MQTT;
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