String input_json_cmd_wifi(String input)
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
            //----------------------------------------------------------------------------

            if (doc_recibe["admin/admin"]["STA/NAME/PASS"])
            {
                String ssid = doc_recibe["admin/admin"]["STA/NAME/PASS"][0];
                String pass = doc_recibe["admin/admin"]["STA/NAME/PASS"][1];

                ssid_udp_sta = ssid;
                password_udp_sta = pass;

                Serial.println("SSDI: " + ssid);
                Serial.println("PASS: " + pass);

                validar_spiffs_general = true;
            }
            //------------------------------------------------------------------------------------------

            if (doc_recibe["admin/admin"]["STA/NAME"])
            {
                String ssid = doc_recibe["admin/admin"]["STA/NAME"];
                ssid_udp_sta = ssid;

                Serial.println("STA/NAME: " + ssid);

                validar_spiffs_general = true;
            }

            if (doc_recibe["admin/admin"]["STA/PASS"])
            {
                String pass = doc_recibe["admin/admin"]["STA/PASS"];
                password_udp_sta = pass;

                Serial.println("STA/PASS: " + pass);

                validar_spiffs_general = true;
            }

            if (doc_recibe["admin/admin"]["DEVICE/MCLR"] == true)
            {
                validar_default = true;
                Serial.println("DEVICE/MCLR");
            }

            if (doc_recibe["admin/admin"]["DEVICE/IP/STA"] == true)
            {

                Serial.println("[Wifi] IP Adress: " + ipStr(myIP_STA));
            }

            if (doc_recibe["admin/admin"]["DEVICE/NAME"])
            {
                String vName = doc_recibe["admin/admin"]["DEVICE/NAME"];
                vNombrePlaca = vName;

                Serial.println("Name: " + vName);

                validar_spiffs_general = true;

                Serial.println("Reiniciando micro...");

                delay(2000);
                ESP.restart();
            }

            if (doc_recibe["admin/admin"]["APP/RESET"] == true || (doc_recibe["admin/admin"]["APP/RESET"] == false))
            {
                Serial.println("Reiniciando micro...");

                delay(2000);
                ESP.restart();
            }
        }
    }

    return response;
}