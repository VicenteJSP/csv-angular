import { DatosService } from './datos.service';
import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  resumen: Array<object>;

  constructor(
    private ngxCsvParser: NgxCsvParser,
    private _datosService: DatosService
  ) { this.resumen = [] }

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;


    this.ngxCsvParser.parse(files[0], { header: false, delimiter: ',' })
      .pipe()
      .subscribe(
        (result: Array<any>) => this.general(this._datosService.clasificaDatos(result)),
        (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      );
  }

  general(resultado: any) {
    for (let elemento in resultado) {
      const { pruebas, tipoFallo: contadorFallo } = resultado[elemento];
      this.resumen.push({ sede: elemento, pruebas, contadorFallo });
    }
  }

}
