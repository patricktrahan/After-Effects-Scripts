// Patrick Trahan 2019. A script for setting up a project for keying.

function KeyingSetup() {
    app.beginUndoGroup('Keying Setup');
        
        alert("Choose Foreground");
        //import foreground footage to be keyed 
        app.project.importFileWithDialog();

        //var numProjItems = app.project.numItems;
        //get the properties for the imported file and save them as variables

        for (i = 1; i <= 1; i++) {
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

        //create comp and add imported footage to comp and open in viewer
        var myComp = app.project.items.addComp(myFileName, myFileWidth, myFileHeight, myFilePixelAspect, myFileDuration, 24);
        myComp.layers.add(myFile);
        myComp.openInViewer();
        
        //set up and precompose reduce noise composition
        myComp.layer(1).duplicate();
        myComp.layer(1).Effects.addProperty("Reduce Noise v4 ");
        var myKeyComp = app.project.item(1).layers.precompose([1], "zReduces Noise", true);

        //add keying effects to the redue noise comp layer.
        myComp.layer(1).Effects.addProperty("Keylight (1.2)");
        myComp.layer(1).name = "Key matte";

        //duplicate original layer and alpha matte it to the key layer
        //myComp.layer(2).duplicate();
        //myComp.layer(2).Effects.addProperty("Advanced Spill Suppressor");
        myComp.layer(2).trackMatteType = TrackMatteType.ALPHA;
        myComp.layer(2).name = "Key"

        
        //create adjustment layer and set it as guide layer
        var myAdjustment = app.project.item(1).layers.addSolid([255,255,255], "LUT", myFileWidth, myFileHeight, myFilePixelAspect, myFileDuration);
        myAdjustment.adjustmentLayer = true;
        myAdjustment.guideLayer = true;
        
        alert("Choose LUT");
        //add LUT to adjustment layer
        var myLUT = myAdjustment.property("Effects").addProperty("Apply Color LUT");
        
        //create project folders
        var elements2dFolder = app.project.items.addFolder('2D_Elements');
        var elements3dFolder = app.project.items.addFolder('3D_Elements');
        var compsFolder = app.project.items.addFolder('Comps');
        var qtFolder = app.project.items.addFolder('QT');
        var referenceFolder = app.project.items.addFolder('Reference');
        var rendersFolder = app.project.items.addFolder('Renders');
        
        // move files to parent folders
        myFile.parentFolder = elements2dFolder;
        myComp.parentFolder = compsFolder;
        myKeyComp.parentFolder = compsFolder;
        
         alert("Choose BG");
        //import foreground footage to be keyed 
        app.project.importFileWithDialog();
        var myBG = app.project.activeItem
        var myComp = app.project.item(5);
        myComp.layers.add(myBG);
        myComp.layer(1).moveToEnd();
        myComp.layer(4).name = "BG";
        myBG.parentFolder = elements2dFolder;

    app.endUndoGroup();
}

KeyingSetup();


//asks the user to save the project
app.project.saveWithDialog();
