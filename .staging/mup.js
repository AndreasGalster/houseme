module.exports = {
  servers: {
    one: {
      host: '13.76.85.245',
      username: 'houseme',
      password: 'Pigments01728789',
      // pem: './mykey',
    },
  },

  meteor: {
    name: 'houseme-staging-sea',
    path: '../',
    servers: {
      one: {},
    },
    env: {
      ROOT_URL: 'https://staging.houseme.space',
      // ROOT_URL: 'https://www.houseme.space',
      PORT: 80,
      MONGO_URL: 'mongodb://houseme:Pigments01728789@ds017195.mlab.com:17195/houseme-staging'
    },
    ssl: {
      crt: './ssl/fullchain.pem', // this is a bundle of certificates
      key: './ssl/privkey.pem', // this is the private key of the certificate
      port: 443 // 443 is the default value and it's the standard HTTPS port
    },

  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
