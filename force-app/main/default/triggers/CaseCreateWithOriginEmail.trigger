/*When ever a case is created with origin as email then set status as new and Priority as Medium. (edited) */
trigger CaseCreateWithOriginEmail on Case (Before insert) {
    For(Case c : Trigger.new){
        If(c.Origin ==  'Email'){
            c.Priority = 'High';
            c.Status = 'New';
        }
       
    }
}