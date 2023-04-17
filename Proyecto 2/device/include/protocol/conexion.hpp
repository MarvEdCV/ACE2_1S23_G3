#include "wifi/WIFI.hpp"
#include "mqtt/MQTT.hpp"

void envia_sensores_mqtt()
{
    DynamicJsonDocument doc_envia(1023);
    String json_msg;

    if (WiFi.status() == WL_CONNECTED)
    {
        if (!mqtt_client.connected())
        {
            reconectar_mqtt();
        }
        else
        {

            // sensores
            //=================================================================
            if (millis() > time_send_mqtt + intervalWIFI_MQTT)
            {

                doc_envia["Device"] = vNombrePlaca;

                serializeJson(doc_envia, json_msg);
                Serial.println(json_msg);

                mqtt_client.publish("topic/test", json_msg.c_str(), false);

                time_send_mqtt = millis();
            }

            mqtt_client.loop();
        }
    }
}