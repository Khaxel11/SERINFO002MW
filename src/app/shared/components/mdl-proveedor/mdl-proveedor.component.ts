import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';
import{ IClaveDescripcion  } from '../../../../app/models/CuentasXPagar/IClaveDescripcion';
import { FacturasProveedoresService } from '../../../../app/services/CuentasXPagar/FacturasProveedores.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mdl-proveedor',
  templateUrl: './mdl-proveedor.component.html',
  styleUrls: ['./mdl-proveedor.component.css']
})
export class MdlProveedorComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  @Input() TipoAccion = 'A';
  // @Input() set Datos(value: any) {
  //   if (Object.keys(value).length !== 0) {
  //     this.Datoss = value;
  //   }
  // }

  @Output() ClickbtnCerrar = new EventEmitter<any>();

  @ViewChild('mdlProveedor') private mdlProveedor: any;
  @Output() ItemData = new EventEmitter<any>();
  modalRef: NgbModalRef;
  
  columnDefs: any;
  Datos: Array<IClaveDescripcion> = [{id: 0, descripcion: ''}];
  filtroProvSelect = {codigo: '', descripcion: ''};
  ProvSeleccionado = {id: 0, descripcion: ''};
  

  // DatFormulario: iFacturaProveedor = {
  //   admcxpadaT001_ID:0,
  //   admcxpadaT001_Serie:'',
  //   admcxpadaT001_Folio:'',
  //   admcxpadaT001_Factura:'',
  //   admcxpadaT001_UUID:'',
  //   admcxpadaT001_OrdenCompra:'',
  //   admcxpadaT001_FechaFactura:null,
  //   admcxpadaT001_FechaCarga :null,
  //   admcompcaT002_ID:0,
  //   admcomcaT002_RazonSocial:'',
  //   admcontcaT020_IdMoneda:0,
  //   moneda:'',
  //   admcxpadaT001_TipoCambio:1,
  //   admcxpadaT001_ImporteSubtotal:0,
  //   fcocaT016_IdIva:0,
  //   admcxpadaT001_ImporteIVA:0,
  //   admcxpadaT001_TasaISR:0,
  //   admcxpadaT001_ImporteISR:0,
  //   admcxpadaT001_TasaISRIVA:0,
  //   admcxpadaT001_ImporteISRIVA:0,
  //   admcxpadaT001_ImporteTotal:0,
  //   admcxpadaT001_Usuario:'',
  //   admcxpadaT001_AplicadoCxP:false,
  //   admcxpadaT001_FechaAplicadoCxP:null,
  //   admcxpadaT001_UsuarioAplicoCxP:'',
  //   admcxpadaT001_AplicadoTesoreria:false,
  //   admcxpadaT001_FechaAplicadoTesoreria:null,
  //   admcxpadaT001_UsuarioAplicoTesoreria:'',
  //   admcxpadaT001_Activo:false,
  //   admcxpadaT001_FechaInsert:null,
  //   admcxpadaT001_UsuarioInsert:'',
  //   admcxpadaT001_FechaModificacion:null,
  //   admcxpadaT001_UsuarioModifica:'',
  //   admcxpadaT001_FechaEliminacion:null,
  //   admcxpadaT001_UsuarioElimina:'',
  //   tipoAccion: ''
  // };

  constructor(public Servicio: FacturasProveedoresService, private modalService: NgbModal) {

    this.columnDefs = [
      {
        headerName: 'ID',
        field: 'id',
        flex: 2,
        maxWidth: 120,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
        hide: true,
      },
      {
        headerName: 'Proveedor',
        field: 'descripcion',
        flex: 3,
        minWidth: 80,
        headerClass: 'header-justify header-grid-right',
        cellClass: 'grid-cell-justify',
        sortable: true,

      },
      {
        headerName: 'Selec',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.GridEditar.bind(this),
          label: '<i class="fa fa-edit"></i>',
          class: 'btn btn-secondary btn-sm',
        },
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit: true,
      },
    ];

   }

  ngOnInit(): void {
  }

  GridEditar(e): void {
    this.TipoAccion = 'M';
    this.ProvSeleccionado = e.data;
    this.ItemData.emit(this.ProvSeleccionado);
    //this.btnCerrar();
    this.closeModal();
  }

  btnCerrar(): void {
    
    this.closeModal();
  }
  BuscarProveedores(): any {

    this.Servicio.BuscarProveedores(this.filtroProvSelect).subscribe(
      (data: any) => {
        this.Datos = data.data
      },
      (error) => {
        swal.fire(
          'Ha Ocurrio un Error',
          'Ha Ocurrio un Error al Momento de Cargar la proveedores, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
          error.error +
          '</strong>',
          'error'
        );
      }
    )
  }


  

    //ABRIR MODAL
    openModal(){
      this.modalRef = this.modalService.open(this.mdlProveedor, {
        size: 'lg',
        backdrop: 'static',
        keyboard: false
      });
      this.modalRef.result.then(() => {
        
      });
    }
    
    //CERRAR MODAL
    closeModal(): void {
      this.modalRef.close();
    }

  

}
