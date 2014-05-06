Assetstore
==========

##Running the Asset Store
Download the Enterprise Store source from the following link - https://github.com/cdwijayarathna/enterprise-store and build it.
Get the built pack and extract it in location you want to run this. Replace the ESHOME/modules folder, ESHOME/repository/resources/rxts folder, ESHome/repository/deployment/server/jaggeryapps/publisher folder and ESHome/repository/deployment/server/jaggeryapps/store folder from folders you get from this repository. 

Go to this link - https://github.com/cdwijayarathna/assetstoreemailhandler clone the repository, build it using mvn clean install copy the org.wso2.carbon.registry.samples.handler-4.6.0.jar file that generates in target folder. Copy it to ESHome/repository/components/droppings folder.

Edit the content in repository/conf/user-mgt.xml with relevent user store configurations and the mailto element in repository/conf/axis2/axis2.xml file with relevent email sender configurations. 

Replace “localhost” in “AssertionConsumerService” elements at repository/conf/sso-idp-config.xml with ip-address of running server.
eg - :

<SSOIdentityProviderConfig>
    <TenantRegistrationPage>https://stratos-local.wso2.com/carbon/tenant-register/select_domain.jsp</TenantRegistrationPage>
    <ServiceProviders>
        <ServiceProvider>
            <Issuer>store</Issuer>
            <AssertionConsumerService>https://192.168.3.33:9443/store/acs</AssertionConsumerService>
            <SignResponse>true</SignResponse>
            <CustomLoginPage>/store/login.jag</CustomLoginPage>
        </ServiceProvider>
        <ServiceProvider>
            <Issuer>social</Issuer>
            <AssertionConsumerService>https://192.168.3.33:9443/social/acs</AssertionConsumerService>
            <SignResponse>true</SignResponse>
            <CustomLoginPage>/social/login</CustomLoginPage>
        </ServiceProvider>
        <ServiceProvider>
            <Issuer>publisher</Issuer>
            <AssertionConsumerService>https://192.168.3.33:9443/publisher/acs</AssertionConsumerService>
            <SignResponse>true</SignResponse>
            <CustomLoginPage>/publisher/controllers/login.jag</CustomLoginPage>
        </ServiceProvider>
    </ServiceProviders>
</SSOIdentityProviderConfig>

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

##Adding Products to give Suggestions
When adding assets like presentation, the application it self provides suggestion when you start typing in Product Name field, when you need to update the product go to ESHome/modules/fileread/scripts/products.txt and update the document. Restart the Server. 

##User Guide
Same user guide for WSO2 Enterprise Store which is available at https://docs.wso2.org/display/ES100/User+Guide will apply for asset store also. 
Other than that,asset store only supports asset version which has x.y.z where x,y,z are integers.
This supports 3 types of email notifications.
1. A reviewer will receive a notification when new asset comes to "In_Review" state.
2. Asset owner will receive a notification if his asset is rejected by reviewer.
3. After a user downloaded an asset, he will receive email notifications on new versions of assets published on that asset
To work 2 and 3, your user store need to have an email attribute connected to users.

##How to Contribute
Please report any issues you find or any suggestions to improvement as issues in this repository.
