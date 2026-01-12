import { connect, NatsConnection } from 'nats';

class NatsSingleton {
  private static instance: NatsSingleton | null = null;
  private nc: NatsConnection | null = null;

  private constructor() {
    console.log('NatsSingleton initialized');
    this.connect();
  }

  public static getInstance(): NatsSingleton {
    if (!NatsSingleton.instance) {
      NatsSingleton.instance = new NatsSingleton();

    }
    return NatsSingleton.instance;
  }
  public isconnected():boolean{
    return this.nc !== null;
  }
  public getConnection(): NatsConnection {
    if (!this.nc) {
      throw new Error('NATS connection not established');
    }
    return this.nc;
  }

  private async connect(): Promise<void> {
    try {
      this.nc = await connect({
        servers: ['nats://localhost:4222'],
      });
      console.log('Connected to NATS');
    } catch (error) {
      console.error('Error connecting to NATS:', error);
    }
  }
}

export default NatsSingleton;
