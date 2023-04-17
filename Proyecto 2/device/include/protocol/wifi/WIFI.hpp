
#include <WiFi.h>
#include <HTTPClient.h>

IPAddress myIP_STA;

void Wifi_mod(byte modos)
{

       WiFi.disconnect(true);
       WiFi.mode(WIFI_OFF); // turn off WIFI

       switch (modos)
       {
       case 1:
              Wifi_udp_sta(); // se conecta a un master y envia datos
              break;
       }

       inicia_mqtt();
}

void Wifi_udp_sta(void)
{

       log("[Wifi] Configuring STA...");
       log("[Wifi] Conectando..");

       WiFi.mode(WIFI_STA);
       WiFi.hostname("host");
       WiFi.setSleep(WIFI_PS_NONE);
       WiFi.begin(ssid_udp_sta.c_str(), password_udp_sta.c_str());

       byte out = 0;
       while (WiFi.status() != WL_CONNECTED && out < 30)
       {
              out++;
              Serial.print("[Wifi] WiFi: ");
              Serial.print("SSID: " + ssid_udp_sta);
              Serial.println(" , PASS: " + password_udp_sta);
              vTaskDelay(500);
       }
       if (WiFi.status() == WL_CONNECTED)
       {
              WiFi.setAutoReconnect(true);
              WiFi.persistent(true);

              myIP_STA = WiFi.localIP();

              log("");
              log("[Wifi] SSID: " + ssid_udp_sta);
              log("[Wifi] PASS: " + password_udp_sta);
              log("[Wifi] IP Adress: " + ipStr(myIP_STA));
              log("[Wifi] Mac STA: " + WiFi.macAddress());
              vTaskDelay(500);
       }
       else
       {
              log("[ ERROR ] WiFi no conectado");

              WiFi.disconnect(true);
              WiFi.mode(WIFI_OFF);
              vTaskDelay(500);
       }
}

void conexion_wifi()
{

              if (WiFi.status() != WL_CONNECTED && (millis() > tiempo_previo_sta + intervalWIFI_STA))
              {

                     WiFi.disconnect(true);
                     WiFi.reconnect();

                     log("[ INFO ] reconectar");

                     cont_out++;
                     log("[WIFI] intentos de conexion: " + String(cont_out) + "/" + String(reconexion_intentos));

                     if (cont_out >= reconexion_intentos)
                     {
                            cont_out = 0;
                            
                            Wifi_udp_sta();
                     }

                     tiempo_previo_sta = millis();
              } 
              else 

              tiempo_previo_sta = millis();
}
