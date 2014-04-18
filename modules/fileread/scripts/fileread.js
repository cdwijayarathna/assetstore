 var carbon = require('carbon');
 var PRODUCT_LIST = 'product.list';
 var getList = function() {
     var log = new Log('product-list');
     var productList = application.get(PRODUCT_LIST);
     //Determine if the product list has been cached
     if (!productList) {
         var path = carbon.server.home + '/modules/fileread/scripts/products.txt';
         var file = new File(path);
         productList='';
         try {
             file.open("r");
             var contents = file.readAll();
             application.put(PRODUCT_LIST, contents);
             productList=contents;
         } catch (e) {
             log.err('Unable to read product list at path: ' + path);
         } finally {
             file.close();
             log.debug('Closing file: ' + path);
         }
     }
     return productList;
 };