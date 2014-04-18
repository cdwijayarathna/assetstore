/**
 * Description:The tag-plugin is used to render the tag cloud and return the selected tags
 *             This plugin has a dependency on the jquery.tokeninput plug-in (and should always be loaded first)
 */
$(function () {

    var DEFAULT_TAG_THEME = 'facebook';
    var ALLOW_FREE_TAG = true;


    function TagPlugin() {
        this.tagContainer = '';
        this.tagUrl = '';
    }

    /**
     * The function initializes the tokenInput plug-in
     * @param element The field which has requested this plugin be applied to it
     */
    TagPlugin.prototype.init = function (element) {
        //TODO: Replace where we get the asset type from
        var val = $('#' + element.id).val();
        
        var type = $('#meta-asset-type').val();
        var limit;
        if(element.id == 'tag-container'){
            this.tagUrl = element.meta.tagApi+type;
            
            limit = null;
        }else if(element.id =='contacts_owner'){
            this.tagUrl = element.meta.tagApi + 'owner'
            limit = 1;
            
        }else if(element.id =='overview_productnames' ){
            this.tagUrl = element.meta.tagApi + 'products';
            limit = null;
        }else if(element.id =='overview_productname'){
            this.tagUrl = element.meta.tagApi + 'products';
            limit = 1;
        }
        else if(element.id =='overview_region'){
            this.tagUrl = element.meta.tagApi + 'region';
            limit = 1;

            
        }else if(element.id =='overview_country'){
            this.tagUrl = element.meta.tagApi + 'country';
            limit = 1;
           
        }else{
            return;
        }
        this.tagContainer = '#' +element.id;

        if (!this.tagUrl) {
            console.log('Unable to locate tag api url');
            return;
        }
        //var lok = new Log();
        console.info("Test Log");
        var arr;
        
        if(val.trim()!=''){
            var tagArray = val.split(',');
            arr = [];
            for ( var i = 0; i < tagArray.length; i++ ) {
                arr.push({id: i, name: tagArray[i]});
                //console.log( "try " + i );
            }
        }
        else{
            arr = null;
        }
        fetchInitTags(this.tagUrl, this.tagContainer,arr,limit);
    };

    /**
     * The method returns the tags selected by the user
     * @param element The element which encapsulates the tag field
     * @returns An array of tags selected by the user
     */
    TagPlugin.prototype.getData = function (element) {
        var data = {};
        var tags=[];
        var selectedTags;
        if(element.id == 'tag-container' || element.id =='contacts_owner' || element.id =='overview_productnames' || element.id =='overview_productname' || element.id =='overview_region' || element.id =='overview_country'){
            selectedTags = $(this.tagContainer).tokenInput('get');

            for (var index in selectedTags) {
                tags.push(selectedTags[index].name);
            }

            data[element.id] = tags;
        }

        return data;
    }

    /**
     * The function calls the tag api to fetch the tag cloud for the current asset type
     * and then initalizes the tokenInput plug-in which is used to render the tag field
     * @param tagUrl  The tag api
     * @param tagContainer The element which is used to render the tag field
     */
    var fetchInitTags = function (tagUrl, tagContainer,tagArray,limit) {

        //Obtain all of the tags for the given asset type
        $.ajax({
            url: tagUrl,
            type: 'GET',
            success: function (response) {
                var tags = JSON.parse(response);
                $(tagContainer).tokenInput(tags, {
                    theme: DEFAULT_TAG_THEME,
                    allowFreeTagging: ALLOW_FREE_TAG,
                    prePopulate: tagArray,
                    tokenLimit: limit
                });

            },
            error: function () {
                console.log('unable to fetch tag cloud for ');
            }
        });
    }

    FormManager.register('TagPlugin', TagPlugin);
});