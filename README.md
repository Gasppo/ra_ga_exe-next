### Sitio web para Taller-HS

## Indice

- [Objetivos](#objetivos)
- [Funcionalidad del proyecto](#funcionalidad)
- [Complejidad](#complejidad)
- [Flujo de ordenes](#flujo)

<a name="objetivos"/>

## Objetivos

Este proyecto surgió como una alternativa de desarrollo planteada a los alumnos de la Universidad
Católica Argentina en el marco de la materia Proyecto Integral de Desarrollo, cuyo objetivo es mejorar las
prácticas de programación trabajando en diversos proyectos que otorguen y agreguen valor a los
clientes.

Taller HS es un emprendimiento que se dedica a la confección de diversas prendas de ropa
personalizadas en base a las necesidades y pedidos particulares de cada cliente.

Los objetivos del proyecto a desarrollar consisten en agilizar la creación de nuevas cotizaciones de
prendas y mantener un seguimiento del flujo de los estados de las órdenes creadas, con la finalidad que
los clientes dispongan de un sitio para visualizar sus órdenes y los estados en los que se encuentran.

Este desarrollo web permitirá al Taller HS automatizar la parte de la cotización de prendas que
actualmente se realiza de manera manual a través de hojas de cálculo Excel, a la vez que ahorrar tiempo
a la hora de informar al cliente el estado de sus órdenes, ya que será posible consultarlas dentro del
portal web.

<a name="funcionalidad"/>

## Funcionalidad del proyecto

Las funcionalidades principales brindadas por la aplicación son las siguientes:

- Poder customizar una prenda y obtener su precio estimado en tiempo real: <p align="center"><img src='https://i.imgur.com/fq4fRg8.png'/></p>
- Poder visualizar las ordenes y cotizaciones que un usuario cliente posee al igual que su información de usuario: <p align="center"><img src='https://i.imgur.com/Y3yuZNp.png'/></p>
- Hay dos usuarios: Administradores y Clientes.
- Los usuarios Administradores tienen un panel donde pueden visualizar las ordenes, usuarios y modificar precios base de los productos. <p align="center"><img src='https://i.imgur.com/4BvPnTT.png'/></p>

<a name="complejidad"/>

## Complejidad

Uno de los puntos más importantes a la hora de determinar el precio de las prendas a producir es poder determinar su complejidad. Según que tan compleja sea una prenda, su precio va a variar y el estimado que el cotizador arroje se verá modificado. Se establecieron seis distintas complejidades:

*	Básico.
*	Medio.
*	Complejo.
*	Muy Complejo.
*	Ultra Complejo.
*	Extremadamente Complejo.

Para que el cotizador pueda funcionar de manera precisa indicando el precio, es necesario que tenga en cuenta cuál es la complejidad de la prenda. 

<a name="flujo"/>

## Flujo de ordenes

Una vez que el cliente crea su cotización, estas estarán disponibles en su pantalla principal. En esta podrá ver un historial de sus cotizaciones, información del usuario y el botón de creación de nuevas cotizaciones. 

<p align="center"><img src='https://i.imgur.com/yJq2JX8.png'/></p>

Una vez que el cliente hace click en el botón señalado con un círculo rojo en la imagen puede visualizar su orden y ver el estado en el que se encuentra. 

En esta pantalla se incluirán los datos de la cotización, junto con el estado en que se encuentra.
