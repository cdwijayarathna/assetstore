Assetstore
==========

##Running the Asset Store
Download the Enterprise Store source from the following link - https://github.com/cdwijayarathna/enterprise-store and build it.
Get the built pack and extract it in location you want to run this. Replace the ESHOME/modules folder, ESHOME/repository/resources/rxts folder, ESHome/repository/deployment/server/jaggeryapps/publisher folder and ESHome/repository/deployment/server/jaggeryapps/store folder from folders you get from this repository. 

Go to this link - https://github.com/cdwijayarathna/assetstoreemailhandler clone the repository, build it using mvn clean install copy the org.wso2.carbon.registry.samples.handler-4.6.0.jar file that generates in target folder. Copy it to ESHome/repository/components/droppings folder.

Edit the content in repository/conf/user-mgt.xml with relevent user store configurations and the mailto element in repository/conf/axis2/axis2.xml file with relevent email sender configurations. 

Navigate to ESHome/bin and run the product(using sh wso2server.sh)

##Adding reviewers
Go to management console. Refer the location Home>Configure>Users and Roles>Roles and click on Add New Internal Role. Create Reviewers for each asset type. Role names will be presentationreviewer, graphicreviewer, demoreviewer, analystreportreviewer, productlogoreviewer.

##Adding users to reviewer role
Click on the Assign Users link on the required role you want to add user(s) and tick the usernames you want and update it. Select the Asset type you need to add reviewer from Home>Resources>Browse /system/governance(Eg. Home>Resources>Browse /system/governance/presentations), Click on Subscriptions and change the following - 

Event - Change LC State
NOtification - Email
Email - Reviewer's email Address
Frequency - None
Hierarchical Subscription Method - Collection, Children and Grand Children


The added users will get an email notification saying that they have been added to the reviewer role. They need to confirm it by clicking on the link in that mail. Please note that they need to log in to the management colsole before they click the link. 
