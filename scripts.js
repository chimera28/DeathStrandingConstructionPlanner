



var testcool = "<div class='mat-block test'>123</div>";
var cargos = [0,0,0,0]; //S,M,L,XL
var cargosS = ["S","M","L","XL"];
var weights = 0;
var cargoString = "</br>";
var materials = [[],[],[]]; //materials, value,weight,size select, packs variation 
//Resins
materials[0][0] = [40, 80, 160, 320, 480, 640, 800]; //value
materials[0][1] = [1, 2, 3, 4, 5, 6, 7] //Weights
materials[0][2] = [0, 0, 1, 2, 2, 3, 3] //Sizes
//Resins 1
materials[1][0] = [40, 80, 160, 320, 480, 640, 800]; //value
materials[1][1] = [1, 2, 3, 4, 5, 6, 7] //Weights
materials[1][2] = [0, 0, 1, 2, 2, 3, 3] //Sizes
//Resins 2
materials[2][0] = [40, 80, 160, 320, 480, 640, 800]; //value
materials[2][1] = [1, 2, 3, 4, 5, 6, 7] //Weights
materials[2][2] = [0, 0, 1, 2, 2, 3, 3] //Sizes

var MaterialsPacksNeeded = [[],[]]; //material, packs variation

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function updateForm() {
  $(document).ready(function(){
    //console.clear();
    cargos = [0,0,0,0]; //S,M,L,XL
    weights = 0;
    
    //document.getElementById("Rpn").innerHTML = materials[0][0].length;
    for (let s = 0; s < nStructures; s++){ // FOr Every Structures
      for (let m = 0; m < materials.length; m++){ // For Every Materials
    
        MaterialsPacksNeeded[m] = [0]; //reset material packs
        let ids = "#s"+s+" .Rm" + m;     //needed material input
        let pids = "#s"+s+" .Rmp" + m;   //required number of material packs
        let tids = "#s"+s+" .Rmt" + m;   //total of required materials
        var MaterialsNeeded = $(ids).val(); //Needed
        var n = MaterialsNeeded;
          for (let i = materials[m][0].length-1; i >= 0; i--){ //count for each packs variation for current materials
            
            if (i==0){
              MaterialsPacksNeeded[m][i] = Math.ceil(n / materials[m][0][0]);
            }else{
              MaterialsPacksNeeded[m][i] = Math.floor(n / materials[m][0][i]);
            }
            n -= MaterialsPacksNeeded[m][i]*materials[m][0][i];
        }
  
        $(pids).text(MaterialsPacksNeeded[m]);  //report required packs for current material
        
        //checker
        var t = 0;
        for (let i = 0; i < materials[m][0].length; i++){
          t += MaterialsPacksNeeded[m][i]*materials[m][0][i];
        }
  
        $(tids).text(t); //report totals of current material required
        
        for (let i = 0; i < MaterialsPacksNeeded[m].length; i++){
  
          cargos[materials[m][2][i]] += MaterialsPacksNeeded[m][i];
          weights += materials[m][1][i]*MaterialsPacksNeeded[m][i];
          let packsIndex = "#r"+s+" .index"+m+" .m"+i;
          let packsIndexL = $(packsIndex).length;
          var packsDiv = '<div class="mat-block m'+i +'">' ;
          var packsVal = '<span>x'+MaterialsPacksNeeded[m][i]+'</span>';
          console.log("M"+m+" I"+i+"needed: "+MaterialsPacksNeeded[m][i]);
          if (MaterialsPacksNeeded[m][i]>0){ //if needed >0
            
            console.log("M"+m+" I"+i+" Blocks Found "+packsIndexL);
            if (packsIndexL>0){
              console.log("Applying!");
              $(packsIndex).html(materials[m][0][i] + packsVal);
            }else{
              /* ! 
              loop checks if packs from smaller to 0, stop when none smaller exist
              create new after
              else
              create new
                */
              let f1 = false;
              for (let mi = i-1; mi >= 0; mi--){
                if ($("#r"+s+" .index"+m+" .m"+mi).length > 0){
                  $("#r"+s+" .index"+m+" .m"+mi).after(packsDiv + materials[m][0][i] + packsVal +"</div>");
                  f1 = true;
                  console.log("Inserting!");
                  break;
                }
              }
              if (f1 == false){
                // let ss= "#index"+m;
                // let sss ='rr' + packsDiv + materials[m][0][i] + packsVal +'sd</div>';
                // console.log(sss);
                //$(ss).append("asdasdasf");
                $("#r"+s+" .index"+m).append(packsDiv + materials[m][0][i] + packsVal +'</div>');
                console.log("Creating!");
              }
              
            }
          }else if(packsIndexL>0){ //0 and less and html present
              $(packsIndex).remove();
              console.log("Removing!");
            
          }
          
        }
  
      }
  
      cargoString = cargos+ "</br>";
      for (let i = 0; i < cargos.length; i++){
        if (cargos[i]>0){
          cargoString += cargos[i] + "x" + cargosS[i] + ", ";
        }
      }
      $("#s"+s+" .Cst").html(cargoString);
      $("#s"+s+" .Cwt").html(weights + "kgs");
      
    }

    
  }); 
}

var gsu = 0; //global,screen update
var xx=0;
var yy=0;
var xxx=0;//realitve from centre
var yyy=0;
var rx=0;
var ry=0;
window.onload = function(){ 
  // your code 

document.getElementsByTagName("HTML")[0].onmousemove = function(event) {myFunction(event)};

function myFunction(e){
  
  xx=e.clientX;
  yy=e.clientY;
  
  xxx=xx-(innerWidth/2);
  yyy=yy-(innerHeight/2);
  let coor = "X= " + xx + "Y= " +yy +"</br>"+"Xr= " + xxx + "Yr= " +yyy;
  document.getElementById("dbg").innerHTML = coor;

}

};

  //add structures
var formHTML = "";
var resultHTML="";
var nStructures=1;

var enableParralax = true;
$(document).ready(function(e){
  formHTML = $(".istructure:first").html();
  resultHTML = $(".iresult:first").html();
  //test
  $("#add").click(function(){
    $(".cstructures").append('<div class="istructure" id= "s'+ nStructures +'">' + formHTML + '</div>');
    $(".cresults").append('<div class="iresult" id= "r'+ nStructures +'">' + resultHTML + '</div>');
    $(".istructure:last .Sn").text("Structure "+nStructures);
    $(".iresult:last .Sn").text("Structure "+nStructures);
    nStructures++;
  });
  $("#sub").click(function(){
    if (nStructures>1){
      $(".istructure:last").remove();
      $(".iresult:last").remove();
      nStructures--;
    }
    
  });




  $("body").mousemove(function (e) {
    if (enableParralax) {
      // values: e.clientX, e.clientY, e.pageX, e.pageY
      let factor = 12;
      rx=(xxx/(innerWidth/2));
      ry=(yyy/(innerHeight/2));
      $(".container").css("transform", "rotateY("+(rx*factor)+"deg) rotateX("+((ry*factor)*-1)+"deg)");
      $(".tcontent").each(function(f){
        $(this).css("transform", "translateX("+(rx*factor)+"px) translateY("+(ry*factor)+"px)");
        
      });
    }
  });

  //transform
  $("body").keypress(function(){
    
    // if (gsu>3){
    //   rx=(xxx/(innerWidth/2));
    //   ry=(yyy/(innerHeight/2));
    //   $(".container").css("transform", "rotateY("+(rx*20)+"deg) rotateX("+((ry*20)*-1)+"deg)");
    //   $(".tcontent").each(function(f){
    //     $(this).css("transform", "translateX("+(rx*20)+"px) translateY("+(ry*20)+"px)");
        
    //   });
      
    // }else{
    //   gsu++;
    // }
  });

  $("body").keyup(function(event){

    if (event.keyCode == 32) {
      enableParralax = !enableParralax;
    }

    $(".container").css("transform", "none");
    $(".tcontent").each(function(f){
      $(this).css("transform", "none");
      
    });
    gsu=0;

  });

});

