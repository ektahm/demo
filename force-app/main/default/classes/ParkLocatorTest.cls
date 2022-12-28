

@isTest
private class ParkLocatorTest {
   
        @isTest static void testCallout() {              
            // This causes a fake response to be generated
            Test.setMock(WebServiceMock.class, new ParkServiceMock());
            
            String Country = 'United State';
            List<String> result = ParkLocator.Country(Country);
            List<String> parks = new list<string>{'yellowStone','National Park'};
            // Verify that a fake result is returned
            System.assertEquals(parks, result); 
        }
    
}
