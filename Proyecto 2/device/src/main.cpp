#include <Arduino.h>
#include <ArduinoJson.h>

#include "variables/variable.hpp"
#include "utilidades/utilidad.h"
#include "storage/settings.hpp"
#include "funciones.hpp"

void setup() {

  setCpuFrequencyMhz(FRECUENCIA_ESP32);
  delay(TIME_INICIO);

  Serial.begin(115200);

  inicia_setting();

  Serial.println("----------------------------------------------");
  device_id = deviceID();
  Serial.println("Device ID: " + device_id);
  Serial.println("Version: " + device_fw_version);
  Serial.println("----------------------------------------------");

}

void loop() {

}