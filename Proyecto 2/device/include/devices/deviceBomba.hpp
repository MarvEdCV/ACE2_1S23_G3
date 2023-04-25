void get_bomba()
{
    if (valida_bomba == true)
    {
        digitalWrite(BOMBA, HIGH);
        bomba_status = 1;

        if (millis() > control_bomba + tiempo_activa_bomba)
        {

            digitalWrite(BOMBA, LOW);
            valida_bomba = false;
            bomba_status = 0;

            send_end_bomba = true;

            control_bomba = millis();
        }
    }
    else
    {
        digitalWrite(BOMBA, LOW);
        bomba_status = 0;
    }
}