/* 3. Once an Account will update then that Account will update with the total amount from All its Opportunities on the Account Level. The account field name would be ” Total Opp Amount “. - Done
*/
trigger AccountUpdateOppAmount on Account (Before Update) {
   /* set<id> setid = new Set<id>();
    for(Account a : Trigger.new) 
    { 
       setid.add(a.id); 
    }    
    Double  Total_Amount = 0 ;
    List<Opportunity> OppList = [select id , Amount from Opportunity where AccountId IN : setid];
       
    For(Opportunity opp : OppList)
    {
         Total_Amount =  Total_Amount + opp.Amount;
    } 
    for(Account a : Trigger.new) {
        a.Total_Opp_Amount__c = Total_Amount; 
     }  */
}