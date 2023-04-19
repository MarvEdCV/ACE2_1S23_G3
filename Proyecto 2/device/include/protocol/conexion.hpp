#include "wifi/WIFI.hpp"
#include "mqtt/MQTT.hpp"

void envia_sensores_mqtt()
{

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

            // temp1
            //=================================================================
            if (millis() > time_temp1 + time_temp1_limit)
            {
                DynamicJsonDocument doc_envia(1023);
                String json_msg;

                // {"device":"dispositivo-001", "name": "temp1", "data": 23}

                char data[5];

                sprintf(data, "%0.2f", temperatura1_read);

                doc_envia["device"] = vNombrePlaca;
                doc_envia["name"] = "temp1";
                doc_envia["data"] = data;

                serializeJson(doc_envia, json_msg);

                //if (mqtt_client.publish(topic_temp1, json_msg.c_str(), false))
                //{
                //    Serial.println(json_msg);
                    // log("temp1 success");
                //}

                time_temp1 = millis();

                delay(10);
            }

            // temp2
            //=================================================================
            if (millis() > time_temp2 + time_temp2_limit)
            {
                DynamicJsonDocument doc_envia(1023);
                String json_msg;

                // {"device":"dispositivo-001", "name": "temp2", "data": 23}

                char data[5];

                sprintf(data, "%0.2f", temperatura2_read);

                doc_envia["device"] = vNombrePlaca;
                doc_envia["name"] = "temp2";
                doc_envia["data"] = data;

                serializeJson(doc_envia, json_msg);

                //if (mqtt_client.publish(topic_temp2, json_msg.c_str(), false))
                //{
                //    Serial.println(json_msg);
                    // log("temp2 success");
                //}

                time_temp2 = millis();

                delay(10);
            }

            // hum1
            //=================================================================
            if (millis() > time_hum1 + time_hum1_limit)
            {
                DynamicJsonDocument doc_envia(1023);
                String json_msg;

                // {"device":"dispositivo-001", "name": "hum1", "data": 23}

                doc_envia["device"] = vNombrePlaca;
                doc_envia["name"] = "hum1";
                doc_envia["data"] = 14;

                serializeJson(doc_envia, json_msg);
                // Serial.println(json_msg);
                /*
                                if (mqtt_client.publish(topic_hum1, json_msg.c_str(), false))
                                {

                                    log("hum1 success");
                                }
                */

                time_hum1 = millis();

                delay(10);
            }

            // dist1
            //=================================================================
            if (millis() > time_dist1 + time_dist1_limit)
            {
                DynamicJsonDocument doc_envia(1023);
                String json_msg;

                // {"device":"dispositivo-001", "name": "dist1", "data": 23}

                doc_envia["device"] = vNombrePlaca;
                doc_envia["name"] = "dist1";
                doc_envia["data"] = 15;

                serializeJson(doc_envia, json_msg);
                // Serial.println(json_msg);
                /*
                                if (mqtt_client.publish(topic_dist1, json_msg.c_str(), false))
                                {

                                    log("dist1 success");
                                }
                */

                time_dist1 = millis();

                delay(10);
            }

            mqtt_client.loop();
        }
    }
}