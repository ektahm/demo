trigger AccountDuplicateTrigger on Account (before insert) 
    {
        Set<String> setName = new Set<String>();
        For(Account acc : trigger.new)
        {
            setName.add(acc.name);
        }
        if(setName.size() > 0 )
        {
            List<Account> acctnew = [select name ,id from account where name in :setName ];
            
            if(acctnew.size() > 0){
                For(Account acc : trigger.new)
                {
                        acc.addError('This Account Name already Exist ');
                }
            }    
        }
    }