import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
const URL_USUARIOERP = environment.ADMCXPAAPI001;
@Injectable({
  providedIn: 'root'
})
export class FacturasProveedorService {

  constructor(public http: HttpClient) { }

  listarProvision(par: any,fil: any): any {
    const url = URL_USUARIOERP + 'ProvisionFacturas/GetProvisiones';
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('filtro', fil.filtro)
      .append('fechaInicio', fil.fechaInicio)
      .append('fechaFin', fil.fechaFin)
    return this.http.get(url, { params });
  }

  listarFacturas(par: any): any {
    const url = URL_USUARIOERP + 'ProvisionFacturas/GetFacturas';
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('filtro', par.filtro)
      .append('fecha', par.fecha)
      .append('fechaInicio', par.fechaInicio)
      .append('fechaFin', par.fechaFin)
      .append('idProveedor', par.idProveedor)
    return this.http.get(url, { params });
  }

  guardarProvision(objEntity): any {
    const url = URL_USUARIOERP+ 'ProvisionFacturas/GuardarProvision';
    
    return this.http.post(url,objEntity);
  }

  getTipoMovimientos(): any {
    const url = URL_USUARIOERP + 'ProvisionFacturas/GetTipoMovimientos';
    return this.http.get(url);
  }

  eliminarProvision(id:string): any {
    const url = URL_USUARIOERP+ 'ProvisionFacturas/CancelarProvision';
    const params = new HttpParams()
      .append('IdProvision', id);

    return this.http.get(url,{params});
  }
}
