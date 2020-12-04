import {modify,getData as getModifiedData} from './pageModifier.js';
const setRocketData = modify;

const activateEnterData = ()=>{

	const input = document.getElementById('inputUser');
	if (input!=null) {
		input.addEventListener('keypress',(event)=>{
		    if (event.key === 'Enter') {
		    	getRocketData("/rockets/"+input.value);
		    }
		});
	}

	const inputModifier = document.getElementById("inputUserRocket");
	if (inputModifier!=null)
		getRocketData("../../rockets/"+inputModifier.innerHTML);

}

const addRocketAccount = ()=>{
	const input = document.getElementById("addRocketAccount");

	if (input){
		input.addEventListener("click",()=>{
			const capsule_serial = document.getElementById('inputUser').value;

			const data = {
				headers: {'Content-Type': 'application/json'},
				body:JSON.stringify({"id":capsule_serial}),
				method:"POST"
			};

			if (!capsule_serial || capsule_serial=="") return;

			const myPromice = fetch("/rockets/addRocket",data).
		    then((response)=>{
		       	return response.json();
		    }).catch((err)=>{
		    	console.log(err)
		    });
		});
	}

	const changes = document.getElementById("sendRocketChages");
	if (changes)
		changes.addEventListener("click",()=>{

			const rocketModified = getModifiedData();

			const data = {
				headers: {'Content-Type': 'application/json'},
				body:JSON.stringify(rocketModified),
				method:"POST"
			};

			if (!capsule_serial || capsule_serial=="") return;

			const myPromice = fetch("/rockets/modify/"+rocketModified.capsule_serial,data).
		    then((response)=>{
		       	return response.json();
		    }).catch((err)=>{
		    	console.log(err)
		    });

		})

}

const getRocketData = (path)=>{
	const myPromice = fetch(path).
	then((response)=>{
	   	return response.json();
	}).catch((err)=>{
	   	console.log(err)
	});

	myPromice.then((texto)=>{
	  	if (texto==undefined)
	  		throw texto;
			setRocketData(texto);
	}).catch((err)=>{
	   	alert("There was an error. Don´t worry, it isnt your fault")
	});
}

addRocketAccount();
activateEnterData();

