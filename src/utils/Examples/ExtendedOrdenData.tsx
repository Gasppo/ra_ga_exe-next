import { Archivo, AtributoPrenda, ComplejidadConfeccion, CotizacionOrden, DetallesPrenda, EstadoOrden, Orden, PrecioPrenda, TipoPrenda, User } from '@prisma/client';

export type ExtendedOrdenData = Orden & {
  archivos: Archivo[];
  estado: EstadoOrden;
  user: User; prenda: PrecioPrenda & { complejidad: ComplejidadConfeccion; tipo: TipoPrenda; };
  cotizacionOrden: CotizacionOrden[];
  detallesPrenda: DetallesPrenda & { atributos: AtributoPrenda[]; };
  mensajes: { id: string, message: string, timestamp: string, user: { email: string, name: string } }[]
};
