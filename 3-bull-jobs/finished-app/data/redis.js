import IORedis from 'ioredis';

export const Redis = new IORedis({ port: 6331 });
