module.exports = {
  servers: {
    one: {
      host: '52.163.211.24',
      username: 'houseme',
      password: 'Pigments01728789',
      // pem: './mykey',
    },
  },

  meteor: {
    // name: 'houseme-production-sea',
    name: 'housemeTLSnewMUP',
    path: '../',
    servers: {
      one: {},
    },
    env: {
      ROOT_URL: 'https://www.houseme.space',
      PORT: 80,
      MONGO_URL: 'mongodb://AndreasGalster:Pigments01728789@ds064188.mlab.com:64188/pigments'
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
