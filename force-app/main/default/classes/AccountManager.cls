@RestResource(urlMapping='/Accounts/*/contacts')
global with sharing class AccountManager{
    @HttpGet
    global static Account getAccount() {
        RestRequest request = RestContext.request;
        // grab the caseId from the end of the URL
        String AcctId = request.requestURI.substringBetween('Accounts/','/contacts');
        Account result =  [SELECT Id,Name,(SELECT Id,Name FROM contacts)
                        FROM Account
                        WHERE Id = :AcctId LIMIT 1];
        return result;
    }
   
}
