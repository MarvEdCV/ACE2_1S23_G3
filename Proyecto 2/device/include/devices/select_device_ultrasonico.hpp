

#define SOUND_SPEED 0.034
#define CM_TO_INCH 0.393701

#include "deviceSonico.hpp"

void begin_devices_sonar()
{

    pinMode(trigPin, OUTPUT); 
    pinMode(echoPin, INPUT);
}
