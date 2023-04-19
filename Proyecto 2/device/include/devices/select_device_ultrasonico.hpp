// const int trigPin = 4;
// const int echoPin = 15;

// define sound speed in cm/uS
#define SOUND_SPEED 0.034
#define CM_TO_INCH 0.393701

long duration;
float distanceCm;
float distanceInch;

long time_sensor;

#include "deviceSonico.hpp"

void begin_devices_sonar()
{

    pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
    pinMode(echoPin, INPUT);  // Sets the echoPin as an Input
}
