let router = require('express').Router();
const Rendeview = require('../rendeview.js');
const Rendeview2 = require('../rendeview2.js');

// router.post('/results', function(req, res) {
//     var locationTextField = req.body.location;
//     var test = new Rendeview(locationTextField);
//     var coordinates = [];
//     test.exportCoordinates().then(exportData=>{
//         coordinates = exportData;
//         console.log(coordinates);
//         res.render('results',{data:req.body, 
//                               centerpointLat:coordinates[0],
//                               centerpointLng:coordinates[1]
//                             });
//     })
// })

router.post('/results', async(req,res)=>{
    var locationTextField = req.body.location;
    locationTextField=locationTextField.filter(location=>location);
    locationTextField=locationTextField.map(location=>location.trim());
    console.log(req.body);
    var test = new Rendeview2(locationTextField);
    let apiData=await test.exportCoordinates();
    centerpoint=apiData.centerpointCoordinates;
    res.locals.loc=apiData.locationCoordinates;
    res.render('results',{
        data:req.body,
        centerpoint,
         })
})

router.get('/test',async(req,res)=>{
    let places=['place1','place2'];
    let location={location:places};
    res.locals.loc=[[34.0381785,-84.5826712],[38.7501833,-77.4505874]];
    let centerpoint=[36.3941809,-81.0166293];
    res.render('results',{data:location,centerpoint});
})
module.exports=router;
