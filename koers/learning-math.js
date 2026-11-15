/* Educational prototype kernel. Not connected to the production plan engine. */
const NorteLearningMath=Object.freeze({
  version:'education-2026-11-01',
  concentration(weight,shock=40){return -weight*shock/100;},
  costs({amount,years,gross,costA,costB}){
    const values=[amount,years,gross,costA,costB];
    if(values.some(x=>!Number.isFinite(x))||amount<0||amount>1000000||years<1||years>50||!Number.isInteger(years)||gross< -20||gross>20||costA<0||costA>5||costB<0||costB>5)return null;
    const path=cost=>Array.from({length:years+1},(_,year)=>amount*Math.pow((1+gross/100)*(1-cost/100),year));
    const a=path(costA),b=path(costB);
    return {a,b,endA:a.at(-1),endB:b.at(-1),difference:a.at(-1)-b.at(-1)};
  }
});
