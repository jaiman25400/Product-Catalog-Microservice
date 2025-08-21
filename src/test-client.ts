import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

async function test() {
  const client: ClientProxy = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  });

  const response = await client.send({ cmd: 'hello' }, {}).toPromise();
  console.log('Response from microservice:', response);
}

test()