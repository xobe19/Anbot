let inp_a = document.getElementById("a_input");
let inp_b = document.getElementById("b_input");
let reaction_img = document.getElementById("reaction-img");
let reaction_text = document.getElementById("reaction-text");
let calc_btn = document.getElementById("calc-btn");


function flame_calc(a, b) {
  let mp_a = {};
  let mp_b = {};
  let fin_len = 0;
  for(let x = 97; x <= 97+25; x++) {
          let chr = String.fromCharCode(x);
          mp_a[chr] = 0;
          mp_b[chr] = 0;
  }
  for(let i = 0; i < a.length; i++) {
    mp_a[a[i]]++;
  }
  for(let i = 0; i < a.length; i++) {
    mp_b[b[i]]++;
  }
 for(let x = 97; x <= 97+25; x++) {
          let chr = String.fromCharCode(x);
         fin_len += (Math.max(mp_a[chr], mp_b[chr]) - Math.min(mp_a[chr], mp_b[chr]) );
  }

  fin_len--;
  fin_len%=6;
  let flames = "FLAMES";
  let mp = {
    "F": false,
    "L": true,
    "A": true,
    "M": true,
    "E": false,
    "S": false
  }
  let fin_char = flames[fin_len];
  return mp[fin_char];
  
   
}


async function calc(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if(a == b) return "self";
let gen_a, gen_b;
await fetch("https://gender-api.com/get?name="+ a +"&key=" + api.key)
.then((res) => res.json())
.then((data) => {
    gen_a = data.gender;
});
await fetch("https://gender-api.com/get?name="+ b +"&key=" + api.key)
.then((res) => res.json())
.then((data) => {
    gen_b = data.gender;
});

if(gen_a == gen_b) {
    return "gay";
}
else {
  if(flame_calc(a, b)) {
    return "yes";
  }
  else return "no";
}

}



calc_btn.addEventListener("click", async (e) => {
  let text_a = inp_a.value;
  let text_b = inp_b.value;
  if(text_a != "" && text_b != "") {
   reaction_img.style.filter = "brightness(100%)";   

    let ans = await calc(text_a, text_b);
    if(ans == "gay") {
        reaction_text.innerHTML = "Oh My God! That's fucking gay";
        reaction_img.setAttribute("src", "./image_assets/gg.png");
    }
    else if(ans == "yes") {
      reaction_text.innerHTML = "Hmm..Yep! That sounds good"
      reaction_img.setAttribute("src", "./image_assets/yes.png");
    }
    else if(ans == "no") {
       reaction_text.innerHTML = "I'm sorry to say this, but.." 
       reaction_img.setAttribute("src", "./image_assets/no.png");
       reaction_img.style.filter = "brightness(50%)";
    }
    else {
      reaction_text.innerHTML = "Don't mess with me!";
      reaction_img.setAttribute("src", "./image_assets/self.png");
    }
  }
  



});

