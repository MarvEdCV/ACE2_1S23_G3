#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>

String serverName = "http://192.168.0.2:4010/api";

unsigned long lastTime = 0;
unsigned long timerDelay = 5000;

unsigned long tiempo = 25;
StaticJsonDocument<256> doc;


void setup()
{
  Serial.begin(9600);
  Serial.println();

  WiFi.begin("FAM-HD", "*****");

  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  Serial.print("Connected, IP address: ");
  Serial.println(WiFi.localIP());

  getTiempoDefault();
}

void loop() {
  if ((millis() - lastTime) > timerDelay) {
    //getTiempoDefault();
    lastTime = millis();
  }
}

//obtener el tiempo defoult
void getTiempoDefault() {
  String value = httpService("tiempo-default");

  int valorDefoult = jsonService(value, "tiempo_pomodoro");

  Serial.println(valorDefoult);
}

int jsonService(String json, String value) {
  auto error = deserializeJson(doc, json);
  int val;
  if(error) {
    Serial.println("deserializeJson failed");
    return 0;
  }

  JsonArray root = doc.as<JsonArray>();

  for(JsonObject o: root){
    val = o[value];     
  }

  return val;
}

String httpService(String api) {
  
  String payload = "";

  if(WiFi.status()== WL_CONNECTED){
    WiFiClient client;
    HTTPClient http;

    String serverPath = serverName +"/"+ api;
  
    http.begin(client, serverPath.c_str());

    int httpResponseCode = http.GET();
    
    if (httpResponseCode>0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      payload = http.getString();
      Serial.println(payload);
    }
    else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }
  else {
    Serial.println("WiFi Disconnected");
  }

  return payload;
}