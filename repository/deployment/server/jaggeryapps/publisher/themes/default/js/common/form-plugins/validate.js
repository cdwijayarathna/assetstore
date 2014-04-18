$(function () {

	function AssetStoreValidationField() {

    }

    AssetStoreValidationField.prototype.validate = function (element) {
        
        var value = $('#' + element.id).val();
        
        if (element.id == 'overview_version') {
            var arr = value.split(".")
            if(arr.length!=3 ){
                return {msg: 'Field: ' + 'Version is not valid.' };
            }else{
                if(isNaN(arr[0] )|| isNaN(arr[1]) || isNaN(arr[2])){
                    return {msg: 'Field: ' + 'Version is not valid.'};
                }
            }
        } else if(element.id == 'overview_name'){

            if(/^[a-zA-Z0-9- ]*$/.test(value) == false) {
                return {msg: 'Name can not contain Special Characters'};
            }
        }

    };


    FormManager.register('AssetStoreValidationField', AssetStoreValidationField);
});
