#include "wifi/WIFI.hpp"
#include "mqtt/MQTT.hpp"

void envia_sensores_mqtt()
{

    if (WiFi.status() != WL_CONNECTED)
        return;

    if (!mqtt_client.connected())
    {
        reconectar_mqtt();
    }
    else
    {
        // temp1
        //=================================================================
        if (millis() > time_temp1 + time_temp1_limit)
        {
            DynamicJsonDocument doc_envia(1023);
            String json_msg;

            // {"device":"dispositivo-001", "name": "temp1", "data": 23}

            char data[6];

            sprintf(data, "%0.2f", temperatura1_read);

            doc_envia["device"] = vNombrePlaca;
            doc_envia["name"] = "temp1";
            doc_envia["data"] = data;

            serializeJson(doc_envia, json_msg);

            if (mqtt_client.publish(topic_temp1, json_msg.c_str(), false))
            {
                // Serial.println(json_msg);
                //  log("temp1 success");
            }
            else
                log("temp1 fail");

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

            char data[6];

            sprintf(data, "%0.2f", temperatura2_read);

            doc_envia["device"] = vNombrePlaca;
            doc_envia["name"] = "temp2";
            doc_envia["data"] = data;

            serializeJson(doc_envia, json_msg);

            if (mqtt_client.publish(topic_temp2, json_msg.c_str(), false))
            {
                // Serial.println(json_msg);
                //  log("temp2 success");
            }
            else
                log("temp2 fail");

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
            doc_envia["data"] = porcentajehum;

            serializeJson(doc_envia, json_msg);

            if (mqtt_client.publish(topic_hum1, json_msg.c_str(), false))
            {
                // Serial.println(json_msg);
                //  log("hum1 success");
            }
            else
                log("hum1 fail");

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
            doc_envia["data"] = porcentajedist;

            serializeJson(doc_envia, json_msg);

            if (mqtt_client.publish(topic_dist1, json_msg.c_str(), false))
            {
                // Serial.println(json_msg);
                //  log("dist1 success");
            }
            else
                log("dist1 fail");

            time_dist1 = millis();

            delay(10);
        }

        // sensores
        //=================================================================
        if (millis() > time_sensores_get + time_all_limit)
        {
            DynamicJsonDocument doc_envia(1023);
            String json_msg;

            char temp1[6];
            char temp2[6];

            sprintf(temp1, "%0.2f", temperatura1_read);
            sprintf(temp2, "%0.2f", temperatura2_read);

            // {"device":"dispositivo-001", "name": "dist1", "data": 23}

            doc_envia["device"] = vNombrePlaca;
            doc_envia["name"] = "all";
            doc_envia["TEmp_interior"] = temp1;
            doc_envia["Temp_exterior"] = temp2;
            doc_envia["Humedad"] = porcentajehum;
            doc_envia["Tanque"] = porcentajedist;
            doc_envia["Bomba_status"] = bomba_status;
            doc_envia["Alerta_status"] = alerta_status;

            serializeJson(doc_envia, json_msg);

            if (mqtt_client.publish(topic_all, json_msg.c_str(), false))
            {
                // Serial.println(json_msg);
                // log("all success");
            }
            else
                log("all fail");

            time_sensores_get = millis();

            delay(10);
        }

        if (send_init_bomba == true)
        {

            DynamicJsonDocument doc_envia(1023);
            String json_msg;

            // {"device":"dispositivo-001", "name": "bomba", "data": 23}

            doc_envia["device"] = vNombrePlaca;
            doc_envia["name"] = "bomba";
            doc_envia["data"] = bomba_status;

            serializeJson(doc_envia, json_msg);

            if (mqtt_client.publish(status_out, json_msg.c_str(), false))
            {
                send_init_bomba = false;
                log("bomba init success");
            }
            else
                log("bomba fail");

            delay(10);
        }

        if (send_end_bomba == true)
        {

            DynamicJsonDocument doc_envia(1023);
            String json_msg;

            // {"device":"dispositivo-001", "name": "bomba", "data": 23}

            doc_envia["device"] = vNombrePlaca;
            doc_envia["name"] = "bomba";
            doc_envia["data"] = bomba_status;

            serializeJson(doc_envia, json_msg);

            if (mqtt_client.publish(status_out, json_msg.c_str(), false))
            {
                send_end_bomba = false;
                log("bomba stop success");
            }
            else
                log("bomba fail");

            delay(10);
        }

        if (send_humedad_alerta == true)
        {

            DynamicJsonDocument doc_envia(1023);
            String json_msg;

            // {"device":"dispositivo-001", "name": "alerta", "data": 23}

            doc_envia["device"] = vNombrePlaca;
            doc_envia["name"] = "alerta";
            doc_envia["data"] = porcentajehum;

            serializeJson(doc_envia, json_msg);

            if (mqtt_client.publish(status_out, json_msg.c_str(), false))
            {
                send_humedad_alerta = false;
                log("alerta success");
            }
            else
                log("alerta fail");

            delay(10);
        }

        mqtt_client.loop();
    }
}