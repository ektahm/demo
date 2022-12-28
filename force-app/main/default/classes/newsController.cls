public with sharing class newsController {
    @AuraEnabled
    
    public static Map<String, Object> retrivenews(){
        HttpRequest HttpRequest = new HttpRequest();
        httprequest.setEndpoint('https://newsapi.org/v2/top-headlines?country=in&apiKey=cb24b85b28c34045824adb261a4ea20e');
        httprequest.setMethod('GET');

        Map<String , Object> newsJsonData = new Map<String , Object>();
        String strResponse = null;

        try {
            Http http = new Http();
            HttpResponse httpresponse = http.send(httprequest);

            if(httpresponse.getStatusCode() == 200){
                strResponse = httpresponse.getBody();
            } else {
                throw new calloutException(httpresponse.getBody());
            }
        } catch (Exception ex) {
            throw ex;
        }

        if(!string.isBlank(strResponse)){
            newsJsonData = (Map<String , Object>)JSON.deserializeUntyped(strResponse);
        }
        if(!newsJsonData.isEmpty()){
            return newsJsonData;
        } else {
            return null;
        }
    }
}
