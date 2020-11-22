
const htmlData = (data,countID)=>{
	let str = ""; 

	for (var key in data){	
		countID++;
		str+= "<p><button class=\"btn btn-primary col-lg-12\" type=\"button\" data-toggle=\"collapse\""; 
		str+= "data-target=\"#a"+countID+"\" aria-expanded=\"false\" aria-controls=\"a"+countID+"\">";
		str+=key+"</button></p>";
		str+="<div class=\"collapse\" id=\"a"+countID+"\">"+"<div class=\"card card-body\">";

		if (Array.isArray(data[key])){
			for (var i=0;i<data[key].length;i++)
				str+=htmlData(data[key][i],countID+10)
		} else {
			str+=data[key];
		}
		
		str+="</div></div>";
	}

	return str
}

export default function modify(jsonData) {
	const content = document.getElementById("rocketInfo");
	const button = document.getElementById("myRocketName");
	button.innerHTML = "Rocket: "+jsonData["capsule_serial"]
	content.innerHTML = htmlData(jsonData,0);
}

export {modify}