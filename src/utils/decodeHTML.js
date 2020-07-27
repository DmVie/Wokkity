import { text } from "@fortawesome/fontawesome-svg-core";

const decodeHTML = function (html) {
	const txt = document.createElement('textarea');
  txt.innerHTML = html;
  console.log(typeof txt.value)
	return txt.value;
};


export default decodeHTML;