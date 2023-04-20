void get_sonar()
{

    if (millis() > time_sensor + 100)
    {

        // Clears the trigPin
        digitalWrite(trigPin, LOW);
        delayMicroseconds(2);

        // Sets the trigPin on HIGH state for 10 micro seconds
        digitalWrite(trigPin, HIGH);
        delayMicroseconds(10);
        digitalWrite(trigPin, LOW);

        // Reads the echoPin, returns the sound wave travel time in microseconds
        duration = pulseIn(echoPin, HIGH);

        // Calculate the distance
        int _distanciaCm = duration * SOUND_SPEED / 2;

        if (_distanciaCm > 0)
            distanceCm = _distanciaCm;

        if (distanceCm > DISTANCIA_LIMITE)
            distanceCm = DISTANCIA_LIMITE;

        // Convert to inches
        distanceInch = distanceCm * CM_TO_INCH;

        // Prints the distance in the Serial Monitor
        // Serial.print("Distance (cm): ");
        // Serial.println(distanceCm);
        // Serial.print("Distance (inch): ");
        // Serial.println(distanceInch);

        if (altura_del_tanque < 2)
            altura_del_tanque = 2;

        porcentajedist = map(distanceCm, altura_del_tanque, 1, 0, 100);

        if (porcentajedist > 100)
            porcentajedist = 100;

        if (porcentajedist < 0)
            porcentajedist = 0;

        // Serial.println(porcentajedist);

        time_sensor = millis();
    }
}