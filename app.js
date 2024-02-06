const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector(".btn")
const msg=document.querySelector(".msg")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");



 for(let select of dropdowns){
  for(currCode in countryList) {
     let newOption=document.createElement("Option");
     newOption.innerText=currCode;
     newOption.value=currCode;
     if(select.name=== "from" && currCode==="USD"){
         newOption.selected="selected"
     }
     else if(select.name==="to" && currCode==="INR"){
         newOption.selected="selected"
     }
     select.append(newOption);
    
   }
   select.addEventListener("change" ,(evt)=>{
     updateFlag(evt.target)
   })
 }
 const updateFlag=(element)=>{
 let currCode=element.value;
 let countryCode=countryList[currCode]
 let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
 let img=element.parentElement.querySelector("img");
 img.src=newSrc;
 }
 btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
 })
  const updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtValue=amount.value;
    if(amtValue==="" || amtValue<1){
        amtValue=1;
        amount.value="1";
        console.log(amtValue)
    }
    // console.log(fromCurr.value,toCurr.value)
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response=await fetch(URL);
    //  console.log(response)
    let data=await response.json();
    // console.log(data)
    let rate=data[toCurr.value.toLowerCase()];
    console.log(rate)
    
    let finalAmount=amtValue*rate;
    msg.innerText=`${amtValue} ${fromCurr.value}=${finalAmount} ${toCurr.value}`
  }
  window.addEventListener("load",()=>{
    updateExchangeRate();
})