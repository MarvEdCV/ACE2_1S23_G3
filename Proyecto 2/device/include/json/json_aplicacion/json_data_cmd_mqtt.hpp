String input_json_cmd_mqtt(String input)
{

    DynamicJsonDocument doc_recibe(2048);
    String response;

    DeserializationError error = deserializeJson(doc_recibe, input);
    if (error)
    {
        // log("Error Seguridad json entrante");
        response = "Fail";
    }
    else
    {
        if (doc_recibe["admin/admin"])
        {
            // log("Seguridad json entrante");
            response = "Success";

            //------------------------------------------------------------------------------------------

            if (doc_recibe["admin/admin"]["MQTT/HOST"])
            {
                String _host = doc_recibe["admin/admin"]["MQTT/HOST"];

                strlcpy(host_mqtt, _host.c_str(), sizeof(host_mqtt));

                Serial.println("MQTT/HOST: " + String(host_mqtt));

                validar_spiffs_mqtt = true;
            }

            if (doc_recibe["admin/admin"]["MQTT/PORT"] || doc_recibe["admin/admin"]["MQTT/PORT"] == 0)
            {
                port_mqtt = doc_recibe["admin/admin"]["MQTT/PORT"];

                Serial.println("MQTT/PORT: " + String(port_mqtt));

                validar_spiffs_mqtt = true;
            }

            if (doc_recibe["admin/admin"]["MQTT/QOS"] || doc_recibe["admin/admin"]["MQTT/QOS"] == 0)
            {
                suscripcionQos = doc_recibe["admin/admin"]["MQTT/QOS"];

                Serial.println("MQTT/QOS: " + String(suscripcionQos));

                validar_spiffs_mqtt = true;
            }

            //{"admin/admin": {"WIFI/MODE": false}}
            if (doc_recibe["admin/admin"]["MQTT/CLEANS"] == true || doc_recibe["admin/admin"]["MQTT/CLEANS"] == false)
            {

                cleanSession = doc_recibe["admin/admin"]["MQTT/CLEANS"];

                validar_spiffs_mqtt = true;

                Serial.println("MQTT/CLEANS" + String(cleanSession));
            }

            if (doc_recibe["admin/admin"]["MQTT/KEEP"] || doc_recibe["admin/admin"]["MQTT/KEEP"] == 0)
            {
                mqtt_keepalive = doc_recibe["admin/admin"]["MQTT/KEEP"];

                Serial.println("MQTT/KEEP: " + String(mqtt_keepalive));

                validar_spiffs_mqtt = true;
            }

        }
    }

    return response;
}