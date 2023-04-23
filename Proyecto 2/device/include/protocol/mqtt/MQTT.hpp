
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
        if (doc_recibe["Status"])
        {

            String _status = doc_recibe["Status"];

            if (_status == "ON")
                digitalWrite(2, HIGH);

            if (_status == "OFF")
                digitalWrite(2, LOW);

            Serial.println(_status);
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

    sprintf(topicWill, "%s/status", user_mqtt.c_str());

    if (mqtt_client.connect(_client.c_str(), user_mqtt.c_str(), pass_mqtt.c_str(), topicWill, willQos, willRetain, willMsg, cleanSession))
    {
        Serial.println("connected to MQTT");
        mqtt_client.subscribe("backend/status", suscripcionQos);
        mqtt_client.subscribe(sub_config, suscripcionQos);

        if (mqtt_client.publish(topicWill, backMsg, false))
        {
            Serial.println(backMsg);
        }
        else
            log("status on success");
    }
}

void reconectar_mqtt()
{
    if (millis() > time_reconect_mqtt + 5000)
    {

        String _client = mqtt_clientId;
        _client += String(random(0xffff), HEX);

        sprintf(topicWill, "%s/status", user_mqtt.c_str());

        Serial.println("Attempting MQTT connection...");
        if (mqtt_client.connect(mqtt_clientId.c_str(), user_mqtt.c_str(), pass_mqtt.c_str(), topicWill, willQos, willRetain, willMsg, cleanSession))
        {
            Serial.println("connected to MQTT");
            mqtt_client.subscribe("backend/status", suscripcionQos);
            mqtt_client.subscribe(sub_config, suscripcionQos);

            if (mqtt_client.publish(topicWill, backMsg, false))
            {
                Serial.println(backMsg);
            }
            else
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
