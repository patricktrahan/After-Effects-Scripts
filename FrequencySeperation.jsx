//Patrick Trahan 2019. Frequency seperation. used for smoothing skin tones. User must have a layer added to the active composition. Layer will be duplicated to create a frequency seperation used for smoothing skin.

function FrequencySeperation () {
    try 
        {
        app.beginUndoGroup('FreqSep');
            
            var sourceLayer = app.project.activeItem.layer(1)
            var loFreq = sourceLayer.duplicate();
            var hiFreq = loFreq.duplicate();
            
            loFreq.name = "loFreq";
            hiFreq.name = "hiFreq";
            
            loFreq.Effects.addProperty("Fast Box Blur");
            loFreq.Effects("Fast Box Blur")("Blur Radius").setValue(15);
            loFreq.Effects("Fast Box Blur")("Repeat Edge Pixels").setValue(true);
            
     
            hiFreq.Effects.addProperty("Fast Box Blur");
            hiFreq.Effects("Fast Box Blur")("Blur Radius").setValue(5);
            loFreq.Effects("Fast Box Blur")("Repeat Edge Pixels").setValue(true);
            hiFreq.Effects.addProperty("Invert");
            hiFreq.Effects.addProperty("CC Composite");
            hiFreq.Effects("CC Composite")("Opacity").setValue(50);
            
            hiFreq.blendingMode = BlendingMode.LINEAR_LIGHT;
            
        app.endUndoGroup();
        }
    catch (myError)
        {
        alert("Add source layer to selected composition.");
    }
}

FrequencySeperation();
