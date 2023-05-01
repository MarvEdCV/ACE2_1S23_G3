package com.example.ace2proyecto2.httpClient

import com.example.ace2proyecto2.dtos.RequestBomba
import com.example.ace2proyecto2.dtos.ResponseBomba
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class RestApiBombaService {

    fun bombaOn(requestBomba: RequestBomba, onResult: (ResponseBomba) -> Unit) {
        val retrofit = ServiceBuilder.buildService(RestApiBomba::class.java)
        retrofit.bombaOn(requestBomba).enqueue(
            object : Callback<ResponseBomba> {
                override fun onFailure(call: Call<ResponseBomba>, t: Throwable) {
                    var responseBomba = ResponseBomba()
                    responseBomba.status = "Failure"
                    onResult(responseBomba)
                }
                override fun onResponse( call: Call<ResponseBomba>, response: Response<ResponseBomba>) {
                    val responseBomba = response.body()
                    if (responseBomba != null) {
                        onResult(responseBomba)
                    }
                }
            }
        )
    }

    fun bombaOff(requestBomba: RequestBomba, onResult: (ResponseBomba) -> Unit) {
        val retrofit = ServiceBuilder.buildService(RestApiBomba::class.java)
        retrofit.bombaOff(requestBomba).enqueue(
            object : Callback<ResponseBomba> {
                override fun onFailure(call: Call<ResponseBomba>, t: Throwable) {
                    var responseBomba = ResponseBomba()
                    responseBomba.status = "Failure"
                    onResult(responseBomba)
                }
                override fun onResponse( call: Call<ResponseBomba>, response: Response<ResponseBomba>) {
                    val responseBomba = response.body()
                    if (responseBomba != null) {
                        onResult(responseBomba)
                    }
                }
            }
        )
    }
}