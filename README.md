assetstore
==========

##Running the Asset Store
Download the Enterprise Store source from the following link - https://github.com/cdwijayarathna/enterprise-store and build it.
Get the built pack and extract it in location you want to run this. Replace the ESHOME/modules folder, ESHOME/repository/resources/rxts folder, ESHome/repository/deployment/server/jaggeryapps/publisher folder and ESHome/repository/deployment/server/jaggeryapps/store folder from folders you get from this repository. 

Go to this link - https://github.com/cdwijayarathna/assetstoreemailhandler clone the repository, build it using mvn clean install copy the org.wso2.carbon.registry.samples.handler-4.6.0.jar file that generates in target folder. Copy it to ESHome/repository/components/droppings folder.

Edit the content in repository/conf/user-mgt.xml with relevent user store configurations and the mailto element in repository/conf/axis2/axis2.xml file with relevent email sender configurations. 

Navigate to ESHome/bin and run the product(using sh wso2server.sh)
