#include <Arduino.h>
#include <ArduinoJson.h>

#include "variables/variable.hpp"
#include "utilidades/utilidad.h"
#include "storage/settings.hpp"
#include "funciones.hpp"

#include "devices/select_device_onewire.hpp"
#include "devices/select_device_ultrasonico.hpp"
#include "devices/select_device_humedad.hpp"

#include "protocol/conexion.hpp"
#include "json/select_com_json.hpp"
#include "task.hpp"

/*
======================================

pin oneWire ds18b20 : 32
pin humedad : 39
pin ultrasonico trigPin : 19
pin ultrasonico echoPin : 18
pin bomba de agua : 23

======================================
*/
void setup()
{

  pinMode(2, OUTPUT);
  pinMode(BOMBA, OUTPUT);
  setCpuFrequencyMhz(FRECUENCIA_ESP32);
  delay(TIME_INICIO);

  Serial_Mod();

  inicia_setting();

  Serial.println("----------------------------------------------");
  device_id = deviceID();
  Serial.println("Device ID: " + device_id);
  Serial.println("Version: " + device_fw_version);
  Serial.println("----------------------------------------------");

  Wifi_mod(Modo_STA);

  begin_devices_onewire();
  begin_devices_sonar();
  begin_devices_humedad();

  begin_task();
}

void loop()
{

  conexion_wifi();
  get_humedad();

  envia_sensores_mqtt();
  sensores_test();

  debugger_recibe_json();
}
