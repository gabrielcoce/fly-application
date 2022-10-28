import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Services } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dataSource: any;
  mostrarTable: boolean = false;
  constructor(private services: Services) {}

  ngOnInit(): void {}
  async consultar() {
    console.log('consultando vuelos');
    const consulta$ = this.services.getVuelos();
    await firstValueFrom(consulta$)
      .then((data) => {
        console.log('data', data);
        this.dataSource = data;
        this.mostrarTable = true;
      })
      .catch((err) => {
        console.error('error', err);
      });
  }
}
