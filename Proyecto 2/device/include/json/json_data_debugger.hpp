
/*
ARDUINOJSON_DECODE_UNICODE Permite emplear caracteres unicode (\uXXXX)
ARDUINOJSON_DEFAULT_NESTING_LIMIT: Define el límite de anidado
ARDUINOJSON_ENABLE_NAN Emplear 'NaN' o 'null'
ARDUINOJSON_ENABLE_INFINITY Emplear 'Infinity' o 'null'
ARDUINOJSON_NEGATIVE_EXPONENTIATION_THRESHOLD Usar notación científica para números pequeños
ARDUINOJSON_POSITIVE_EXPONENTIATION_THRESHOLD Usar notación científica para números grandes1
ARDUINOJSON_USE_LONG_LONG Emplar 'long' o 'long long' para números enteros
ARDUINOJSON_USE_DOUBLE Emplear 'float' o 'double' para números en coma flotante
*/

#define TIME_DEBUGGER_JSON 100 // tiempo de envio json

long time_debugger_json;
String comandos_debugger_json;
String JSON_DEBUGGER;

void debugger_recibe_json(void)
{
  if (Serial.available())
  {
    while (Serial.available())
    {
      String chat = Serial.readString();
      comandos_debugger_json = "Msg:/" + chat + "&";
    }
    if (comandos_debugger_json.indexOf("Msg:/") >= 0)
    {
      int pos1 = comandos_debugger_json.indexOf('{');
      int pos2 = comandos_debugger_json.indexOf('&');
      JSON_DEBUGGER = comandos_debugger_json.substring(pos1, pos2);

      JSON_DEBUGGER.trim();
      // Serial.println(JSON);

      //--------------
      // Serial.println("paquete Json: ");

      DynamicJsonDocument doc_recibe(2046);

      DeserializationError error = deserializeJson(doc_recibe, JSON_DEBUGGER);
      if (error)
      {
        JSON_DEBUGGER = "";
        return;
      }
      else
      {

        //-----------------------------------------------------------------
        input_json_cmd_wifi(JSON_DEBUGGER);
        input_json_cmd_mqtt(JSON_DEBUGGER);

        //-----------------------------------------------------------------

      }
      //--------------
      Serial.flush();
    }
  }
}

void debugger_envia_json(void)
{

  DynamicJsonDocument doc_envia(2048);

  if (millis() > time_debugger_json + TIME_DEBUGGER_JSON)
  {

    time_debugger_json = millis();
  }
}
