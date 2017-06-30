function FormUtils(){
	
	/**
	 * 建立表单
	 * @returns {___submitForm0}
	 */
	this.getNewSubmitForm = function(actionUrl){
		var submitForm = document.createElement("FORM");
		document.body.appendChild(submitForm);
		submitForm.method = "POST";
		submitForm.action= actionUrl;
		return submitForm;
	}
	
	/**
	 * 建立元素
	 * 
	 * @param inputForm
	 *            表单兑现
	 * @param elementName
	 *            元素名
	 * @param elementValue
	 *            元素值
	 * @returns {___newElement1}
	 */
	this.createNewFormElement = function(inputForm, elementName, elementValue){
		var newElement = document.createElement("INPUT");
		newElement.value = elementValue;
		newElement.name = elementName;
		newElement.type = "hidden";
		inputForm.appendChild(newElement);
//		return newElement;
	}
}
/**
 * 动态表单工具类对象
 */
var formUtil = new FormUtils();
