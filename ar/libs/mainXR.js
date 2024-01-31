///////////////////////////// variables /////////////////////////////////////////

//variables para control de experiencia, al reinciar experiencia los reseteo a estos valores
var scene = document.getElementById("scene");
var sceneLoaded = false;
var current360 = 0;
var motiongranted = false;
var pic_360_1 = document.getElementById("innenhof_1")
var pic_360_2 = document.getElementById("speisesaal_2")
var pic_360_3 = document.getElementById("vorraum_3")
var pic_360_4 = document.getElementById("kapelle_4")
var pic_360_5 = document.getElementById("bibliothek_5")
var pic_360_6 = document.getElementById("vestibuhl_6")
var pic_360_7 = document.getElementById("sudrondell_7")
var pic_360_8 = document.getElementById("holzbrucke_8")
var click_allowed = true;
var hover_allowed = true;
var sky = document.getElementById("sky")
var castle = document.getElementById("castle")
var camera = document.getElementById("camera")

AFRAME.registerComponent('scenestart', {
  schema: {
      devMode: {type: 'boolean', default: false},
  },
  init() {
      const scene1 = this.el;
      console.log(this.data.devMode);
      if(this.data.devMode)
      {
          
      }
      if(!this.data.devMode)
      {
          this.el.addEventListener("loaded", () => 
          {
          console.log ("a-frame loaded");
          sceneLoaded = true;
          if(getMobileOperatingSystem3() != 1)
          {
            //document.getElementById("tags").setAttribute("position","0 0.6 -0.948")
            arbtn.setAttribute("visible","false")
            arbtn.classList.remove("clickable");
            castle.setAttribute("scale","1.5 1.5 1.5")
          }
          
          });
      }
  }
});

//funciones para crear materiales de sombras sobre el camera feed
AFRAME.registerComponent("apply-shadowmaterial", {
  init: function() {
    // grab the mesh
    let mesh = this.el.getObject3D("mesh");
    // keep the reference to the old material
    let tmp = mesh.material;
    // assign the new material
    mesh.material = new THREE.ShadowMaterial({ opacity: 0.2 });
    mesh.receiveShadow = true;
    // free memory
    tmp.dispose();
  }
});
AFRAME.registerComponent("apply-shadowmateriallow", {
  init: function() {
    // grab the mesh
    let mesh = this.el.getObject3D("mesh");
    // keep the reference to the old material
    let tmp = mesh.material;
    // assign the new material
    mesh.material = new THREE.ShadowMaterial({ opacity: 0.05 });
    mesh.receiveShadow = true;
    // free memory
    tmp.dispose();
  }
});

AFRAME.registerComponent('action-on-hover', {
  schema: {
    room: {default: '0'}
  },

  init: function () {
    var room = this.data.room;
    var el = this.el;

    el.addEventListener('mouseenter', function () {
      if(hover_allowed)
      {
      el.setAttribute("material","color:#155cab;")
      document.getElementById("tag_"+room).setAttribute("visible","true")
      }
    });

    el.addEventListener('mouseleave', function () {
      if(hover_allowed)
      {
      el.setAttribute("material","color:white;")
      document.getElementById("tag_"+room).setAttribute("visible","false")
      }
    });
  }
});

AFRAME.registerComponent('action-on-hover-home', {
  
  init: function () {
    var el = this.el;

    el.addEventListener('mouseenter', function () {
      if(hover_allowed)
      {
      el.setAttribute("src","#home2_2d")
      }
    });

    el.addEventListener('mouseleave', function () {
        el.setAttribute("src","#home_2d")
    });
  }
});
AFRAME.registerComponent('action-on-hover-ar', {
  
  init: function () {
    var el = this.el;

    el.addEventListener('mouseenter', function () {
      if(hover_allowed)
      {
      el.setAttribute("src","#ar2_2d")
      }
    });

    el.addEventListener('mouseleave', function () {
        el.setAttribute("src","#ar_2d")
    });
  }
});

function UnmuteAudio()
{
  var video = document.getElementById("unmuteaudio");
  video.muted = false;
  video.play();
  video.pause();
}

AFRAME.registerComponent('btn360', {
  schema: {
      room: {type: 'string', default: "0"},
  },
  init() {
      
    this.el.addEventListener("click", () => {
      if(click_allowed){

        arbtn.setAttribute("visible","false")
        arbtn.classList.remove("clickable");
        inHome = false;
        this.el.emit("mouseleave")
        click_allowed = false;
        hover_allowed = false;
        current360 =  this.data.room;
        ChangeSphereColor()
        console.log(current360);

        if(current360 != 0)
        {
          if(!motiongranted && getMobileOperatingSystem2()==1)
          {
            motiongranted = true;
            DeviceOrientationEvent.requestPermission()
          }
            

          console.log("360 button clicked")
          castle.setAttribute("visible","false")
          scene.setAttribute("model-viewer","enabled:false;")
          sky.setAttribute("visible","true")
          camera.setAttribute("look-controls","enabled:true")

          document.getElementById("tag_"+this.data.room).setAttribute("visible","true")
          setTimeout(() => {
            document.getElementById("tag_"+this.data.room).emit("fadeout")
          }, 1500);
          setTimeout(() => {
            document.getElementById("tag_"+this.data.room).emit("fadeback")
            document.getElementById("tag_"+this.data.room).setAttribute("visible","false")
            //document.getElementById("tag_"+this.data.room).setAttribute("material","opacity:1;")
            
          }, 3000);
        }

        
      }
  });
      
      
  }
});

//launch ar 
var arbtn = document.getElementById("arbtn");
var inHome = true;
arbtn.addEventListener("click", () => {
    console.log("ar button clicked")
});
// close 360 
var homebtn = document.getElementById("homebtn");
homebtn.addEventListener("click", () => {
  if(inHome)
  {
    history.back();
  }
  else{ 
    inHome = true;

    if(mobile==1)
    {
      arbtn.setAttribute("visible","true")
      arbtn.classList.add("clickable");
    }
    

    click_allowed = true;
    hover_allowed = true;
    console.log("home button clicked")
    castle.setAttribute("visible","true")
    scene.setAttribute("model-viewer","enabled:true;")
    sky.setAttribute("visible","false")
    camera.setAttribute("look-controls","enabled:false")

    pic_360_1.setAttribute("material","color:white;")
    pic_360_2.setAttribute("material","color:white;")
    pic_360_3.setAttribute("material","color:white;")
    pic_360_4.setAttribute("material","color:white;")
    pic_360_5.setAttribute("material","color:white;")
    pic_360_6.setAttribute("material","color:white;")
    pic_360_7.setAttribute("material","color:white;")
    pic_360_8.setAttribute("material","color:white;")
  }
});
// open 360
var see360btn = document.getElementById("see360btn");
see360btn.addEventListener("click", () => {
  
  if(current360 != 0)
  {
    if(!motiongranted && getMobileOperatingSystem2()==1)
    {
      motiongranted = true;
      DeviceOrientationEvent.requestPermission()
    }
      

    console.log("360 button clicked")
    castle.setAttribute("visible","false")
    scene.setAttribute("model-viewer","enabled:false;")
    sky.setAttribute("visible","true")
    camera.setAttribute("look-controls","enabled:true")
  }
});


function ChangeSphereColor()
{
  if(current360 == 1)
  {
    pic_360_1.setAttribute("material","color:#155cab;")
    pic_360_2.setAttribute("material","color:white;")
    pic_360_3.setAttribute("material","color:white;")
    pic_360_4.setAttribute("material","color:white;")
    pic_360_5.setAttribute("material","color:white;")
    pic_360_6.setAttribute("material","color:white;")
    pic_360_7.setAttribute("material","color:white;")
    pic_360_8.setAttribute("material","color:white;")

    sky.setAttribute("src","#innenhof_360")

  }
  else if(current360 == 2)
  {
    pic_360_1.setAttribute("material","color:white;")
    pic_360_2.setAttribute("material","color:#155cab;")
    pic_360_3.setAttribute("material","color:white;")
    pic_360_4.setAttribute("material","color:white;")
    pic_360_5.setAttribute("material","color:white;")
    pic_360_6.setAttribute("material","color:white;")
    pic_360_7.setAttribute("material","color:white;")
    pic_360_8.setAttribute("material","color:white;")
    sky.setAttribute("src","#speisesaal_360")
  }
  else if(current360 == 3)
  {
    pic_360_1.setAttribute("material","color:white;")
    pic_360_2.setAttribute("material","color:white;")
    pic_360_3.setAttribute("material","color:#155cab;")
    pic_360_4.setAttribute("material","color:white;")
    pic_360_5.setAttribute("material","color:white;")
    pic_360_6.setAttribute("material","color:white;")
    pic_360_7.setAttribute("material","color:white;")
    pic_360_8.setAttribute("material","color:white;")
    sky.setAttribute("src","#vorraum_360")
  }
  else if(current360 == 4)
  {
    pic_360_1.setAttribute("material","color:white;")
    pic_360_2.setAttribute("material","color:white;")
    pic_360_3.setAttribute("material","color:white;")
    pic_360_4.setAttribute("material","color:#155cab;")
    pic_360_5.setAttribute("material","color:white;")
    pic_360_6.setAttribute("material","color:white;")
    pic_360_7.setAttribute("material","color:white;")
    pic_360_8.setAttribute("material","color:white;")
    sky.setAttribute("src","#kapelle_360")
  }
  else if(current360 == 5)
  {
    pic_360_1.setAttribute("material","color:white;")
    pic_360_2.setAttribute("material","color:white;")
    pic_360_3.setAttribute("material","color:white;")
    pic_360_4.setAttribute("material","color:white;")
    pic_360_5.setAttribute("material","color:#155cab;")
    pic_360_6.setAttribute("material","color:white;")
    pic_360_7.setAttribute("material","color:white;")
    pic_360_8.setAttribute("material","color:white;")
    sky.setAttribute("src","#bibliothek_360")
  }
  else if(current360 == 6)
  {
    pic_360_1.setAttribute("material","color:white;")
    pic_360_2.setAttribute("material","color:white;")
    pic_360_3.setAttribute("material","color:white;")
    pic_360_4.setAttribute("material","color:white;")
    pic_360_5.setAttribute("material","color:white;")
    pic_360_6.setAttribute("material","color:#155cab;")
    pic_360_7.setAttribute("material","color:white;")
    pic_360_8.setAttribute("material","color:white;")
    sky.setAttribute("src","#vestibuhl_360")
  }
  else if(current360 == 7)
  {
    pic_360_1.setAttribute("material","color:white;")
    pic_360_2.setAttribute("material","color:white;")
    pic_360_3.setAttribute("material","color:white;")
    pic_360_4.setAttribute("material","color:white;")
    pic_360_5.setAttribute("material","color:white;")
    pic_360_6.setAttribute("material","color:white;")
    pic_360_7.setAttribute("material","color:#155cab;")
    pic_360_8.setAttribute("material","color:white;")
    sky.setAttribute("src","#sudrondell_360")
  }
  else if(current360 == 8)
  {
    pic_360_1.setAttribute("material","color:white;")
    pic_360_2.setAttribute("material","color:white;")
    pic_360_3.setAttribute("material","color:white;")
    pic_360_4.setAttribute("material","color:white;")
    pic_360_5.setAttribute("material","color:white;")
    pic_360_6.setAttribute("material","color:white;")
    pic_360_7.setAttribute("material","color:white;")
    pic_360_8.setAttribute("material","color:#155cab;")
    sky.setAttribute("src","#holzbrucke_360")
  }
}



function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  var button = document.querySelector('#APPBUTTON');
  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    console.log('windows');
  }

  if (/android/i.test(userAgent)) {
      console.log('android');
      LaunchAR();
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      console.log('iOS');
      LaunchAR();
  }

  return "unknown";
}

var MV_button = document.getElementById("ar-button");

var startAR_button = document.getElementById("arbtn");
startAR_button.addEventListener("click", () => {
  
  startAR_button.setAttribute("src","#ar2_2d")
  setTimeout(() => {
    startAR_button.setAttribute("src","#ar_2d")
  }, 200);
  //MV_button.click();
  getMobileOperatingSystem();
});


function LaunchAR()
{
  MV_button.click();
}

var device = 0;
function getMobileOperatingSystem2() {
  
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  var button = document.querySelector('#APPBUTTON');
  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    console.log('windows');
    device = 0;
  }

  if (/android/i.test(userAgent)) {
      console.log('android');
      device = 0;
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      console.log('iOS');
      device = 1;
  }

  return device;
}

var mobile = 5;
function getMobileOperatingSystem3() {
  
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  var button = document.querySelector('#APPBUTTON');
  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
      console.log('windows');
      mobile = 0;
  }

  if (/android/i.test(userAgent)) {
      console.log('android');
      mobile = 1;
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      console.log('iOS');
      mobile = 1;
  }

  return mobile;
}