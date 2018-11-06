test-template.js


ddescribe("Jasmine template for Sugar 7 views", function () {

 var moduleName = 'Accounts';    
 var viewName = "CHANGE_ME";     
 var layoutName = "record-list"; 

 
 var app;
 var view;
 var layout;

 
 beforeEach(function() {

        app = SugarTest.app;

 SugarTest.testMetadata.init();


 SugarTest.loadCustomHandlebarsTemplate(viewName, 'view', 'base' );
 
 SugarTest.loadCustomComponent('base', 'view', viewName );


 
 SugarTest.testMetadata.addViewDefinition(
            viewName,
 ADATA HERE
            {
 'panels': [
                    {
                        fields: []
                    }
                ]
            },
            moduleName
        );
 //Commit custom metadata into Sidecar
 SugarTest.testMetadata.set();

 //Mock the Sidecar context object
 var context = app.context.getContext();
 context.set({
            module: moduleName,
            layout: layoutName
        });
 context.prepare();

 //Create parent layout for our view using fake context
        layout = app.view.createLayout({
            name: layoutName,
            context: context
        });

 //Create our View before each test

        view = app.view.createView({
            name : viewName,
            context : context,
            module : moduleName,
            layout: layout,
            platform: 'base'
        });

    });

 /**
     * Perform cleanup after each test.
 */
 afterEach(function() {
 //Delete test metadata
 SugarTest.testMetadata.dispose();
 //Delete list of declared components
 app.view.reset();
 //Dispose of our view
 view.dispose();
    });


 /**
     * Make sure that our view object exists
 */
 it('should exist.', function() {
 expect(view).toBeTruthy();
    });

 

});

