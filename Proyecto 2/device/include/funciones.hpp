// -------------------------------------------------------------------
// Genera un log en el puerto Serial
// -------------------------------------------------------------------
void log(String s)
{
    if (debugger_serial == true)
        Serial.println(s);
}

float tiempo_alerta_min(float time)
{
    float result;
    result = ((time * 60) * 1000);

    return result;
}

float tiempo_alerta_sec(float time)
{
    float result;
    result = time * 1000;

    return result;
}
// -------------------------------------------------------------------
// Convierte un char a IP
// -------------------------------------------------------------------
uint8_t ip[4]; // Variable función convertir string a IP
IPAddress CharToIP(const char *str)
{
    sscanf(str, "%hhu.%hhu.%hhu.%hhu", &ip[0], &ip[1], &ip[2], &ip[3]);
    return IPAddress(ip[0], ip[1], ip[2], ip[3]);
}
// -------------------------------------------------------------------
// Retorna IPAddress en formato "n.n.n.n" de IP a String
// -------------------------------------------------------------------
String ipStr(const IPAddress &ip)
{
    String sFn = "";
    for (byte bFn = 0; bFn < 3; bFn++)
    {
        sFn += String((ip >> (8 * bFn)) & 0xFF) + ".";
    }
    sFn += String(((ip >> 8 * 3)) & 0xFF);
    return sFn;
}
// -------------------------------------------------------------------
// Definir la Plataforma
// -------------------------------------------------------------------
String platform()
{
    // Optiene la plataforma de hardware

    return "ARQUI2_";
}
// -------------------------------------------------------------------
// De HEX a String
// -------------------------------------------------------------------
String hexStr(const unsigned long &h, const byte &l = 8)
{
    String s;
    s = String(h, HEX);
    s.toUpperCase();
    s = ("00000000" + s).substring(s.length() + 8 - l);
    return s;
}
// -------------------------------------------------------------------
// Crear un ID unico desde la direccion MAC
// -------------------------------------------------------------------
String idUnique()
{
    // Retorna los ultimos 4 Bytes del MAC rotados
    char idunique[15];
    uint64_t chipid = ESP.getEfuseMac();
    uint16_t chip = (uint16_t)(chipid >> 32);
    snprintf(idunique, 15, "%04X", chip);
    return idunique;
}

String split(String data, char separator, int index)
{
    int found = 0;
    int strIndex[] = {0, -1};
    int maxIndex = data.length() - 1;

    for (int i = 0; i <= maxIndex && found <= index; i++)
    {
        if (data.charAt(i) == separator || i == maxIndex)
        {
            found++;
            strIndex[0] = strIndex[1] + 1;
            strIndex[1] = (i == maxIndex) ? i + 1 : i;
        }
    }

    return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}

String getMacAddress() {
    uint8_t baseMac[6];
    // Get MAC address for WiFi station
    esp_read_mac(baseMac, ESP_MAC_WIFI_STA);
    char baseMacChr[18] = {0};
    sprintf(baseMacChr, "%02X:%02X:%02X:%02X:%02X:%02X", baseMac[0], baseMac[1], baseMac[2], baseMac[3], baseMac[4], baseMac[5]);
    return String(baseMacChr);
}
// -------------------------------------------------------------------
// Número de serie del Dispositivo único
// -------------------------------------------------------------------
String deviceID()
{
    return String(platform()) + hexStr(ESP.getEfuseMac()) + String(idUnique());
}