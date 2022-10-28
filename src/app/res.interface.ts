export interface IResponse {
  aeropuertoEntrada: string;
  aeropuertoSalida: string;
  fechaHoraEntrada: Date;
  fechaHoraSalida: Date;
  idVuelo: string;
  numeroPasaporte: string;
}
export interface Aeropuerto {
  name: string;
}

export interface ICrearVuelo {
  numeroPasaporte: string;
  aeropuertoEntrada: string;
  aeropuertoSalida: string;
  fechaHoraEntrada: Date;
  fechaHoraSalida: Date;
}

export interface IEditarVuelo {
  idVuelo: string;
  aeropuertoEntrada: string;
  aeropuertoSalida: string;
  fechaHoraEntrada: Date;
  fechaHoraSalida: Date;
}
