import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import dayjs from 'dayjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { Services } from 'src/app/app.service';
import { Aeropuerto, ICrearVuelo } from 'src/app/res.interface';

@Component({
  selector: 'app-create-vuelo',
  templateUrl: './create-vuelo.component.html',
  styleUrls: ['./create-vuelo.component.scss'],
})
export class CreateVueloComponent implements OnInit {
  formConsulta!: FormGroup;
  loading: boolean = false;
  displayedColumns: string[] = [
    'idVuelo',
    'numeroPasaporte',
    'aeropuertoEntrada',
    'aeropuertoSalida',
    'fechaHoraEntrada',
    'fechaHoraSalida',
  ];
  AeropuertosEntrada: Aeropuerto[] = [
    {
      name: 'Aeropuerto Internacional Hamad',
    },
    {
      name: 'Aeropuerto internacional de Tokio Haneda',
    },
    {
      name: 'Aeropuerto Changi de Singapur',
    },
    {
      name: 'Aeropuerto de Tokio Narita',
    },
    {
      name: 'Aeropuerto Internacional de Incheon',
    },
  ];
  AeropuertosSalida: Aeropuerto[] = [
    {
      name: 'Aeropuerto de Cobán',
    },
    {
      name: 'Aeropuerto de Puerto San José',
    },
    {
      name: 'Aeropuerto Internacional La Aurora',
    },
    {
      name: 'Aeropuerto de Puerto Barrios',
    },
    {
      name: 'Aeropuerto Internacional Mundo Maya',
    },
  ];
  dataSource: any;
  mostrarTable: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private services: Services,
    private messageService: MessageService
  ) {
    this.formConsulta = this.formBuilder.group({
      pasaporte: [null, { validators: [Validators.required] }],
      aentrada: [null, { validators: [Validators.required] }],
      asalida: [null, { validators: [Validators.required] }],
      fechaEntrada: [null, { validators: [Validators.required] }],
      fechaSalida: [null, { validators: [Validators.required] }],
    });
  }

  ngOnInit(): void {}
  get pasaporteControl() {
    return this.formConsulta.get('pasaporte')!;
  }
  get aEntradaControl() {
    return this.formConsulta.get('aentrada')!;
  }
  get aSalidaControl() {
    return this.formConsulta.get('asalida')!;
  }
  get fechaEntradaControl() {
    return this.formConsulta.get('fechaEntrada')!;
  }
  get fechaSalidaControl() {
    return this.formConsulta.get('fechaSalida')!;
  }
  async validateForm() {
    const pasaporte = this.transformUpperCase(this.pasaporteControl.value);
    const aEntrada = this.transformUpperCase(this.aEntradaControl.value);
    const aSalida = this.transformUpperCase(this.aSalidaControl.value);
    const fechaEntrada = this.fechaEntradaControl.value;
    const fechaSalida = this.fechaSalidaControl.value;
    console.log('pasaporte', pasaporte);
    console.log('aEntrada', aEntrada);
    console.log('aSalida', aSalida);
    console.log('fechaEntrada', fechaEntrada);
    console.log('fechaSalida', fechaSalida);
    const data: ICrearVuelo = {
      numeroPasaporte: pasaporte,
      aeropuertoEntrada: aEntrada,
      aeropuertoSalida: aSalida,
      fechaHoraEntrada: fechaEntrada,
      fechaHoraSalida: fechaSalida,
    };
    const newVuelo$ = this.services.postVuelo(data);
    await firstValueFrom(newVuelo$)
      .then(async (data) => {
        if (data) {
          await this.obtenerVuelos(data.idVuelo);
          this.showSuccess();
        }
      })
      .catch((err) => {
        console.error('error', err);
      });
  }

  async obtenerVuelos(idVuelo: string) {
    let dataArray: any[] = [];
    const allVuelos$ = this.services.getVuelosById(idVuelo);
    await firstValueFrom(allVuelos$)
      .then((res) => {
        dataArray.push(res);
        this.dataSource = dataArray;
        this.mostrarTable = true;
        this.formConsulta.reset();
      })
      .catch((error) => {
        console.error('error', error);
      });
  }

  transformUpperCase(cadena: string) {
    if (!cadena || typeof cadena !== 'string') return cadena;
    return cadena.toUpperCase();
  }
  transformLowerCase(cadena: string) {
    if (!cadena) return cadena;
    return cadena.toLowerCase();
  }
  transformDate(date: Date) {
    return dayjs(date).format('YYYY-MM-DD LTS');
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Vuelo Creado Exitosamente',
    });
  }
}
