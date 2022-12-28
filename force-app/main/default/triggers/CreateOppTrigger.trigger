trigger CreateOppTrigger on Opportunity (after insert) {
    for (Opportunity opp : trigger.new) {
        if (opp.amount > 40000) {
            Task t = new Task(WhatId = opp.Id , 
                              Priority = 'Normal' , 
                              Status = 'In Progress' ,
                              Subject = 'Email' ,
                              Description = 'A big deal opportunity has been created',
                              OwnerId = opp.OwnerId);
                            
            Insert t;  
            
            If (t != Null) {
                FeedItem post = new FeedItem();
                post.ParentId = opp.Id; // RecordId
                post.Body = t.Description ;
            
                insert post;
            }   
            

           
        }
    }
}