import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Services } from 'src/app/app.service';
import { firstValueFrom } from 'rxjs';
import { PrimaryWhite, SecondaryGrey } from 'src/app/Constantes';

@Component({
  selector: 'app-get-vuelo',
  templateUrl: './get-vuelo.component.html',
  styleUrls: ['./get-vuelo.component.scss'],
})
export class GetVueloComponent implements OnInit {
  formConsulta!: FormGroup;
  loading: boolean = false;
  primaryColour = PrimaryWhite;
  secondaryColour = SecondaryGrey;
  displayedColumns: string[] = [
    'idVuelo',
    'numeroPasaporte',
    'aeropuertoEntrada',
    'aeropuertoSalida',
    'fechaHoraEntrada',
    'fechaHoraSalida',
  ];
  dataSource: any[] = [];
  mostrarTable: boolean = false;
  constructor(private formBuilder: FormBuilder, private services: Services) {
    this.formConsulta = this.formBuilder.group({
      idVuelo: [
        null,
        {
          validators: [
            Validators.required,
            Validators.minLength(36),
            Validators.maxLength(36),
            Validators.pattern(
              '^([a-fA-f0-9]{8}-)([a-fA-F0-9]{4}-)([a-fA-F0-9]{4}-)([a-fA-F0-9]{4}-)([a-fA-F0-9]{12})$'
            ),
          ],
        },
      ],
    });
  }
  get idVueloControl() {
    return this.formConsulta.get('idVuelo')!;
  }
  ngOnInit(): void {}
  async validateForm() {
    if (!this.formConsulta.valid) return;
    const idVuelo = this.transformLowerCase(this.idVueloControl.value);
    console.log('consulta -->', idVuelo);
    let dataArray: any[] = [];
    const vuelo$ = this.services.getVuelosById(idVuelo);
    await firstValueFrom(vuelo$)
      .then((data) => {
        if (!data) {
          console.log('consulta vacia');
          this.mostrarTable = false;
          this.idVueloControl.setErrors({
            consultaVacia: true,
          });
          return;
        }
        dataArray.push(data);
        this.dataSource = dataArray;
        this.mostrarTable = true;
        this.formConsulta.reset();
      })
      .catch((error) => {
        console.error('error', error);
      });
  }
  onBlurConsulta() {
    this.mostrarTable = false;
  }

  transformLowerCase(cadena: string) {
    if (!cadena || typeof cadena !== 'string') return cadena;
    return cadena.toLowerCase();
  }
}
