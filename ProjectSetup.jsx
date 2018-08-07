//Create Folders
var elements2dFolder = app.project.items.addFolder('2D_Elements');
var elements3dFolder = app.project.items.addFolder('3D_Elements');
var compsFolder = app.project.items.addFolder('Comps');
var qtFolder = app.project.items.addFolder('QT');
var referenceFolder = app.project.items.addFolder('Reference');
var rendersFolder = app.project.items.addFolder('Renders');
var scansFolder = app.project.items.addFolder('Scans');

//myFile varialbes
var myFile;
var myFileName;
var myFileWidth;
var myFileHeight;
var myFileDuration;
var myFilePixelAspect;

app.activate();

//import settings
var myImportOptions = new ImportOptions;
myImportOptions.sequence = true;  
    
//file import
alert('Import footage.');
    
if (app.project.importFileWithDialog()) {
    //moves imported footage to the scans folder
     app.project.activeItem.parentFolder = scansFolder;
        
    var numProjItems = app.project.numItems;
        
    //get myFile properties
    for (i = 1; i <= numProjItems; i++) {
        if(app.project.item(i) instanceof FootageItem) {
            myFile = app.project.item(i);
            myFileName = app.project.item(i).name;
            myFileWidth = app.project.item(i).width;
            myFileHeight = app.project.item(i).height;
            myFileDuration = app.project.item(i).duration;
            myFilePixelAspect = app.project.item(i).pixelAspect;
            break;
       }
    }
    //sets the imported sequence's frame rate to 24
    myFile.mainSource.conformFrameRate = 24;
}

//create comp and move to comps folder
var myComp = app.project.items.addComp(myFileName, myFileWidth, myFileHeight, myFilePixelAspect, myFileDuration, 24);
myComp.parentFolder = compsFolder;
    
//add imported footage to composition
myComp.layers.add(myFile);
    
//setup adjustment layers
var myAdjustment = myComp.layers.addSolid([1,1,1], 'LUT', myFileWidth, myFileHeight, myFilePixelAspect, myFileDuration);
myAdjustment.adjustmentLayer = true;
myAdjustment.guideLayer = true;
    
//add LUT layer and apply LUT
var myLut = myAdjustment.property('Effects').addProperty('Apply Color LUT');
myLut = File('/Volumes/ripley/GreenBook/01_Charts_Projects/ae_export.3dl')
    
//open comp in viewer
myComp.openInViewer();
