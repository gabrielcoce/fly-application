import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Services } from 'src/app/app.service';
import { firstValueFrom } from 'rxjs';
import { PrimaryWhite, SecondaryGrey } from 'src/app/Constantes';

@Component({
  selector: 'app-delete-vuelo',
  templateUrl: './delete-vuelo.component.html',
  styleUrls: ['./delete-vuelo.component.scss'],
})
export class DeleteVueloComponent implements OnInit {
  formConsulta!: FormGroup;
  loading: boolean = false;
  primaryColour = PrimaryWhite;
  secondaryColour = SecondaryGrey;
  constructor(
    private formBuilder: FormBuilder,
    private services: Services,
    private messageService: MessageService
  ) {
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
    const newVuelo$ = this.services.deleteVuelo(idVuelo);
    await firstValueFrom(newVuelo$)
      .then(async (data) => {
        if (!data) {
          console.log('consulta vacia');
          this.idVueloControl.setErrors({
            consultaVacia: true,
          });
          return;
        }
        this.showSuccess();
      })
      .catch((err) => {
        console.error('error', err);
      });
  }
  transformLowerCase(cadena: string) {
    if (!cadena || typeof cadena !== 'string') return cadena;
    return cadena.toLowerCase();
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Vuelo Editado Exitosamente',
    });
  }
}
