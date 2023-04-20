
void get_humedad()
{

    if (millis() > time_humedad + 100)
    {

        lectura_humedad = (100.00 - ((analogRead(HUMEDAD) / 1023.00) * 100.00));

        //Serial.print("La humedad del suelo es =");
        //Serial.print(lectura_humedad);
        //Serial.println("%");

        time_humedad = millis();
    }
}