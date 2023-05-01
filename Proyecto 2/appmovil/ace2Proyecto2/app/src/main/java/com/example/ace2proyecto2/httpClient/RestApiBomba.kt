package com.example.ace2proyecto2.httpClient

import com.example.ace2proyecto2.dtos.RequestBomba
import com.example.ace2proyecto2.dtos.ResponseBomba
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Headers
import retrofit2.http.POST

interface RestApiBomba {

    @Headers("Content-Type: application/json")
    @POST("bombaon")
    fun bombaOn(@Body requestBomba: RequestBomba): Call<ResponseBomba>

    @Headers("Content-Type: application/json")
    @POST("bombaoff")
    fun bombaOff(@Body requestBomba: RequestBomba): Call<ResponseBomba>

}