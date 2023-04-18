#include <Arduino.h>
#include <ArduinoJson.h>

#include "variables/variable.hpp"
#include "utilidades/utilidad.h"
#include "storage/settings.hpp"
#include "funciones.hpp"

#include "devices/select_device_onewire.hpp"
#include "devices/select_device_ultrasonico.hpp"

#include "protocol/conexion.hpp"
#include "task.hpp"

/*
======================================
pin oneWire ds18b20 : 23

pin ultrasonico trigPin : 18
pin ultrasonico echoPin : 19
======================================
*/
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

  Wifi_mod(Modo_STA);

  begin_devices_onewire();
  begin_devices_sonar();

  begin_task();
}

void loop() {

  conexion_wifi();
  envia_sensores_mqtt();

}