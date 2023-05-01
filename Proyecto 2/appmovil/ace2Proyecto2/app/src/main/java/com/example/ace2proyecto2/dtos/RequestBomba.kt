package com.example.ace2proyecto2.dtos

import com.google.gson.annotations.SerializedName

class RequestBomba {
    @SerializedName("status_bomba") var statusBomba: Int? = null
    @SerializedName("tiempo_activa_bomba") var tiempoActivaBomba: Long? = null
}