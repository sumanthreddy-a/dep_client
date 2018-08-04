const {
  EnclaveFactory
} = require('./enclave')
const {
  SawtoothClientFactory
} = require('./sawtooth-client')


const env = require('./env')
const input = require('./input')


const enclave = EnclaveFactory(Buffer.from(env.privateKey, 'hex'))

const intkeyClient = SawtoothClientFactory({
  enclave: enclave,
  restApiUrl: env.restApiUrl
})

const intkeyTransactor = intkeyClient.newTransactor({
  familyName: env.familyName,
  familyVersion: env.familyVersion
})



const express = require('express')
const body_parser = require('body-parser')
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://dep1:dep123@ds157702.mlab.com:57702/dep1');
mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});
let axios = require('axios')
const ledgerSync = require('./ledgerSync')


app.use(body_parser({
  url_encoded: true
}))

app.post('/submit', async (req, res) => {
  const response = await input.submitPayload(req.body, intkeyTransactor)
  res.json(response.data)
})

/* get dep data */
app.get('/datasets', async (req, res) => {
  const allData = await ledgerSync.find()
  res.json({
    data: allData
  })
})

/* get aadhar by  data */
app.get('/datasets/:aadhar', async (req, res) => {
  const allData = await ledgerSync.find({
    aadhar: req.params.aadhar
  })
  res.json({
    data: allData
  })
})
app.get('/lastrecord/:aadhar', async (req, res) => {
  const allData = await ledgerSync.find({
    aadhar: req.params.aadhar
  }).sort({
    createdAt: -1
  })
  res.json({
    data: allData[0]
  })
})
app.listen(3000, () => {
  console.log("port is 3000")
})
