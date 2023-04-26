
void get_humedad()
{

    if (millis() > time_humedad + 100)
    {

        lectura_humedad = analogRead(HUMEDAD);

        porcentajehum = map(lectura_humedad, 4095, 1200, 0, 100);

        if (porcentajehum > 100)
            porcentajehum = 100;

        if (porcentajehum < 0)
            porcentajehum = 0;

        // Serial.print("La humedad del suelo es =");
        // Serial.print(porcentajehum);
        // Serial.println("%");

        time_humedad = millis();
    }

    // alertas
    //-------------------------------------------------------

    //-------------------------------------------------------
}