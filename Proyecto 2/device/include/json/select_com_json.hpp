
#include "json_aplicacion/json_data_cmd_wifi.hpp"
#include "json_aplicacion/json_data_cmd_mqtt.hpp"
#include "json_data_debugger.hpp"

void Serial_Mod()
{

  Serial.begin(DEBUGER);
  Serial.setTimeout(10);
  //Serial.setDebugOutput(true);

  // Serial.print("Timeout: ");
  // Serial.println(Serial.getTimeout()); // print the new value
}