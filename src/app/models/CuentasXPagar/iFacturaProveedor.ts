export interface iFacturaProveedor {
	admcxpadaT001_ID: number,
	admcxpadaT001_Serie: string,
	admcxpadaT001_Folio: string,
	admcxpadaT001_Factura: string,
	admcxpadaT001_UUID: string,
	admcxpadaT001_OrdenCompra: string,
	admcxpadaT001_FechaFactura: string,
	admcxpadaT001_FechaCarga: Date,
	admcompcaT002_ID: number, //Proveedor
	admcompcaT002_RazonSocial:string,
	admcontcaT020_IdMoneda: number, //Moneda
	moneda: string,
	admcxpadaT001_TipoCambio: number,
	admcxpadaT001_ImporteSubtotal: number,
	fcocaT016_IdIva: number, //Tasa de IVA
	admcxpadaT001_ImporteIVA: number,
	admcxpadaT001_TasaISR: number,
	admcxpadaT001_ImporteISR: number,
	admcxpadaT001_TasaISRIVA: number,
	admcxpadaT001_ImporteISRIVA: number,
	admcxpadaT001_ImporteTotal: number,
	admcxpadaT001_Usuario: string,
	admcxpadaT001_AplicadoCxP: boolean,
	admcxpadaT001_FechaAplicadoCxP: Date,
	admcxpadaT001_UsuarioAplicoCxP: string,
	admcxpadaT001_AplicadoTesoreria: boolean,
	admcxpadaT001_FechaAplicadoTesoreria: Date,
	admcxpadaT001_UsuarioAplicoTesoreria: string,
	admcxpadaT001_Activo: boolean,
	admcxpadaT001_FechaInsert: Date,
	admcxpadaT001_UsuarioInsert: string,
	admcxpadaT001_FechaModificacion: Date,
	admcxpadaT001_UsuarioModifica: string,
	admcxpadaT001_FechaEliminacion: Date,
	admcxpadaT001_UsuarioElimina: string,
	tipoAccion: string
  }


  