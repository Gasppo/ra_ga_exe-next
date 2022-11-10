import { Archivo, AtributoPrenda, ComplejidadConfeccion, CotizacionOrden, DetallesPrenda, EstadoOrden, Orden, PrecioPrenda, TipoPrenda, User } from '@prisma/client';

export type ExtendedOrdenData = Orden & {
  archivos: Archivo[];
  estado: EstadoOrden;
  user: User; prenda: PrecioPrenda & { complejidad: ComplejidadConfeccion; tipo: TipoPrenda; };
  cotizacionOrden: CotizacionOrden[];
  detallesPrenda: DetallesPrenda & { atributos: AtributoPrenda[]; };
  mensajes: { id: string, message: string, timestamp: string, user: { email: string, name: string } }[]
};

export type UserInfo ={
  name:string,
  razonSocial:string,
  email: string,
  image: string,
  telefono: string,
  cuit:string,
  direccionFacturacion:string,
  direccionEnvio:string,
}