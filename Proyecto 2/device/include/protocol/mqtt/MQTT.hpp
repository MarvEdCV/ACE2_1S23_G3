
#include <PubSubClient.h>

WiFiClient mqttClient;
PubSubClient mqtt_client(mqttClient);

void callback(char *topic, byte *message, unsigned int length)
{
    DynamicJsonDocument doc_recibe(1024);

    Serial.print("Topic: ");
    Serial.print(topic);
    Serial.print(" : Msg: ");
    String messageTemp;

    for (int i = 0; i < length; i++)
    {
        Serial.print((char)message[i]);
        messageTemp += (char)message[i];
    }
    Serial.println();

    DeserializationError error = deserializeJson(doc_recibe, messageTemp);
    if (error)
    {
        log("Error json");
        return;
    }
    {
        int checksum = 0;

        if (doc_recibe["Status"])
        {

            String _status = doc_recibe["Status"];

            if (_status == "ON")
                digitalWrite(2, HIGH);

            if (_status == "OFF")
                digitalWrite(2, LOW);

            Serial.println(_status);
        }

        if (doc_recibe["status_bomba"] || doc_recibe["status_bomba"] == 0)
        {
            int _bomba = doc_recibe["status_bomba"];

            log("Bomba status: " + String(_bomba));

            if (_bomba == 1)
            {
                control_bomba = millis();
                valida_bomba = true;
                // envia data
                send_init_bomba = true;
            }
            else
            {
                control_bomba = millis();

                if (valida_bomba == true)
                {
                    valida_bomba = false;
                    // envia data
                    send_end_bomba = true;
                }
            }
        }

        if (doc_recibe["tiempo_activa_bomba"] || doc_recibe["tiempo_activa_bomba"] == 0)
        {

            long _tiempo_activa_bomba = doc_recibe["tiempo_activa_bomba"];

            if (_tiempo_activa_bomba != tiempo_activa_bomba)
            {

                tiempo_activa_bomba = _tiempo_activa_bomba;
                checksum++;
            }

            log("Tiempo bomba ON: " + String(tiempo_activa_bomba));
        }

        if (doc_recibe["altura_del_tanque"] || doc_recibe["altura_del_tanque"] == 0)
        {
            int _altura_del_tanque = doc_recibe["altura_del_tanque"];

            if (_altura_del_tanque != altura_del_tanque)
            {

                altura_del_tanque = _altura_del_tanque;
                checksum++;
            }

            log("Altura del tanque: " + String(altura_del_tanque));
        }

        if (doc_recibe["nivel_humedad_min"] || doc_recibe["nivel_humedad_min"] == 0)
        {
            int _nivel_humedad_min = doc_recibe["nivel_humedad_min"];

            if (_nivel_humedad_min != nivel_humedad_min)
            {

                nivel_humedad_min = _nivel_humedad_min;
                checksum++;
            }

            log("Alerta agua min: " + String(nivel_humedad_min));
        }

        if (doc_recibe["nivel_humedad_max"] || doc_recibe["nivel_humedad_max"] == 0)
        {
            int _nivel_humedad_max = doc_recibe["nivel_humedad_max"];

            if (_nivel_humedad_max != nivel_humedad_max)
            {

                nivel_humedad_max = _nivel_humedad_max;
                checksum++;
            }

            log("Alerta agua max: " + String(nivel_humedad_max));
        }

        if (doc_recibe["time_temp1_limit"] || doc_recibe["time_temp1_limit"] == 0)
        {
            int _time_temp1_limit = doc_recibe["time_temp1_limit"];

            if (_time_temp1_limit != time_temp1_limit)
            {

                time_temp1_limit = _time_temp1_limit;
                checksum++;
            }

            log("Send temp1 mqtt: " + String(time_temp1_limit));
        }

        if (doc_recibe["time_temp2_limit"] || doc_recibe["time_temp2_limit"] == 0)
        {
            int _time_temp2_limit = doc_recibe["time_temp2_limit"];

            if (_time_temp2_limit != time_temp2_limit)
            {

                time_temp2_limit = _time_temp2_limit;
                checksum++;
            }

            log("Send temp2 mqtt: " + String(time_temp2_limit));
        }

        if (doc_recibe["time_hum1_limit"] || doc_recibe["time_hum1_limit"] == 0)
        {
            int _time_hum1_limit = doc_recibe["time_hum1_limit"];

            if (_time_hum1_limit != time_hum1_limit)
            {

                time_hum1_limit = _time_hum1_limit;
                checksum++;
            }

            log("Send hum1 mqtt: " + String(time_hum1_limit));
        }

        if (doc_recibe["time_dist1_limit"] || doc_recibe["time_dist1_limit"] == 0)
        {
            int _time_dist1_limit = doc_recibe["time_dist1_limit"];

            if (_time_dist1_limit != time_dist1_limit)
            {

                time_dist1_limit = _time_dist1_limit;
                checksum++;
            }

            log("Send dist1 mqtt: " + String(time_dist1_limit));
        }

        if (checksum > 0)
        {

            validar_spiffs_sensores = true;
        }
   
   
    }
}

void inicia_mqtt()
{
    mqtt_client.setServer(host_mqtt, port_mqtt); // connecting to mqtt server

    mqtt_client.setCallback(callback);

    mqtt_client.setKeepAlive(mqtt_keepalive);
    mqtt_client.setSocketTimeout(mqtt_sockettimeout);
    mqtt_client.setBufferSize(mqtt_buffer);

    String _client = mqtt_clientId;
    _client += String(random(0xffff), HEX);

    // sprintf(topicWill, "%s/status", user_mqtt.c_str());
    // if (mqtt_client.connect(_client.c_str(), user_mqtt.c_str(), pass_mqtt.c_str(), topicWill, willQos, willRetain, willMsg, cleanSession))
    if (mqtt_client.connect(_client.c_str(), user_mqtt.c_str(), pass_mqtt.c_str()))
    {
        Serial.println("connected to MQTT");
        mqtt_client.subscribe("backend/status", suscripcionQos);
        mqtt_client.subscribe(sub_config, suscripcionQos);

        log("status on success");
    }
}

void reconectar_mqtt()
{
    if (millis() > time_reconect_mqtt + 5000)
    {

        String _client = mqtt_clientId;
        _client += String(random(0xffff), HEX);

        Serial.println("Attempting MQTT connection...");

        // sprintf(topicWill, "%s/status", user_mqtt.c_str());
        // if (mqtt_client.connect(mqtt_clientId.c_str(), user_mqtt.c_str(), pass_mqtt.c_str(), topicWill, willQos, willRetain, willMsg, cleanSession))
        if (mqtt_client.connect(_client.c_str(), user_mqtt.c_str(), pass_mqtt.c_str()))
        {
            Serial.println("connected to MQTT");
            mqtt_client.subscribe("backend/status", suscripcionQos);
            mqtt_client.subscribe(sub_config, suscripcionQos);

            log("status on success");
        }
        else
        {
            Serial.print("failed, rc=");
            Serial.print(mqtt_client.state());
            Serial.println(" try again in 5 seconds");
        }

        time_reconect_mqtt = millis();
    }
}
