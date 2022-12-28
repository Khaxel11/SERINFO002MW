import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
import { UserJwt } from '../models/common/userJwt';
//import { environment } from 'src/environments/envir';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment'

const URL_USUARIOERP = environment.SERTRAFAPI001;
@Injectable({
  providedIn: 'root'
})
export class MarcadoService {
    
  constructor(public http: HttpClient) { }

  
//   getMarcado(par: any): any {
//     const url = URL_USUARIOERP + 'Directorio/getMarcado';
//       const params = new HttpParams()
//         .append('Ubicacion', par.nousuario)
//         // .append('Nombre', par.nombre)
//         // .append('Departamento', par.departamento)
//         // .append('Lugar', par.lugar)
//         // .append('Extension', par.extension)
        
//     return this.http.get(url, { params });
// }
}
