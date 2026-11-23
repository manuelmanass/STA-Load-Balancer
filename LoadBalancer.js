export default class LoadBalancer {
  // import vite.config;
  // Очень важное примечание к этому заданию: все полезные нагрузки запросов должны быть заменены числовым значением строки. В противном случае задание будет считаться невыполненным.

  constructor(servers) {
    // Ejemplo de un servidor:
    // {
    //   id: "server-2",
    //   power: 3,          // Unidades de trabajo por segundo simulado
    //   activeRequest: { id: "P01", payload: "08319462", work: 4 }, // null si está libre
    //   queuedRequests: [{ id: "P02", payload: "74150328", work: 2 }],
    //   activeProgress: 0.25 // Progreso de 0 a 1 (0 si está libre)
    // }
    // Los datos son de solo lectura y se actualizan durante la simulación.

    this.next=0;
    this.servers = Object.freeze([...servers]);
    this.cola=0;
  }
  
  async onRequestArrival(request, sendToServer) {
    // Ejemplo de la petición que llega:
    // {
    //   id: "request-17",
    //   payload: "08319462", // Datos que envía el cliente
    //   work: 4              // Unidades de trabajo necesarias
    // }

    let server=null;

    if(this.servers[this.next].power===4){

      server= this.servers[this.next];

    }else if(this.servers[this.next].power===3 && this.cola<4){

      server= this.servers[this.next];

    }else if(this.servers[this.next].power==2 && this.cola<3){

      server= this.servers[this.next];

    }else if(this.servers[this.next].power===1 && this.cola<2){

      server= this.servers[this.next];
    }else{
      server= this.servers[this.next];
    }
    this.cola++;
    this.next = (this.next + 1) % this.servers.length;
    if(this.cola==4){this.cola=0;}
    // Envía la petición al servidor y devuelve su respuesta al cliente.
    return sendToServer(server.id);
  }

}

