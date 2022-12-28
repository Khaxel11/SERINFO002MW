import { Component, OnInit,ViewChild,Input, Output, EventEmitter } from '@angular/core';
import { NgbModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CuentasxPagarService } from 'src/app/services/cuentasXpagar.service';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mdlbusquedafactura',
  templateUrl: './mdlbusquedafactura.component.html',
  styleUrls: ['./mdlbusquedafactura.component.css']
})
export class MdlbusquedafacturaComponent implements OnInit {
  @ViewChild('mdlBuscar') public mdlBuscar: any;
  @Input () filas = new Array<any>();
  @Output() valores = new EventEmitter<any>();
  modalRef: NgbModalRef;
  public filtrosFactura = {
    fechaInicio:"",
    fechaFin:"",
    uuid:"",
    idProveedor:0,
    startRow:0,
    endRow:0,
  };
  columnDefs: any;
  datos = []
  constructor(public modalService: NgbModal, public cxp:CuentasxPagarService,public datepipe: DatePipe) {
    this.columnDefs = [
      {
        headerName: 'Folio',
        field: 'folioFactura',
        flex: 2,
        minWidth: 80,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Fecha',
        field: 'fechaFactura',
        flex: 10,
        minWidth: 50,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Total',
        field: 'totalFactura',
        flex: 10,
        minWidth: 50,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'UUID',
        field: 'uuid',
        flex: 10,
        minWidth: 50,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Seleccionar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.CargarDatosFactura.bind(this),
          label: '<i class="fa fa-check"></i>',
          class: 'btn btn-success btn-sm',
        },
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit: true,
      }
    ];
   }

  ngOnInit(): void {
    //this.listarFacturas();
    var date = new Date();
    var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filtrosFactura.fechaInicio = this.datepipe.transform(primerDia,'yyyy-MM-dd');
    this.filtrosFactura.fechaFin = this.initialDate();
  }

  openModal(){
    this.filtrosFactura.idProveedor = this.filas[0].idProveedor;
    console.log(this.filtrosFactura.idProveedor)
    this.modalRef = this.modalService.open(this.mdlBuscar, {
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

  listarFacturas() {
    this.filtrosFactura["endRow"] = 9999;
    this.filtrosFactura["startRow"] = 0;
    if(this.filtrosFactura.fechaInicio < this.filtrosFactura.fechaFin){
    this.cxp.listarFacturas(this.filtrosFactura).subscribe(
      (data: any) => {
        if(data.data.length > 0){
        this.datos = data.data;

        }else{
          swal.fire('','No se encontraron registros con los filtros especificados','warning')
        }
      },
      (error) => {
        swal.fire(
          'Error',
          'Ocurrió un Error al Momento de Cargar las facturas, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: ' +
          error.error +
          '</strong>',
          'error'
        );
      }
    );
  }else{
    swal.fire('','El rango de fechas es incorrecto, favor de revisar','warning')
  }
  }

  initialDate(): string {
    let date = new Date();
    let day = date.getDate().toString();
    let month = (1 + date.getMonth()).toString();
    let year = date.getFullYear().toString();

    day.length == 1 ? day = "0" + day : null;

    month.length == 1 ? month = "0" + month : null;

    return year + "-" + month + "-" + day;
  }

  CargarDatosFactura(e){
    this.valores.emit(e.data);
    this.closeModal();
  }

}
