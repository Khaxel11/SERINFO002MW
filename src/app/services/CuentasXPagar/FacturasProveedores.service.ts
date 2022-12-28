import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


const URL = environment.ADMCXPAAPI001 + 'FacturasProveedores/';

@Injectable({
  providedIn: 'root',
})
export class FacturasProveedoresService {
  constructor(public http: HttpClient) {}


//   GetFacturasProveedores(): any {
//     const url = URL + 'getFacturasProveedores';
//     return this.http.get(url);
//   }

  // uso post para pasarle el modelo.
  // ListarFacturasProveedores(Datos: any): any {
  //   const url = URL + 'ListarFacturasProveedores';
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //   };
  //   return this.http.post(url, Datos, httpOptions);
  // }
  
  

  
  
  
  

  ListarFacturasProveedores(/*par: any, */FiltrosFactura: any): any {
    const url = URL + 'ListarFacturasProveedores';
    const params = new HttpParams()
      // .append('startRow', par.startRow)
      // .append('endRow', par.endRow)
      .append('FechaIni', FiltrosFactura.FechaIni)
      .append('FechaFin', FiltrosFactura.FechaFin)
      .append('Serie', FiltrosFactura.Serie)
      .append('Folio', FiltrosFactura.Folio)
      .append('Factura', FiltrosFactura.Factura)
      .append('UUID', FiltrosFactura.UUID)
      .append('RazonSocial', FiltrosFactura.RazonSocial)
      .append('IdMoneda', FiltrosFactura.IdMoneda)
    return this.http.get(url, { params });
  }

  BuscarProveedores(filtroProvSelect: any): any {
    const url = URL + 'BuscarProveedores';
    const params = new HttpParams()
      .append('codigo', filtroProvSelect.codigo)
      .append('descripcion', filtroProvSelect.descripcion)
    return this.http.get(url, { params });
  }

  // Cargo combo de monedas
  GetListadoMonedas(): any {
    const url = URL + 'GetListadoMonedas';
    return this.http.get(url);
  }

   // Cargo combo de monedas
   GetPorcentajesIva(): any {
    const url = URL + 'GetPorcentajesIva';
    return this.http.get(url);
  }

  // Verifica si UUID existe
  BuscaUUID(UUID: string): any {
    const url = URL + 'BuscaUUID';
    const params = new HttpParams()
    .append('UUID', UUID)
    return this.http.get(url, { params });
  }

  GetTipoCambio(Fecha: string): any {
    const url = URL + 'GetTipoCambio';
    const params = new HttpParams()
    .append('pFecha', Fecha)
    return this.http.get(url, { params });
  }

  GetSiguienteId(): any {
    const url = URL + 'GetSiguienteId';
    return this.http.get(url);
  }

  
  GuardarFacturasProveedores(Datos: any): any {
    const url = URL + 'GuardarFacturasProveedores';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, Datos, httpOptions);
  }

  EliminarFacturasProveedores(id: string): any {
    const url = URL + 'EliminarFacturasProveedores';
    const params = new HttpParams().append('id', id);
    return this.http.get(url, {params} );
  }

}