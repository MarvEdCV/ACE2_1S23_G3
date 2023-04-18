#if define_task >= 1
void Task1code(void *pvParameters);
TaskHandle_t Task1;
#endif

#if define_task >= 2
void Task2code(void *pvParameters);
TaskHandle_t Task2;
#endif

#if define_task >= 3
void Task3code(void *pvParameters);
TaskHandle_t Task3;
#endif

#if define_task >= 4
void Task4code(void *pvParameters);
TaskHandle_t Task4;
#endif

#ifdef __cplusplus
extern "C"
{
#endif
  uint8_t temprature_sens_read();
#ifdef __cplusplus
}
#endif
uint8_t temprature_sens_read();

void begin_task()
{

#if define_task >= 1
  // create a task that will be executed in the Task1code() function, with priority 1 and executed on core 0
  xTaskCreatePinnedToCore(
      Task1code, /* Task function. */
      "Task1",   /* name of task. */
      10000,     /* Stack size of task */
      NULL,      /* parameter of the task */
      1,         /* priority of the task */
      &Task1,    /* Task handle to keep track of created task */
      0);        /* Núcleo 0 */
  delay(500);
#endif

#if define_task >= 2
  // create a task that will be executed in the Task2code() function, with priority 1 and executed on core 1
  xTaskCreatePinnedToCore(
      Task2code, /* Task function. */
      "Task2",   /* name of task. */
      10000,     /* Stack size of task */
      NULL,      /* parameter of the task */
      1,         /* priority of the task */
      &Task2,    /* Task handle to keep track of created task */
      1);        /* Núcleo 1 */
  delay(500);
#endif

#if define_task >= 3
  // create a task that will be executed in the Task2code() function, with priority 1 and executed on core 1
  xTaskCreatePinnedToCore(
      Task3code, /* Task function. */
      "Task3",   /* name of task. */
      10000,     /* Stack size of task */
      NULL,      /* parameter of the task */
      1,         /* priority of the task */
      &Task3,    /* Task handle to keep track of created task */
      0);        /* Núcleo 1 */
  delay(500);
#endif

#if define_task >= 4
  // create a task that will be executed in the Task2code() function, with priority 1 and executed on core 1
  xTaskCreatePinnedToCore(
      Task4code, /* Task function. */
      "Task4",   /* name of task. */
      10000,     /* Stack size of task */
      NULL,      /* parameter of the task */
      1,         /* priority of the task */
      &Task4,    /* Task handle to keep track of created task */
      0);        /* Núcleo 1 */
  delay(500);
#endif
}

#if define_task >= 1
// Task1code: blinks an LED every 1000 ms
void Task1code(void *pvParameters)
{
  // Serial.print("Task1 running on core ");
  // Serial.println(xPortGetCoreID());

  for (;;)
  {

    delay(1);
  }
}
#endif

#if define_task >= 2
// Task2code: blinks an LED every 700 ms
void Task2code(void *pvParameters)
{
  // Serial.print("Task2 running on core ");
  // Serial.println(xPortGetCoreID());

  for (;;)
  {
    if (validar_spiffs_general == true)
    {

      settingsSave_general();
      // log("[General] Data general success spiffs task 2");

      validar_spiffs_general = false;
    }

    if (validar_spiffs_mqtt == true)
    {

      settingsSave_mqtt();
      // log("[General] Data mqtt success spiffs task 2");
      validar_spiffs_mqtt = false;
    }

    if (validar_spiffs_sensores == true)
    {

      settingsSave_sensores();
      // log("[General] Data sensores success spiffs task 2");

      validar_spiffs_sensores = false;
    }

    if (validar_default == true)
    {

      settingsReset_general();
      settingsReset_sensores();
      settingsReset_mqtt();

      settingsSave_general();
      settingsSave_sensores();
      settingsSave_mqtt();

      Serial.println("Reiniciando valores por defecto");
      ESP.restart();

      validar_default = false;
    }

    delay(1);
  }
}
#endif

#if define_task >= 3
// Task2code: blinks an LED every 700 ms
void Task3code(void *pvParameters)
{
  // Serial.print("Task3 running on core ");
  // Serial.println(xPortGetCoreID());

  for (;;)
  {

    delay(1);
  }
}
#endif

#if define_task >= 4
// Task2code: blinks an LED every 700 ms
void Task4code(void *pvParameters)
{
  // Serial.print("Task4 running on core ");
  Serial.println(xPortGetCoreID());

  for (;;)
  {

    delay(1);
  }
}
#endif