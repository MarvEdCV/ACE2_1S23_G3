
#include <OneWire.h>
#include <DallasTemperature.h>

// #define ONE_WIRE_BUS 23

long contador_mediciones_sensor;

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
DeviceAddress tempDeviceAddress;

void begin_ds18b20()
{
  // initialize the DS18B20 sensor
  sensors.begin();
}

void begin_sensor()
{
  sensors.begin();

  log("[Temperatura] iniciamos sensor pin 23");

  // Para cambiar la resolución del sensor a: 9, 10, 11 o 12 bits. solo se debe usar la función:
  // sensors.setResolution(Address, 12); // resolución de 9 bits
  // sensors.setResolution(0, 12); // resolución de 9 bits
}

float TEMP_C;
float readDSTemperatureC(uint8_t index)
{

  sensors.requestTemperatures();
  float teC = sensors.getTempCByIndex(index);

  // float tempF = sensors.getTempFByIndex(index);
  // TEMP = tempC;

  if (teC < -120.00)
  {
    log("[Temperatura] Failed to read from DS18B20 sensor");
  }
  else
  {
    TEMP_C = teC;
  }

  return TEMP_C;
}

void read_sensores_temperatura()
{

  if (millis() > time_temperatura + 500)
  {

    sensors.requestTemperaturesByIndex(0);
    float temperatura1 = sensors.getTempCByIndex(0);
    if (temperatura1 != DEVICE_DISCONNECTED_C)
    {
      temperatura1_read = temperatura1;

      // Serial.print("Sensor 1 - Temperatura: ");
      // Serial.print(temperatura1_read);
      // Serial.println(" ºC");
    }
    else
    {
      // Serial.println("Sensor 1 - No se pudo leer la temperatura");
    }

    delay(50);

    sensors.requestTemperaturesByIndex(1);
    float temperatura2 = sensors.getTempCByIndex(1);
    if (temperatura2 != DEVICE_DISCONNECTED_C)
    {
      temperatura2_read = temperatura2;

      // Serial.print("Sensor 2 - Temperatura: ");
      // Serial.print(temperatura2_read);
      // Serial.println(" ºC");
    }
    else
    {
      // Serial.println("Sensor 2 - No se pudo leer la temperatura");
    }

    time_temperatura = millis();
  }
}