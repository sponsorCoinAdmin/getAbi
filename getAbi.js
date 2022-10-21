const axios = require('axios')
const { ethers } = require('ethers')

require("dotenv").config();
const INFURA_TESTNET_GOERLI_URL = process.env.INFURA_TESTNET_GOERLI_URL
const INFURA_TESTNET_GOERLI_KEY = process.env.INFURA_TESTNET_GOERLI_KEY
const ETHERSCAN_API_GOERLI_KEY = process.env.ETHERSCAN_API_GOERLI_KEY

const WEATH = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'
const SPCOIN = '0x3Cb3d2655dB27d0ef62f0B77E0e13c06630317Ef'

// WETH ADDRESS
const address = WEATH
const apiKey = ETHERSCAN_API_GOERLI_KEY
const url = `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
//console.log("URL = " + url)
const infuraUrl = INFURA_TESTNET_GOERLI_URL+INFURA_TESTNET_GOERLI_KEY

const getAbi = async () => {
  console.log("url = " + url)
  const res = await axios.get(url)
  console.log(res.data)

  /**/ 
  const abi = JSON.parse(res.data.result)
  console.log(abi)

  const provider = new ethers.providers.JsonRpcProvider(infuraUrl)
  const contract = new ethers.Contract(
    address,
    abi,
    provider
  )

  const name = await contract.name()
  const totalSupply = await contract.totalSupply()

  console.log(name)
  console.log(totalSupply.toString())
  /**/
}
getAbi()
