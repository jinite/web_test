function cntRegion(obj){
	let curRegion = "";
	let cnt = 0;
	for(let i = 0; i < obj.length; i++){
		let item = obj[i];
		if(curRegion !== item[0]){
			curRegion = item[0];
			cnt++;
		}
	}
	return cnt;
}

function getElement(item, index){
	let cnt = 0;
	for(let i = 0; i < item.length ; i++){
		if(item[i] !== ""){
			if(cnt === index){
				return item[i];
			}
			cnt++;
		}
	}
}

function proc(obj, tag){
	let str = "";
	let arr = [];
	let curRegion = "";
	const numRegion = cntRegion(obj);
	let cnt = 0;
	arr[arr.length] = "「" + tag + "」";
	let spch = ["├　", "│　├　", "│　└　", "（", "）"];
	for(let i = 0; i < obj.length; i++){
		let item = obj[i];
		if(curRegion !== getElement(item, 0)){
			curRegion = getElement(item, 0);
			cnt++;
			if(cnt == numRegion){
				spch = ["└　", "　　├　", "　　└　", "（", "）"];
			}
			arr[arr.length] = spch[0] + curRegion;
			if(obj.length-1 == i || obj[i+1][0] !== curRegion){
				arr[arr.length] = spch[2] + getElement(item, 1) + spch[3] + getElement(item, 2) + spch[4];
			}else{
				arr[arr.length] = spch[1] + getElement(item, 1) + spch[3] + getElement(item, 2) + spch[4];
			}
		}else{
			if(obj.length-1 == i || obj[i+1][0] !== curRegion){
				arr[arr.length] = spch[2] + getElement(item, 1) + spch[3] + getElement(item, 2) + spch[4];
			}else{
				arr[arr.length] = spch[1] + getElement(item, 1) + spch[3] + getElement(item, 2) + spch[4];
			}
		}
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

fileInput.accept = ".csv";

fileInput.addEventListener("change", () => {
  const [file] = fileInput.files;
  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
	output.innerText = proc(parseCsv(reader.result), (file.name).substr(0, (file.name).length - 4));
    });
    reader.readAsText(file);
  }
});