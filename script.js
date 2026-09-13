const data={
fr:{
 title:"Innover aujourd’hui,<br>construire demain !!",
 intro:"Des solutions numériques modernes, pensées pour accompagner les entreprises, les créateurs et les projets de demain.",
 services:"NOS SERVICES", contact:"CONTACT US",
 s1:"Applications Mobiles",d1:"Conception d’applications mobiles modernes et adaptées à vos besoins.",
 s2:"Services Numériques",d2:"Des solutions numériques pour développer, simplifier et moderniser vos activités.",
 s3:"Informations importantes !!",d3:"Retrouvez ici les informations et annonces importantes de Trillion Software."
},
en:{
 title:"Innovate today,<br>build tomorrow !!",
 intro:"Modern digital solutions designed to support businesses, creators and the projects of tomorrow.",
 services:"OUR SERVICES", contact:"CONTACT US",
 s1:"Mobile Applications",d1:"Modern mobile applications designed around your needs.",
 s2:"Digital Services",d2:"Digital solutions to develop, simplify and modernize your activities.",
 s3:"Important Information !!",d3:"Find important information and announcements from Trillion Software here."
}};
document.querySelectorAll(".langs button").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".langs button").forEach(x=>x.classList.remove("active"));
 b.classList.add("active");
 const t=data[b.dataset.l];
 document.getElementById("title").innerHTML=t.title;
 document.getElementById("intro").textContent=t.intro;
 document.getElementById("servicesBtn").textContent=t.services;
 document.getElementById("servicesTitle").textContent=t.services;
 document.getElementById("contact").textContent=t.contact;
 document.getElementById("contactLabel").textContent=t.contact;
 document.documentElement.lang=b.dataset.l;
});
