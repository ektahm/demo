/* 7. When ever Lead is created with LeadSource as Web then give rating as cold otherwise hot. - Done
*/
trigger LeadWithHotCold on Lead (before insert) {
    for(Lead l : Trigger.new) {
        If(l.LeadSource == 'web'){
            l.Rating = 'Cold';
        }
        else 
        {
            l.Rating = 'Hot';
        }    
    }    
}