import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Services } from 'src/app/app.service';
import { PrimaryWhite, SecondaryGrey } from 'src/app/Constantes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dataSource: any;
  mostrarTable: boolean = false;
  loading: boolean = false;
  primaryColour = PrimaryWhite;
  secondaryColour = SecondaryGrey;
  constructor(private services: Services) {}

  ngOnInit(): void {}
  async consultar() {
    console.log('consultando vuelos');
    this.mostrarTable = false;
    this.loading = true;
    const consulta$ = this.services.getVuelos();
    await firstValueFrom(consulta$)
      .then((data) => {
        console.log('data', data);
        this.loading = false;
        this.dataSource = data;
        this.mostrarTable = true;
      })
      .catch((err) => {
        console.error('error', err);
        this.loading = false;
      });
  }
}
