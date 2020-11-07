import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  resumen: any;

  constructor() { this.resumen = {} }

  clasificaDatos(datos: Array<Array<string>>) {
    for (const elemento of datos) {
      const tipoPrueba = elemento[1].trim();
      const timestamp = new Date(Number(elemento[2].trim()));
      const tiempoTerminado = new Date(timestamp.getTime() + Number(elemento[3].trim()));
      const status = Number(elemento[5].trim());
      const urlVisitada = elemento[7].trim();
      const ip = elemento[8].trim();
      const wlan = elemento[9].trim();
      const ubicacion = elemento[12].trim();
      let obj = {};
      obj[elemento[0]] = { tipoPrueba, timestamp, tiempoTerminado, status, urlVisitada };
      this.resumen[ubicacion] = this.resumen[ubicacion] == undefined ? {} : this.resumen[ubicacion];
      this.resumen[ubicacion][wlan] = this.resumen[ubicacion][wlan] == undefined ? {} : this.resumen[ubicacion][wlan];
      this.resumen[ubicacion][wlan][ip] =
        this.resumen[ubicacion][wlan][ip] == undefined ? [obj] : this.resumen[ubicacion][wlan][ip].concat(obj);

      if (this.resumen[ubicacion]['pruebas'] == undefined)
        this.resumen[ubicacion]['pruebas'] = { correctas: 0, error: 0 };
      if (this.resumen[ubicacion]['tipoFallo'] == undefined)
        this.resumen[ubicacion]['tipoFallo'] = {};
      if (status) this.resumen[ubicacion].pruebas.correctas += 1;
      else {
        this.resumen[ubicacion].pruebas.error += 1
        this.resumen[ubicacion].tipoFallo[tipoPrueba] =
          this.resumen[ubicacion].tipoFallo[tipoPrueba] == undefined ? 1 : this.resumen[ubicacion].tipoFallo[tipoPrueba]+1;
      };


    }
    return this.resumen;
  }

}
