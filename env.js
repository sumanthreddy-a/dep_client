// Import PRIVATE_KEY, PUBLIC_KEY, VALIDATOR_URL from .env file
const dotenv = require('dotenv')

const { leafHash } = require('./sawtooth-client')

dotenv.config()

const env = {
  privateKey: process.env.PRIVATE_KEY || '',
  publicKey: process.env.PUBLIC_KEY || '',
  restApiUrl: process.env.REST_API_URL || 'http://159.65.157.166:8008',
  familyName: 'ibc-hack',
  familyPrefix: leafHash('ibc-hack', 6),
  familyVersion: '1.0'
}

module.exports = env
