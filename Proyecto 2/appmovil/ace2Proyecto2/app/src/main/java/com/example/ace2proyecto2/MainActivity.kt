package com.example.ace2proyecto2

import android.annotation.SuppressLint
import com.google.gson.Gson
import android.content.ContentValues.TAG
import android.graphics.Color
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.example.ace2proyecto2.dtos.RequestBomba
import com.example.ace2proyecto2.dtos.Sensores
import com.example.ace2proyecto2.httpClient.RestApiBombaService
import kotlinx.coroutines.launch
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken
import org.eclipse.paho.client.mqttv3.MqttCallback
import org.eclipse.paho.client.mqttv3.MqttClient
import org.eclipse.paho.client.mqttv3.MqttConnectOptions
import org.eclipse.paho.client.mqttv3.MqttException
import org.eclipse.paho.client.mqttv3.MqttMessage
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence
import java.math.BigDecimal


class MainActivity : AppCompatActivity() {

    private var client: MqttClient? = null
    private val BROKER_URL = "tcp://54.183.38.85:1883"
    private val CLIENT_ID = "device@app_movil"
    private val USER_NAME = "device"
    private val PASSWORD = "public"
    private val TOPIC_SENSORES_ALL = "device/sensores/all"
    private val TOPIC_STATUS = "device/status"

    private var sensores: Sensores = Sensores()
    private var isEncendido: Int = 0

    private val apiService = RestApiBombaService()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        connect(BROKER_URL, CLIENT_ID, USER_NAME, PASSWORD)

        val btnEncender = findViewById<Button>(R.id.btnEncender)
        val btnEnviar = findViewById<Button>(R.id.btnEnviar)
        btnEncender.setOnClickListener {
            if(isEncendido == 0 || isEncendido == 1) {
                bombaOn()
            } else if(isEncendido == 2){
                bombaOff()
            }
        }

        btnEnviar.setOnClickListener {
            if(isEncendido == 2) {
                bombaOn()
            }
        }
    }

    override fun onStart() {
        super.onStart()
        this.default()
        this.subscribe(TOPIC_STATUS)
        this.subscribe(TOPIC_SENSORES_ALL)
        this.getMessages()
    }

    override fun onDestroy() {
        super.onDestroy()
        this.disconnect()
    }

    private fun default() {
        this.setHumedad("0")
        this.setTemperatura("0")
        val eText = findViewById<EditText>(R.id.etextnum1)
        eText.setText("5.00")
    }

    private fun cambiarColorBtn(valor: Int?) {
        if (isEncendido != valor!! + 1) {
            val btnEncender = findViewById<TextView>(R.id.btnEncender)
            if (valor + 1 == 1) {
                btnEncender.setBackgroundColor(Color.parseColor("#1A491C"))
                btnEncender.setText(R.string.encender)
            } else {
                btnEncender.setBackgroundColor(Color.RED)
                btnEncender.setText(R.string.apagar)
            }
            isEncendido = valor + 1
        }
    }

    private fun setTemperatura(data: String) {
        val text2 = findViewById<TextView>(R.id.txtView2)
        text2.text = getString(R.string.desc_temperatura) + " " + data + " °C"
    }

    private fun setHumedad(data: String) {
        val text1 = findViewById<TextView>(R.id.txtView1)
        text1.text = getString(R.string.desc_humedad) + " " + data + " %"
    }

    //mqtt methods
    private fun connect(brokerUrl: String?, clientId: String?, user: String?, password: String?) {
        try {
            // Set up the persistence layer
            val persistence = MemoryPersistence()

            // Initialize the MQTT client
            client = MqttClient(brokerUrl, clientId, persistence)

            // Set up the connection options
            val connectOptions = MqttConnectOptions()
            connectOptions.isCleanSession = true
            connectOptions.password = password?.toCharArray()
            connectOptions.userName = user

            // Connect to the broker
            client!!.connect(connectOptions)
        } catch (e: MqttException) {
            e.printStackTrace()
        }
    }

    private fun disconnect() {
        try {
            client!!.disconnect()
        } catch (e: MqttException) {
            e.printStackTrace()
        }
    }

    private fun subscribe(topic: String?) {
        try {
            client!!.subscribe(topic)
        } catch (e: MqttException) {
            e.printStackTrace()
        }
    }

    private fun getMessages() {
        client!!.setCallback(object : MqttCallback {
            override fun connectionLost(cause: Throwable?) {
                Log.d(TAG, "connection lost")
            }

            @SuppressLint("ShowToast")
            override fun messageArrived(topic: String?, message: MqttMessage?) {
                //Log.d(TAG, message.toString())
                if (TOPIC_SENSORES_ALL == topic) {
                    sensores = Gson().fromJson(message.toString(), Sensores::class.java)
                    lifecycleScope.launch {
                        setTemperatura(sensores.tempInterior.toString())
                        setHumedad(sensores.humedad.toString())
                        cambiarColorBtn(sensores.bombaStatus )

                        if (sensores.alertaStatus == 1) {
                            Toast.makeText(this@MainActivity, "Apagar flujo de Agua, Humedad al 80% de cpacidad", Toast.LENGTH_LONG).show()
                        }
                    }
                }
            }

            override fun deliveryComplete(token: IMqttDeliveryToken?) {
                Log.d(TAG, "delivery complete")
            }
        })
    }

    private fun bombaOn() {
        val requestBomba = RequestBomba()
        requestBomba.statusBomba = 1
        requestBomba.tiempoActivaBomba = obtenerTiempoEncendido()

        apiService.bombaOn(requestBomba) {
            if (it.status == null || it.status != "Success") {
                Toast.makeText(this@MainActivity, "Error al encender la Bomba", Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun bombaOff() {
        val requestBomba = RequestBomba()
        requestBomba.statusBomba = 0

        apiService.bombaOff(requestBomba) {
            if (it.status == null || it.status!="Success") {
                Toast.makeText(this@MainActivity, "Error al apagar la Bomba", Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun obtenerTiempoEncendido(): Long {
        val textView = findViewById<TextView>(R.id.etextnum1)
        val valor = textView.text.toString()

        return BigDecimal(valor).multiply(BigDecimal(60000)).longValueExact()
    }

}