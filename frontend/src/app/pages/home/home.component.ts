/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Component, OnInit } from '@angular/core';
import { SimulatePdaService } from '../../core/services/pda.service';
import { RequestPDA } from '../../core/models/pda/pda-base';
import {ipcRenderer} from 'electron';

declare const window: any;
declare const require: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {


  cadena = '';
  resultadoSimulacion = '';
  requestPDA?: RequestPDA;


  constructor(private simulatePdaService: SimulatePdaService) { }

  ngOnInit(): void {
    console.log('Author: Luis Medina');
  }

  onSimulate(): void {
    this.simulatePdaService.simulatePDA(this.cadena).then(response => {
      if (response && typeof response === 'object' && 'cadena_aceptada' in response) {
        this.requestPDA = new RequestPDA(
          response.cadena_aceptada,
          response.caracteres_ilegales || [],
          response.resultados || []
        );
        this.formatResponse(this.requestPDA.resultados);
      }
    }).catch(error => {
      console.error('Error al simular PDA:', error);
      this.resultadoSimulacion = 'Error al realizar la simulación';
    });
  }

  private formatResponse(resultados: any[]): void {
    let formattedResult = '';

    for (const resultado of resultados) {
      formattedResult += `Estado: ${resultado.estado}\n`;
      formattedResult += `Pila: ${resultado.pila}\n`;
      formattedResult += `Por Leer: ${resultado.por_leer}\n\n`;
    }

    this.resultadoSimulacion = formattedResult;
  }

  closeWindow() {
    ipcRenderer.send('close-window');
  }
}
