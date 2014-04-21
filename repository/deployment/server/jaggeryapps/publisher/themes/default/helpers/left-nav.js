var getTypeObj, breadcrumbItems;
var deploymentManagement=require('/modules/deployment/deployment.manager.js').deploymentManagementModule();
var deploymentManager=deploymentManagement.cached();

breadcrumbItems = deploymentManager.getAssetData();
var log = new Log();
var generateLeftNavJson = function(data, listPartial) {

    var currentTypeObj = getTypeObj(data.shortName);
    var leftNavItems = { leftNavLinks :
        [
           /*
            {
                           name : "Browse All",
                           additionalClasses : "prominent-link",
                           url : "/publisher/assets/" + data.shortName + "/"
                       },*/
           
            {
                name : "Add " + data.rxtTemplate.singularLabel + "",
                iconClass : "icon-plus-sign-alt",
                additionalClasses : (listPartial == "add-asset" ) ? "prominent-link" : null,
                url : "/publisher/asset/" + data.shortName + ""
            },
            {
                name: "Statistics",
                iconClass: "icon-dashboard",
                additionalClasses : (listPartial == "statistics" ) ? "prominent-link" : null,
                url: "/publisher/assets/statistics/" + data.shortName + "/"
            }
        ]
    };
    if(data.artifact){
        var lifeCycleStatus = parse(stringify(data.artifact.lifecycleState)).toUpperCase();
        switch(lifeCycleStatus){
            case "IN-REVIEW":
                leftNavItems = { leftNavLinks :
                    [
                        /*
                         {
                         name : "Browse All",
                         additionalClasses : "prominent-link",
                         url : "/publisher/assets/" + data.shortName + "/"
                         },*/

                        {
                            name : "Overview",
                            iconClass : "icon-list-alt",
                            additionalClasses : (listPartial == "view-asset" ) ? "prominent-link" : null,
                            url : "/publisher/asset/operations/view/" + data.shortName + "/" + data.artifact.id + ""
                        },
                        {
                            name : "Life Cycle",
                            iconClass : "icon-retweet",
                            additionalClasses : (listPartial == "lifecycle-asset" ) ? "prominent-link" : null,
                            url : "/publisher/asset/operations/lifecycle/" + data.shortName + "/" + data.artifact.id + ""
                        }
                    ]
                };
                break;
            case "PUBLISHED":
                leftNavItems = { leftNavLinks :
                    [
                        /*
                         {
                         name : "Browse All",
                         additionalClasses : "prominent-link",
                         url : "/publisher/assets/" + data.shortName + "/"
                         },*/

                        {
                            name : "Overview",
                            iconClass : "icon-list-alt",
                            additionalClasses : (listPartial == "view-asset" ) ? "prominent-link" : null,
                            url : "/publisher/asset/operations/view/" + data.shortName + "/" + data.artifact.id + ""
                        },
                        {
                            name : "Life Cycle",
                            iconClass : "icon-retweet",
                            additionalClasses : (listPartial == "lifecycle-asset" ) ? "prominent-link" : null,
                            url : "/publisher/asset/operations/lifecycle/" + data.shortName + "/" + data.artifact.id + ""
                        }
                    ]
                };
                break;

            default:
                   leftNavItems = { leftNavLinks :
                    [
                        /*
                         {
                         name : "Browse All",
                         additionalClasses : "prominent-link",
                         url : "/publisher/assets/" + data.shortName + "/"
                         },*/

                        {
                            name : "Overview",
                            iconClass : "icon-list-alt",
                            additionalClasses : (listPartial == "view-asset" ) ? "prominent-link" : null,
                            url : "/publisher/asset/operations/view/" + data.shortName + "/" + data.artifact.id + ""
                        },
                        {
                            name : "Edit",
                            iconClass : "icon-edit",
                            additionalClasses : (listPartial == "edit-asset" ) ? "prominent-link" : null,
                            url : "/publisher/asset/operations/edit/" + data.shortName + "/" + data.artifact.id + ""
                        },
                        {
                            name : "Life Cycle",
                            iconClass : "icon-retweet",
                            additionalClasses : (listPartial == "lifecycle-asset" ) ? "prominent-link" : null,
                            url : "/publisher/asset/operations/lifecycle/" + data.shortName + "/" + data.artifact.id + ""
                        }
                    ]
                };
                break;
        }
    }
    return leftNavItems;
};

getTypeObj = function(type){
    for(item in breadcrumbItems){
        var obj = breadcrumbItems[item]
        if(obj.assetType == type){
            return obj;
        }
    }
}