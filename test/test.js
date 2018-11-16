setTimeout(() => {
  console.log('to1');
  process.nextTick(() => {
      console.log('to1_nT');
  })
  new Promise((resolve) => {
      console.log('to1_p');
      setTimeout(() => {
        console.log('to1_p_to')
      })
      resolve();
  }).then(() => {
      console.log('to1_then')
  })
})

setImmediate(() => {
  console.log('imm1');
  process.nextTick(() => {
      console.log('imm1_nT');
  })
  new Promise((resolve) => {
      console.log('imm1_p');
      resolve();
  }).then(() => {
      console.log('imm1_then')
  })
})

process.nextTick(() => {
  console.log('nT1');
})
new Promise((resolve) => {
  console.log('p1');
  resolve();
}).then(() => {
  console.log('then1')
})

setTimeout(() => {
  console.log('to2');
  process.nextTick(() => {
      console.log('to2_nT');
  })
  new Promise((resolve) => {
      console.log('to2_p');
      resolve();
  }).then(() => {
      console.log('to2_then')
  })
})

process.nextTick(() => {
  console.log('nT2');
})

new Promise((resolve) => {
  console.log('p2');
  resolve();
}).then(() => {
  console.log('then2')
})

setImmediate(() => {
  console.log('imm2');
  process.nextTick(() => {
      console.log('imm2_nT');
  })
  new Promise((resolve) => {
      console.log('imm2_p');
      resolve();
  }).then(() => {
      console.log('imm2_then')
  })
})


// p1 -> p2 -> nT1 -> nT2 -> then1 -> then2 
// to1 -> to1_p ->to2 ->to2_p

// to1_nT  to2_nT   to1_then  to2_then 

// imm1-> imm1_p -> imm2 -> imm2_p

  // imm1_nT    imm2_nT   imm1_then  imm2_then
  // to1_p_to
  