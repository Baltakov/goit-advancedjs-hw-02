import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as c}from"./assets/vendor-ceb9b81e.js";function l(t,e){return new Promise((o,m)=>{const i=Math.random()>.3;setTimeout(()=>{i?o({position:t,delay:e}):m({position:t,delay:e})},e)})}document.querySelector(".form").addEventListener("submit",t=>{t.preventDefault();const e=new FormData(t.target);let o=Number(e.get("delay"));const m=Number(e.get("step")),i=Number(e.get("amount"));for(let n=1;n<=i;n++)l(n,o).then(({position:r,delay:s})=>{c.success({title:"Success",message:`Fulfilled promise ${r} in ${s}ms`}),console.log(`Fulfilled promise ${r} in ${s}ms`)}).catch(({position:r,delay:s})=>{c.error({title:"Error",message:`Rejected promise ${r} in ${s}ms`}),console.log(`Rejected promise ${r} in ${s}ms`)}),o+=m});
//# sourceMappingURL=commonHelpers3.js.map
