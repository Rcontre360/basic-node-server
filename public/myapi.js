import modify from './pageModifier.js';
const setRocketData = modify;

const getRocketData = ()=>{

	const input = document.getElementById('inputUser');
	if (input==null) return;

	input.addEventListener('keypress',(event)=>{
	    if (event.key === 'Enter') {

	    	const data = input.value;

	    	const myPromice = fetch('/rockets/'+data).
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
	   			alert("\""+data+"\" was not found in our files.")
			});

	    }
	});
}

const addRocketAccount = ()=>{
	const input = document.getElementById("addRocketAccount");

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

addRocketAccount();
getRocketData();

