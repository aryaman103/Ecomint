import {ABI} from './abi'
const contract ="0xc8bc3982ff7430f61f6c5de5082cf136650ac57c"

const connex=new Connex({
  node:"https://mainnet.veblocks.net/",
  network:"test"
})
var userlogin = false
var loginbtn = document.querySelector('#login-btn')

loginbtn.onclick =async() =>{
  const message= {
    purpose: "identification",
    payload: {
      type: "text",
      content: "Sign this certificate to prove your identity",

    },
  }
  const certResponse =await connex.vendor.sign("cert", message).request()
  if(certResponse){
    const useraddress= certResponse.annex.signer
    document.querySelector('#login-body').className='hidden'
    document.querySelector('#dapp-body').classList.remove('hidden')
    document.querySelector('#user-address').innerHTML = useraddress
    userlogin=true
  }else{
    alert("Wallet not found")
  }
}

var storebtn = document.querySelector('#store-btn')

storebtn.onclick=async()=>{
  if(userlogin){
    const usernumber = document.querySelector('#store-input').value
    if(usernumber.length>0){

      const storeABI= ABI.find(({name})=>name === 'store')
      const clause = connex.thor.account(contract).method(storeABI).asClause(usernumber)
      const result= connex.vendor.sign("tx", [clause]).comment("storing a number on vechain").request()

    } else {
      alert("Please add the number in input")
    }

  }else{
    alert("Please login first")
  }
}

var readbtn = document.querySelector('#read-btn')

readbtn.onclick = async () =>{

const contractnumber = document.querySelector('#contract-number')
const readABI = ABI.find(({name})=>name==="read")
contractnumber.innerHTML='reading'

const result = await connex.thor.account(contract).method(readABI).call()

if(result){
  contractnumber.innerHTML = result.decoded[0]
} else{
  contractnumber.innerHTML = 'failed to fetch'
}

}