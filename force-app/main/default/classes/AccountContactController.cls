public with sharing class AccountContactController {
    @AuraEnabled(cacheable = true)
    public static List<Account> getContacts(){
        return [SELECT Id, Name,  Phone FROM Account
        Where Phone != '' Order by Name DESC limit 10];
    }
    //Fetch all related Contact 
    @AuraEnabled(cacheable = true)
    public static List<Contact> getCases(String accountId){
        List<Contact> lstCase = new List<Contact>();
        if(accountId != null){
            lstCase = [Select id, AccountId, LastName , FirstName ,Account.name   from Contact Where AccountId =: accountId];
        }	
        return lstCase;
    }   
     //Fetch all related Oppertunity 
    @AuraEnabled(cacheable = true)
    public static List<Opportunity> getOpps(String accountId){
        List<Opportunity> lstopp = new List<Opportunity>();
        if(accountId != null){
            lstopp = [Select id, AccountId, Name , Type ,Account.name   from Opportunity Where AccountId =: accountId];
        }	
        return lstopp;
    }   
    @AuraEnabled(cacheable = true)
    public static list<Account> getAccountData(String textkey) {
        textkey = '%' + textkey + '%';

        list<Account> accLst = [SELECT  Id, Name, Industry, Phone, Type From Account WHERE Name LIKE :textkey];
        
        if(accLst.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return accLst; 
    }


    @AuraEnabled
    public static List<Account> deleteAccount(String accId){
        System.debug('accId '+ accId);
        Account acc = new Account(id= accId);
        delete acc;
        System.debug('acc'+ acc);
        return null;
    }
}