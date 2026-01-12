import NatsSingleton from '../Singletons/Nats';

class NatsService {
  private nc: import('nats').NatsConnection;

   constructor() {

    const singleton = NatsSingleton.getInstance();


    setTimeout(() => {
      this.nc = singleton.getConnection();
      console.log("NATS connection established");
    }, 1000);
  }

  async publish(subject: string, data: string | Uint8Array): Promise<void> {
    await this.nc.publish(subject, data);
  }

  async publishJson(subject: string, data: object): Promise<void> {
    const payload = JSON.stringify(data);
    await this.publish(subject, payload);
  }


  subscribe(subject: string, callback: (msg: any) => void): import('nats').Subscription {
    return this.nc.subscribe(subject, { callback });
  }
}

export default NatsService;
