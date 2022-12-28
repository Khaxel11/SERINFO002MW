import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
import { UserJwt } from '../models/common/userJwt';
//import { environment } from 'src/environments/envir';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { DirectorioModel } from '../models/DirectorioModel'

const URL_USUARIOERP = environment.SERINFOAPI002;
@Injectable({
  providedIn: 'root'
})
export class DirectorioService {
    
  constructor(public http: HttpClient) { }

  //API obtiene usuarios de directorio
  getUsuarios(par: any): any {
    const url = URL_USUARIOERP + 'Directorio/getUsers';
      const params = new HttpParams()
        .append('NoEmpleado', par.nousuario)
        .append('Nombre', par.nombre)
        .append('Departamento', par.departamento)
        .append('Lugar', par.lugar)
        .append('Extension', par.extension)
        
    return this.http.get(url, { params });
  }
  //Funcion eliminada para obtención de datos de guia de marcado
  getMarcado(par: string): any {
    const url = URL_USUARIOERP + 'Directorio/getMarcado';
      const params = new HttpParams()
        .append('Ubicacion', par)

    return this.http.get(url, { params });
  }
  //Funcion para obtener listado de ubicaciones
  getUbicacion(): any {
    const url = URL_USUARIOERP + 'Directorio/getUbicacion';
    return this.http.get(url);
  }
  //Obtener registro de usuario y credenciales
  getLogUser(clave : string){
    const url = URL_USUARIOERP + 'Directorio/getUserLog';
    const params = new HttpParams()
    .append('NoEmpleado', clave)
    return this.http.get(url, {params})
  }
  //Obtener registro de usuario conectado
  getUserData(clave : string){
    const url = URL_USUARIOERP + 'Directorio/getUserData';
    const params = new HttpParams()
    .append('NoEmpleado', clave)
    return this.http.get(url, {params})
  }
  //insertar, eliminar datos del directorio 
  insertData(directorio : DirectorioModel, opcion : any) {
    const url = URL_USUARIOERP + 'Directorio/insertUsuario';
    const params = new HttpParams()
    .append('Opcion', opcion)
    return this.http.post(url, directorio, {params});
  }
  //dar de baja en el directorio
  deleteData(directorio : DirectorioModel, opcion : any) {
    const url = URL_USUARIOERP + 'Directorio/insertUsuario';
    const params = new HttpParams()
    .append('Opcion', opcion)
    return this.http.post(url, directorio, {params});
  }
  //obtener mis datos de usuario
  getMyUserData(clave : string){
    const url = URL_USUARIOERP + 'Directorio/getMyUserData';
    const params = new HttpParams()
    .append('NoEmpleado', clave)
    return this.http.get(url, {params})
  }
  //saber si es administrador para controlar permisos
  isAdmin(clave : string){
    const url = URL_USUARIOERP + 'Directorio/isAdmin';
    const params = new HttpParams()
    .append('NoEmpleado', clave)
    return this.http.get(url, {params})
  }
  
}
