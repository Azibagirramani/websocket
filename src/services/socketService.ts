// vehicle inteface

export interface vehicle {
  id: string;
  name: string;
  plate: string;
  position: {
    lat: number;
    lon: number;
  };
  battery_status: {
    percentage_level: number;
    estimated_distance: number;
    battery_matched: boolean;
    time: string;
  };
  scooter_version: string;
  modifications: null;
  group: string;
  _change: string;
}

/**
 * Socket Service
 * @export
 * @class SocketService
 * @extends {BaseService}
 *
 */

class SocketService {
  public socket;
  //   private msg;
  constructor() {
    this.socket = new WebSocket("wss://api.hop.city/v1/ws");
  }

  public connect(): void {
    this.socket.onopen = () => {
      console.log("Connected to socket");
    };
  }

  // convert data json.stringify
  public sendData(data: any = {}): void {
    try {
      this.socket.send(JSON.stringify(data));
      return;
    } catch (e) {
      console.log(e);
    }
  }

  // subscribe to event
  public onMessage(callback: any): void {
    try {
      this.socket.onmessage = callback;
      return;
    } catch (e) {
      console.log(e);
    }
  }

  // check if online
  public isOnline(callback: any): void {
    const state = this.socket.readyState === WebSocket.OPEN;
    callback(state);
  }

  // check if offline
  public isOffline(callback: any): void {
    const state = this.socket.readyState === WebSocket.CLOSED;
    callback(state);
  }

  public onError(callback: any): void {
    this.socket.onerror = () => {
      callback();
    };
  }

  // close connection
  public close(): void {
    try {
      this.socket.close();
      return;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new SocketService();
