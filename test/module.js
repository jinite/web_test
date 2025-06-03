
function proc(obj){
	let str = "";
	let map = new Map();
	for(const item of obj){
		if(map.has(item[0])){
			map.set(item[0], map.get(item[0]) + 1);
		}else{
			map.set(item[0], 1);
		}

	}
	let arr = [];
	for(const entry of map){
		arr[arr.length] = entry[0] + ":" + entry[1];
	}
	str = arr.join("\n");
	return str;
}


function parseCsv(str){
	let startS = 0;
	let endS = 0;
	let startW = 0;
	let endW = 0;
	let sentence;
	let word;
	let arr = [];
	while(str.length > startS){
		arr[arr.length] = [];
		endS = str.indexOf('\r\n', startS);
		sentence = str.substring(startS, endS);
		startW = 0;
		while(sentence.length > startW){
			endW = sentence.indexOf(',', startW);
			if(endW === -1){
				endW = sentence.length;
			}
			word = sentence.substring(startW, endW);
			arr[arr.length - 1][arr[arr.length - 1].length] = word;
			startW = endW + 1;
		}
		startS = endS + 2;
	}
	return arr;
}



const fileInput = document.querySelector("input[type=file]");
const output = document.querySelector(".output");

fileInput.addEventListener("change", () => {
  const [file] = fileInput.files;
  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
	output.innerText = proc(parseCsv(reader.result));
    });
    reader.readAsText(file);
  }
});
