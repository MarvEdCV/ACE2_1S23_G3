package com.example.ace2proyecto2.dtos

import com.google.gson.annotations.SerializedName

class Sensores {
    @SerializedName("device") var device: String? = null
    @SerializedName("name") var name: String? = null
    @SerializedName("TEmp_interior") var tempInterior: String? = null
    @SerializedName("Temp_exterior") var tempExterior: String? = null
    @SerializedName("Humedad") var humedad: Int? = null
    @SerializedName("Tanque") var tanque: Int? = null
    @SerializedName("Bomba_status") var bombaStatus: Int? = null
    @SerializedName("Alerta_status") var alertaStatus: Int? = null
}