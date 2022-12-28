import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
const URL_USUARIOERP = environment.ADMCXPAAPI001;
@Injectable({
  providedIn: 'root'
})
export class TipoMovimientoService {

  constructor(public http: HttpClient) { }

  listarTipoMovimientos(par: any,fil: any): any {
    const url = URL_USUARIOERP + 'TipoMovimiento/getTipoMovimientos';
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('filtro', fil.filtro)
    return this.http.get(url, { params });
  }

  listarTipoMovimientosById(id: any): any {
    const url = URL_USUARIOERP + 'TipoMovimiento/getTipoMovimientosById';
    const params = new HttpParams()
      .append('id', id)
    return this.http.get(url, { params });
  }

  guardarTipoMovimiento(objEntity): any {
    const url = URL_USUARIOERP+ 'TipoMovimiento/GuardarTipoMovimiento';
    
    return this.http.post(url,objEntity);
  }

  editarTipoMovimiento(objEntity): any {
    const url = URL_USUARIOERP+ 'TipoMovimiento/EditarTipoMovimiento';
    
    return this.http.post(url,objEntity);
  }

  eliminarTipoMovimiento(id:string): any {
    const url = URL_USUARIOERP+ 'TipoMovimiento/EliminarTipoMovimiento';
    const params = new HttpParams()
      .append('Id', id);

    return this.http.get(url,{params});
  }
}
