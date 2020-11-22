import modify from './pageModifier.js';
const setRocketData = modify;

const getRocketData = ()=>{

	const input = document.getElementById('inputUser');

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

getRocketData();


	/*		Structure of each button created
	<p>
		<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
			//button name   
		</button>
	</p>
		<div class="collapse" id="collapseExample">
			<div class="card card-body">
		    	//button content	
		   	</div>
		</div>*/