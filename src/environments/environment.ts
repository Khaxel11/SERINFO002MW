// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // APIS Modulos de Planeacion
  //FCAPROGAPI001: '', // CATALOGOS
  //FCAPROFAPI002: '', // DATOS
  // OTRAS
  //ADMCXPAAPI001:'http://localhost:5000/',
  ADMCXPAAPI001: 'http://intranet4.cecso.com.mx/ERPCECSO/ERPWEBA8/ADMINISTRATIVO/CXPA/Apis/ADMCXPAAPI001/',
  ERPGRALAPI001: 'http://intranet3.cecso.com.mx/ErpWebA8/Apis/Erp/Gral/ERPGRALAPI001M/', // API GENERAL ERP
  SERTRAFAPI001: 'http://intranet3.cecso.com.mx/ErpWebA8/Apis/Ser/traf/SERTRAFAPI001M/', // API TRAFICO
  SERINFOAPI002: 'http://localhost:51197/',
  //SERINFOAPI002: 'http://intranet4.cecso.com.mx/ERPCECSO/ERPWEBA8/SERVICIOS/SERINFOAPI002/',
  AMDCCOBAPI001: 'http://intranet3.cecso.com.mx/ErpWebA8/Apis/adm/cxc/ADMCCOBAPI001/', // API CARTERA
  URL_INFORMATICA_INFERPAPI001: 'http://172.16.2.235/ERPWebApi2020/ApisInformatica/INFERPAPI001/api/', // API REGLAS DE NEGOCIO
  URL_API_ADMFCOAPI001: 'http://172.16.2.235/ERPWebApi2020/ApisFacturacion/ADMFCOAPI001/api/', // API FACTURACION
  URLApiArchivosLocal: 'http://intranet3.cecso.com.mx/ErpWebA8/Apis/Ser/Gral/apisubirarchivos', // API ARCHIVOS (SUBIR)
  URLApiArchivos: 'https://app.cecso.com.mx/Apis/3.0/ERPCMP001_Archivos' // API ARCHIVOS (BAJAR)
};
