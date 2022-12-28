import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
const URL_USUARIOERP = environment.ADMCXPAAPI001;
@Injectable({
  providedIn: 'root'
})
export class CuentasxPagarService {
    constructor(public http: HttpClient) { }

    getUsuarios(): any {
        const url = URL_USUARIOERP + 'CuentasXPagar/GetUsuarios';
        return this.http.get(url);
    }
    getDiasCredito(): any {
      const url = URL_USUARIOERP + 'CuentasXPagar/GetDiasCredito';
      return this.http.get(url);
  }
    getTiposCxp(): any {
        const url = URL_USUARIOERP + 'CuentasXPagar/GetTiposCxp';
        return this.http.get(url);
    }

    listarCuentas(par: any,fil: any): any {
      const url = URL_USUARIOERP + 'CuentasXPagar/GetCuentas';
      const params = new HttpParams()
        .append('startRow', par.startRow)
        .append('endRow', par.endRow)
        .append('idProveedor', fil.idProveedor)
        .append('Folio', fil.folio)
        .append('fechaInicio', fil.fechaInicio)
        .append('fechaFin', fil.fechaFin)
      return this.http.get(url, { params });
    }

    listarFacturas(par: any): any {
        const url = URL_USUARIOERP + 'CuentasXPagar/GetFacturas';
        const params = new HttpParams()
          .append('startRow', par.startRow)
          .append('endRow', par.endRow)
          .append('uuid', par.uuid)
          .append('fechaInicio', par.fechaInicio)
          .append('fechaFin', par.fechaFin)
          .append('idProveedor', par.idProveedor)
        return this.http.get(url, { params });
      }

      guardarProvision(objEntity): any {
        const url = URL_USUARIOERP+ 'CuentasXPagar/GuardarCxp';

        return this.http.post(url,objEntity);
      }

      editarCxp(objEntity): any {
        const url = URL_USUARIOERP+ 'CuentasXPagar/EditarCxp';

        return this.http.post(url,objEntity);
      }
      eliminarCxp(folio:string): any {
        const url = URL_USUARIOERP+ 'CuentasXPagar/EliminarCxp';
        const params = new HttpParams()
      .append('folio', folio);
        return this.http.get(url,{params});
      }

      obtenerTipoCambio(fecha): any {
        const url = URL_USUARIOERP + 'CuentasXPagar/GetTipoCambio';
        const params = new HttpParams()
          .append('fecha', fecha)
        return this.http.get(url, { params });
      }

      async getCuenta201(moneda,codigo): Promise<any> {
        const url = URL_USUARIOERP + 'CuentasXPagar/GetCuenta201';
        const params = new HttpParams()
          .append('folio', moneda)
          .append('Codigo', codigo)
        return await this.http.get(url, { params }).toPromise();
      }

      async getProveedorPortal(folio,idProveedor,uuid): Promise<any> {
        const url = URL_USUARIOERP + 'CuentasXPagar/GetProveedorPortal';
        const params = new HttpParams()
          .append('folio', folio)
          .append('idProveedor', idProveedor)
          .append('uuid', uuid)
        return await this.http.get(url, { params }).toPromise();
      }

      async getFacturaPortal(idFactura,idProveedor,uuid): Promise<any> {
        const url = URL_USUARIOERP + 'CuentasXPagar/GetFacturaPortal';
        const params = new HttpParams()
          .append('IdFactura', idFactura)
          .append('idProveedor', idProveedor)
          .append('uuid', uuid)
        return await this.http.get(url, { params }).toPromise();
      }

      getOc(par: any): any {
        const url = URL_USUARIOERP + 'CuentasXPagar/GetOC';
        const params = new HttpParams()
          .append('folio', par.folio)
        return this.http.get(url, { params });
      }

      async consultarSaldoOc(par: any):Promise<any> {
        const url = URL_USUARIOERP + 'CuentasXPagar/ConsultarSaldoOC';
        const params = new HttpParams()
          .append('folio', par.folio)
          .append('idProveedor', par.idProveedor)
        return this.http.get(url, { params }).toPromise();
      }

      listarRepetitivos(repetitivo: string): any {
        const url = URL_USUARIOERP + 'CuentasXPagar/ConsultarRepetitivo';
        const params = new HttpParams()
        .append('repetitivo', repetitivo)
        return this.http.get(url,{ params });
      }

      consultarEntradas(fil: any): any {
        const url = URL_USUARIOERP + 'CuentasXPagar/ConsultarEntradas';
        const params = new HttpParams()
        .append('idProveedor', fil.idProveedor)
        .append('folio', fil.folio)
        .append('de', fil.de)
        .append('hasta', fil.hasta)
        .append('startRow', fil.startRow)
        .append('endRow', fil.endRow)
        return this.http.get(url,{ params });
      }
      listarProvisiones(fil: any): any {
        const url = URL_USUARIOERP + 'CuentasXPagar/ListarProvisiones';
        const params = new HttpParams()
        .append('idProveedor', fil.idProveedor)
        .append('startRow', fil.startRow)
        .append('endRow', fil.endRow)
        return this.http.get(url,{ params });
      }
}
