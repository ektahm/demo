@isTest
private class AnimalLocatorTest {
    @isTest static void AnimalLocatorMock1(){
        try {
            Test.setMock(HttpCalloutMock.class, new AnimalLocatorMock()); 
            String result = AnimalLocator.getAnimalNameById(1);
            String ExpResult = 'Fox';
            System.assertEquals(result, ExpResult);
            //System.assertEquals(200, response.getStatusCode());
        } catch (Exception e) {
            System.debug('the following error has occud:' + e.getMessage());
        }
    }
}