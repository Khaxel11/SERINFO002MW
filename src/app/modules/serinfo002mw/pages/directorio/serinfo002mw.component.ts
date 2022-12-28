import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DirectorioService } from '../../../../services/serinfo002mw.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GridModel } from 'src/app/models/common/gridModel';
import {Directorio} from 'src/app/models/Directorio'
import swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DirectorioModel } from 'src/app/models/DirectorioModel';
import { Dir } from '@angular/cdk/bidi';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { reject, result } from 'lodash-es';
//import { DirectorioDataModel } from 'src/app/models/DirectorioDataModel'


@Component({
  selector: 'app-directorio',
  templateUrl: './serinfo002mw.component.html',
  styleUrls: ['./serinfo002mw.component.css']
})
export class DirectorioComponent implements OnInit {
  @ViewChild('gridDir') public gridDir: any;
  @ViewChild('gridGuia') public gridGuia: any;
  @ViewChild('grid') private grid: GridModel;
  @ViewChild('mdlAgregarModificar') public mdlAgregarModificar: any;
  private dataValue: Directorio;
  @Output() dataChange = new EventEmitter<Directorio>();
  @Input() get data(): Directorio {
    return this.dataValue;
  }
  set data(value: Directorio) {
    this.dataValue = value;
    this.dataChange.emit(this.dataValue);
  }
  @Output() selectedData = new EventEmitter<Directorio>();
 
  //Datos para filtrar los datos del directorio
  public filtrosBusqueda = {
    nousuario: "",
    nombre: "",
    departamento: "",
    lugar: "",
    extension: ""
  }

  //datos del usuario para registro de sesión
  public userData = {
    clave : "",
    nombre: "",
    passowrd : ""
  }

  //Columnas de guia de marcado
  columnDefs: any;
  //Columnas de directorio
  columnDir: any;
  //Lista de todos los usuarios
  usuarios = []
  //Lista de guia de marcado (ELIMINADO)
  guiaSelect = []
  //Lista de las ubicaciones
  lista = []
  //Control de opciones
  isLoged : boolean = false;
  hasPermition : boolean = false;
  opModalEnable = false;
  accionModal = 1;
  clickLogin = false;

  //Datos de acceso
  CECSOuser : string = "";
  CECSOpassword : string = "";
  CECSOusername : string = "";
  idUser : String | null;
  DirectorioModel : DirectorioModel;
  Direct : Directorio;
  MyUsuario : Directorio;
  TituloModal = "";
  BotonModal = "";


  constructor(public dire: DirectorioService, private serviceModal: NgbModal) {
    this.DirectorioModel = {
      SERINFODAT003_IdUsuario : 0,
      SERINFODAT003_Clave: 0,
      SERINFODAT003_NombreUsuario: "",
      SERINFODAT003_Extension: "",
      SERINFODAT003_Movil: "",
      SERINFODAT003_Casa: "",
      SERINFODAT003_Oficina: "",
      SERINFODAT003_Personalizado: "",
      SERINFODAT003_Correo : "",
      SERINFODAT003_Departamento : "",
      SERINFODAT003_IdLugar : 2,
      SERINFODAT003_Admin : false,
      SERINFODAT003_UsuarioInsert : "",
      SERINFODAT003_UsuarioBaja : "",
      SERINFODAT003_UsuarioModifico : "",
      SERINFODAT003_Estatus : true
    }
    //Inicia campos del grid para el directorio
      this.columnDir = [
        {
          headerName: 'Clave',
          field: 'clave',
          flex: 5,
          minWidth: 50,
          headerClass: 'header-center header-grid-left',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Nombre',
          field: 'nombre',
          flex: 14,
          minWidth: 140,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        }
        ,
        {
          headerName: 'Extension',
          field: 'extension',
          flex: 6,
          minWidth: 80,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Movil',
          field: 'movil',
          flex: 7,
          minWidth: 80,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Casa',
          field: 'casa',
          flex: 7,
          minWidth: 80,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Oficina',
          field: 'oficina',
          flex: 7,
          minWidth: 80,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Personalizado',
          field: 'personalizado',
          flex: 8,
          minWidth: 80,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Correo',
          field: 'correo',
          flex: 10,
          minWidth: 100,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Departamento',
          field: 'departamento',
          flex: 10,
          minWidth: 100,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Lugar',
          field: 'lugar',
          flex: 8,
          minWidth: 80,
          headerClass: 'header-center header-grid-right',
          cellClass: 'grid-cell-center',
        }
  
      ]
   
    
   
   }

  ngOnInit(): void {
    this.filtrosBusqueda.lugar = "0";
    this.listarUsuarios();
    this.listar();
    localStorage.removeItem('idUser');
    
  }

  //metodo para control de cadenas en clave | 1 = tiene una letra  | 0 = no tiene letra
  NaNString(texto : String){
    var letras="abcdefghyjklmnñopqrstuvwxyz";  
    texto = texto.toLowerCase();
    for(var i=0; i<texto.length; i++){
       if (letras.indexOf(texto.charAt(i),0)!=-1){
          return 1;
       }
    }
    return 0;
 }
 //Metodo para inicio de sesión del usuario
  logUser(){
    //Verifica que la clave no tenga espacios, que no tenga letras y que no sea menor a 6
    if(this.NaNString(this.CECSOuser) == 1 || this.CECSOuser.trim() == "" || this.CECSOuser.length < 6){
      swal.fire(
        'Clave Incorrecta',
        'La clave no puede estar vacia ni ser menor a 6 dígitos',
        'error'
      );
    }else{
      //Verifica que la contraseña sea correcta
      if(this.CECSOpassword.length == 0){
        swal.fire(
          'Error',
          'La contraseña es incorrecta',
          'error'
        );
      }else{
        //Metodo para llamar a API y obtener el registro de usuario
        this.dire.getLogUser(this.CECSOuser).subscribe(
          (data: any) => {
            if(data.data){
              this.userData = data.data[0];
              if(this.CECSOpassword == this.userData.passowrd){
                this.CECSOusername = this.userData.nombre;
                this.isLoged = true;
                sessionStorage.setItem('idUser', this.CECSOuser);
                this.idUser = sessionStorage.getItem('idUser');
                //Metodo a API para verificar si es administrador o no
                  this.dire.isAdmin(this.CECSOuser).subscribe(
                    (data : any) => {
                      //Si es adminitrador asigna opciones especiales en GRID como en botones
                      if(data.data[0] == true){
                        this.hasPermition = true;
                        this.columnDir = [
                          {
                            headerName: 'Clave',
                            field: 'clave',
                            flex: 5,
                            minWidth: 50,
                            headerClass: 'header-center header-grid-left',
                            cellClass: 'grid-cell-center',
                          },
                          {
                            headerName: 'Nombre',
                            field: 'nombre',
                            flex: 14,
                            minWidth: 140,
                            headerClass: 'header-center header-grid',
                            cellClass: 'grid-cell-center',
                          }
                          ,
                          {
                            headerName: 'Extension',
                            field: 'extension',
                            flex: 6,
                            minWidth: 80,
                            headerClass: 'header-center header-grid',
                            cellClass: 'grid-cell-center',
                          },
                          {
                            headerName: 'Movil',
                            field: 'movil',
                            flex: 7,
                            minWidth: 80,
                            headerClass: 'header-center header-grid',
                            cellClass: 'grid-cell-center',
                          },
                          {
                            headerName: 'Casa',
                            field: 'casa',
                            flex: 7,
                            minWidth: 80,
                            headerClass: 'header-center header-grid',
                            cellClass: 'grid-cell-center',
                          },
                          {
                            headerName: 'Oficina',
                            field: 'oficina',
                            flex: 7,
                            minWidth: 80,
                            headerClass: 'header-center header-grid',
                            cellClass: 'grid-cell-center',
                          },
                          {
                            headerName: 'Personalizado',
                            field: 'personalizado',
                            flex: 8,
                            minWidth: 80,
                            headerClass: 'header-center header-grid',
                            cellClass: 'grid-cell-center',
                          },
                          {
                            headerName: 'Correo',
                            field: 'correo',
                            flex: 10,
                            minWidth: 100,
                            headerClass: 'header-center header-grid',
                            cellClass: 'grid-cell-center',
                          },
                          {
                            headerName: 'Departamento',
                            field: 'departamento',
                            flex: 10,
                            minWidth: 100,
                            headerClass: 'header-center header-grid',
                            cellClass: 'grid-cell-center',
                          },
                          {
                            headerName: 'Lugar',
                            field: 'lugar',
                            flex: 8,
                            minWidth: 80,
                            headerClass: 'header-center header-grid',
                            cellClass: 'grid-cell-center',
                          },
                          {
                            headerName: 'Editar',
                            cellRenderer: 'btnCellRenderer',
                            cellRendererParams: {
                              onClick: this.loadEditar.bind(this),
                              label: '<i class="fa fa-edit"></i>',
                              class: 'btn btn-warning btn-sm',
                            },
                            headerClass: 'header-center header-grid',
                            cellClass: 'grid-cell-btn-center',
                            flex: 5,
                            minWidth: 90,
                            maxWidth: 90,
                            suppressSizeToFit: true,
                          },
                          {
                            headerName: 'Eliminar',
                            cellRenderer: 'btnCellRenderer',
                            cellRendererParams: {
                              onClick: this.deleteUser.bind(this),
                              label: '<i class="fa fa-trash"></i>',
                              class: 'btn btn-danger btn-sm',
                            },
                            headerClass: 'header-center header-grid-right',
                            cellClass: 'grid-cell-btn-center',
                            flex: 5,
                            minWidth: 90,
                            maxWidth: 90,
                            suppressSizeToFit: true,
                          }
                    
                        ]
                        this.listarUsuarios;
                        
                      }else{
                        this.hasPermition = false;
                        
                      }
                    },
                    error =>{
                      swal.fire(
                        'Ocurrio un problema',
                        'La acción no se pudo concretar',
                        'info'
                      );
                    }
                  );
              }else{
                swal.fire(
                  '',
                  'Usuario o contraseña incorrectos',
                  'info'
                );
              }
              
            }
           
          },
          (error) => {
            swal.fire(
              'Error',
              'El usuario no existe',
              'error'
            );
          }
        );
      }
    }

   
  }
  //metodo para cerrar sesión
  logOut(){
    swal.fire({
      title: 'Cerrar Sesión',
      text: '¿Está seguro de cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
  }) .then((result) => {
    //Si se quiere salir remueve los accesos especiales tanto si es admin o si no lo es
    if (result.isConfirmed) {
      this.userData = {
        clave : "",
        nombre: "",
        passowrd : ""
      };
      this.isLoged = false;
      this.CECSOpassword = "";
      this.CECSOuser = "";
      this.CECSOusername = "";
      this.hasPermition = false;
      localStorage.removeItem('idUser');

      this.columnDir = [
        {
          headerName: 'Clave',
          field: 'clave',
          flex: 5,
          minWidth: 50,
          headerClass: 'header-center header-grid-left',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Nombre',
          field: 'nombre',
          flex: 14,
          minWidth: 140,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        }
        ,
        {
          headerName: 'Extension',
          field: 'extension',
          flex: 6,
          minWidth: 80,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Movil',
          field: 'movil',
          flex: 7,
          minWidth: 80,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Casa',
          field: 'casa',
          flex: 7,
          minWidth: 80,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Oficina',
          field: 'oficina',
          flex: 7,
          minWidth: 80,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Personalizado',
          field: 'personalizado',
          flex: 8,
          minWidth: 80,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Correo',
          field: 'correo',
          flex: 10,
          minWidth: 100,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Departamento',
          field: 'departamento',
          flex: 10,
          minWidth: 100,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Lugar',
          field: 'lugar',
          flex: 8,
          minWidth: 80,
          headerClass: 'header-center header-grid-right',
          cellClass: 'grid-cell-center',
        }
  
      ]
      this.listarUsuarios;
    }

  });
    
  }
  //Metodo para obtener los datos de un usuario registrado
  getUserData(){
    //Se llama a API para obtener datos del usuario registrado
    this.dire.getUserData(this.CECSOuser as string).subscribe(
      (data: any) => {
        this.MyUsuario = data.data[0];
      },
      (error) => {
        swal.fire(
          'Error',
          'El usuario no existe',
          'error'
        );
      }
    );
  }

  //Lista a todos los usuarios en la API
  listarUsuarios() {
    //Obtiene todos los datos mediante todos los filtros de busqueda
    this.dire.getUsuarios(this.filtrosBusqueda).subscribe(
      (data: any) => {
        if(data.data.length > 0){

          this.usuarios = data.data;

        }else{
          this.usuarios = [];
        }
        
      },
      (error) => {
        swal.fire(
          'Error',
          'Ocurrió un Error al Momento de Cargar el Directorio, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
          error.error +
          '</strong>',
          'error'
        );
      }
    );


  }
  

  //Lista todas las ubicaciones (planta navojoa... culiacan... tijuana... etc.)
  listar() {

    this.dire.getUbicacion().subscribe(
      (data: any) => {
        if(data.data.length > 0){

        this.lista = data.data;
        }else{
          this.lista = [];
        }
        
      },
      (error) => {
        swal.fire(
          'Error',
          'Ocurrió un Error al Momento de Cargar el Directorio, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
          error.error +
          '</strong>',
          'error'
        );
      }
    );
  }
  clickToLogin(){
    this.clickLogin = !this.clickLogin;
  }
  //Limpia todos los datos del busqueda
  limpiar(){
    this.filtrosBusqueda.nousuario = "";
    this.filtrosBusqueda.nombre = "";
    this.filtrosBusqueda.departamento = "";
    this.filtrosBusqueda.extension = "";
    this.filtrosBusqueda.lugar = "0";

    this.listarUsuarios();
  }
  //Metodo de presión de teclado obteniendo a tiempo real la busqueda
  onKey(e){ 
    this.filtrosBusqueda.nousuario;
    this.filtrosBusqueda.nombre;
    this.filtrosBusqueda.departamento;
    this.filtrosBusqueda.lugar;
    this.filtrosBusqueda.extension;
    this.listarUsuarios();
  }
  //Busqueda cuando la opción del comboBox de lugares cambie mostrar a los usuarios de ese lugar
  onOptionSelected(e){
    this.listarUsuarios();

  }

  //Metodo para abrir reportes
  abrirReportes(){
    
    if(this.filtrosBusqueda.lugar == "0"){
      window.open("http://datosnv2008.cecso.com.mx/ReportServer/Pages/ReportViewer.aspx?%2fInformatica%2fMNUSRS001%2fMnuSRS001" +"&Clave=" +this.filtrosBusqueda.nousuario+"&NombreUsuario="+this.filtrosBusqueda.nombre+"&Departamento="+this.filtrosBusqueda.departamento+"&EXT="+this.filtrosBusqueda.extension+"&Lugar="
      ,"_blank");
      
    }else{
      window.open("http://datosnv2008.cecso.com.mx/ReportServer/Pages/ReportViewer.aspx?%2fInformatica%2fMNUSRS001%2fMnuSRS001" +"&Clave=" +this.filtrosBusqueda.nousuario+"&NombreUsuario="+this.filtrosBusqueda.nombre+"&Departamento="+this.filtrosBusqueda.departamento+"&EXT="+this.filtrosBusqueda.extension+"&Lugar="+this.filtrosBusqueda.lugar
    ,"_blank"); 
      
    }
    
    
  }
  //Cierra modal
  closeModal(){
    this.serviceModal.dismissAll();
   }
  //Metodo de control (agregar, actualizar, eliminar, actualizar mi perfil) 
  updateUser(){
    
    //Validación de campos
    if(this.DirectorioModel.SERINFODAT003_NombreUsuario == "" || this.DirectorioModel.SERINFODAT003_Clave  == 0||this.DirectorioModel.SERINFODAT003_Correo == "" || this.DirectorioModel.SERINFODAT003_Departamento == ""){
      swal.fire(
        'Registre los campos necesarios',
        'No se pudo concretar la acción debido a que hay un problema en los campos, revise que los datos sean correctos',
        'warning'
      );
    }else{
      if(this.NaNString(this.DirectorioModel.SERINFODAT003_NombreUsuario) == 0 || this.NaNString(this.DirectorioModel.SERINFODAT003_Departamento) == 0){
        swal.fire(
          'Ocurrio un problema',
          'Algunos campos tienen el formato incorrecto',
          'warning'
        );
      } else{
        //metodo de control dependiendo de la acción del modal asignado al abrir el modal
        //
       
        this.DirectorioModel.SERINFODAT003_IdLugar = Number(this.DirectorioModel.SERINFODAT003_IdLugar);
        this.DirectorioModel.SERINFODAT003_Clave = Number(this.DirectorioModel.SERINFODAT003_Clave);
        this.dire.insertData(this.DirectorioModel, this.accionModal).subscribe(
          (data: any) => {
            //Accion modal = 1 : Agregar
            if(this.accionModal == 1){
              swal.fire(
                'Usuario Registrado',
                'El usuario ha sido registrado al directorio telefónico',
                'success'
              );
              
            }
            //Accion modal = 2 : Modificar cualquier usuario
            if(this.accionModal == 2){
              swal.fire(
                'Usuario Modificado',
                'El usuario ha sido modificado en el directorio telefónico',
                'success'
              );
            }
            //Accion modal = 3 : Modificar MIS datos de usuario
            if(this.accionModal == 3){
              swal.fire(
                'Usuario Modificado',
                'Sus datos de usuario ha sido modificado en el directorio telefónico',
                'success'
              );
            }
            //Accion modal = 4 : Dar de baja a un usuario
            if(this.accionModal == 4){
              swal.fire(
                'Usuario Eliminado',
                'El usuario ha sido dado de baja del directorio telefónico',
                'warning'
              );
            }
            //Cerrar modal y recargar lista de usuarios
            this.closeModal();
            this.listarUsuarios();
            //this.directorioUser.correo = this.directorioUser.correo + "@cecso.com";
            
          },
          (error) => {
            swal.fire(
              'Error',
              'No se pudo concretar la acción ' + error.error,
              'error'
            );
          }
        );
      }
      
    }
   
  }
  //Abrir modal dependiendo de que tipo de opción se le asigne
  openModal(modal:any, opcion : number, e : any){
    /*EDITAR USUARIO*/
    /*Agregar*/
    
    this.accionModal = opcion;

    //Agregar
    if(opcion == 1){
      
     this.Direct = {
        id : 0,
        clave : 0,
        nombre : "",
        extension : "",
        movil : "",
        casa : "",
        oficina : "",
        personalizado : "",
        correo : "",
        departamento : "",
        lugar : "0",
        idLugar : 2
      }
     // this.Direct = new Directorio();
     this.DirectorioModel = {
      SERINFODAT003_IdUsuario : 0,
      SERINFODAT003_Clave: Number(this.Direct.clave),
      SERINFODAT003_NombreUsuario: this.Direct.nombre.toUpperCase(),
      SERINFODAT003_Extension: this.Direct.extension,
      SERINFODAT003_Movil: this.Direct.movil,
      SERINFODAT003_Casa: this.Direct.casa,
      SERINFODAT003_Oficina: this.Direct.oficina,
      SERINFODAT003_Personalizado: this.Direct.personalizado,
      SERINFODAT003_Correo : this.Direct.correo,
      SERINFODAT003_Departamento : this.Direct.departamento.toUpperCase(),
      SERINFODAT003_IdLugar : Number(this.Direct.idLugar),
      SERINFODAT003_Admin : false,
      SERINFODAT003_UsuarioInsert : "",
      SERINFODAT003_UsuarioBaja : "",
      SERINFODAT003_UsuarioModifico : this.idUser as string,
      SERINFODAT003_Estatus : true
    }
      this.opModalEnable = false;
      this.TituloModal = "Agregar Usuario";
      this.BotonModal = "Agregar"
      this.serviceModal.open(modal, {size: 'lg'});
      //this.updateUser(this.directorioUser.lugar);
      //this.closeModal();
      //this.getUserData();
      
    }
    /*Modificar*/
    if(opcion == 2){
      
      this.accionModal = opcion;
      this.opModalEnable = true;
      this.TituloModal = "Editar Usuario";
      this.BotonModal = "Editar";
      ///e.idLugar = "2";
      this.Direct = e;
      this.DirectorioModel = {
        SERINFODAT003_IdUsuario : Number(this.Direct.id),
        SERINFODAT003_Clave: Number(this.Direct.clave),
        SERINFODAT003_NombreUsuario: this.Direct.nombre.toUpperCase(),
        SERINFODAT003_Extension: this.Direct.extension,
        SERINFODAT003_Movil: this.Direct.movil,
        SERINFODAT003_Casa: this.Direct.casa,
        SERINFODAT003_Oficina: this.Direct.oficina,
        SERINFODAT003_Personalizado: this.Direct.personalizado,
        SERINFODAT003_Correo : this.Direct.correo,
        SERINFODAT003_Departamento : this.Direct.departamento.toUpperCase(),
        SERINFODAT003_IdLugar : Number(this.Direct.idLugar),
        SERINFODAT003_Admin : false,
        SERINFODAT003_UsuarioInsert : "",
        SERINFODAT003_UsuarioBaja : "",
        SERINFODAT003_UsuarioModifico : this.idUser as string,
        SERINFODAT003_Estatus : true
      }

      this.serviceModal.open(modal, {size: 'lg'});
    }
    //Modifica mi usuario
    if(opcion == 3 ){
      
      this.accionModal = opcion;
      this.opModalEnable = true;
      this.TituloModal = "Editar Mi Usuario";
      this.BotonModal = "Editar";
      this.dire.getMyUserData(this.CECSOuser).subscribe(
        (data: any) =>{
          if(data.data){
            this.MyUsuario = data.data;
            this.Direct = this.MyUsuario[0];
            this.DirectorioModel = {
              SERINFODAT003_IdUsuario : Number(this.Direct.id),
              SERINFODAT003_Clave: Number(this.Direct.clave),
              SERINFODAT003_NombreUsuario: this.Direct.nombre.toUpperCase(),
              SERINFODAT003_Extension: this.Direct.extension,
              SERINFODAT003_Movil: this.Direct.movil,
              SERINFODAT003_Casa: this.Direct.casa,
              SERINFODAT003_Oficina: this.Direct.oficina,
              SERINFODAT003_Personalizado: this.Direct.personalizado,
              SERINFODAT003_Correo : this.Direct.correo,
              SERINFODAT003_Departamento : this.Direct.departamento.toUpperCase(),
              SERINFODAT003_IdLugar : Number(this.Direct.idLugar),
              SERINFODAT003_Admin : false,
              SERINFODAT003_UsuarioInsert : "",
              SERINFODAT003_UsuarioBaja : "",
              SERINFODAT003_UsuarioModifico : this.idUser as string,
              SERINFODAT003_Estatus : true
            }
            this.serviceModal.open(modal, {size: 'lg'});
          }
        },
        (error) =>{
          swal.fire(
            'Error',
            'No se pudo concretar la acción ' + error.error,
            'error'
          );
        }
      );
      
      //this.getUserData();
    }
    if(opcion == 4){
      
    }
  }
  //Metodo para cargar los datos de una selección del GRID
  loadEditar(e : any){
    this.openModal(this.mdlAgregarModificar, 2, e.data);

  }
  //Dar de baja a un usuario
  deleteUser(e : any){
    this.Direct = new Directorio();
    swal.fire({
      title: '¿Está seguro de eliminar el Usuario?',
      text: 'Esta acción es irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
  }) .then((result) => {
    if (result.isConfirmed) {
      this.Direct = e.data;
      //this.Direct.lugar = "1";
      this.accionModal = 4;
      this.DirectorioModel = {
        SERINFODAT003_IdUsuario : Number(this.Direct.id),
        SERINFODAT003_Clave: Number(this.Direct.clave),
        SERINFODAT003_NombreUsuario: this.Direct.nombre.toUpperCase(),
        SERINFODAT003_Extension: this.Direct.extension,
        SERINFODAT003_Movil: this.Direct.movil,
        SERINFODAT003_Casa: this.Direct.casa,
        SERINFODAT003_Oficina: this.Direct.oficina,
        SERINFODAT003_Personalizado: this.Direct.personalizado,
        SERINFODAT003_Correo : this.Direct.correo,
        SERINFODAT003_Departamento : this.Direct.departamento.toUpperCase(),
        SERINFODAT003_IdLugar : Number(this.Direct.idLugar),
        SERINFODAT003_Admin : false,
        SERINFODAT003_UsuarioInsert : "",
        SERINFODAT003_UsuarioBaja : "",
        SERINFODAT003_UsuarioModifico : this.idUser as string,
        SERINFODAT003_Estatus : true
      }
      this.updateUser();

    }

  });
  }
}
