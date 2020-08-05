var google = {
  container: document.getElementById('google'), // Required
  path: 'google.json', // Required
  renderer: 'svg',
  loop: false,
  autoplay: false, // Optional
  name: "google", // Name for future reference. Optional.
};
var shopify = {
  container: document.getElementById('shopify'), // Required
  path: 'shopify.json', // Required
  renderer: 'svg',
  loop: false,
  autoplay: false, // Optional
  name: "shopify", // Name for future reference. Optional.
}
var anyService = {
  container: document.getElementById('any-service'), // Required
  path: 'any-service.json', // Required
  renderer: 'svg',
  loop: false,
  autoplay: false, // Optional
  name: "any-service", // Name for future reference. Optional.
}


function AnimationController(animationConfig) {
  this.animationConfig = animationConfig;
  this.state = false;
  console.log(animationConfig)
  this.controller = bodymovin.loadAnimation(this.animationConfig);

  return this;
}

AnimationController.prototype.setIncomingPartner = function(partner) {
  this.incomingPartner = partner;
}

AnimationController.prototype.setOutgoingPartner = function (partner) {
  this.outgoingPartner = partner;
}

AnimationController.prototype.isOn = function() {
  return this.state;
}

AnimationController.prototype.toggle = function() {
  let oldState = this.state;
  this.state = !this.state;
  this._check();
}

AnimationController.prototype._check = function() {
  this._checkFromSelf();
}

AnimationController.prototype._checkFromSelf = function() {
  if(this.isOn()) {
    if(this.outgoingPartner.isOn()) {
      this.outgoingPartner._run(this.SEGMENTS.SELF_PARTNER);
    } else {
      this.outgoingPartner._run(this.SEGMENTS.PARTNER);
    }
    if(this.incomingPartner.isOn()) {
      this._run(this.SEGMENTS.PARTNER_SELF);
    } else {
      this._run(this.SEGMENTS.SELF);
    }
  } else {
    if(this.outgoingPartner.isOn()) {
      this.outgoingPartner._run(this.SEGMENTS.SELF_PARTNER_REVERSE);
    } else {
      this.outgoingPartner._run(this.SEGMENTS.PARTNER_REVERSE);
    }
    if(this.incomingPartner.isOn()) {
      this._run(this.SEGMENTS.PARTNER_SELF_REVERSE);
    } else {
      this._run(this.SEGMENTS.SELF_REVERSE);
    }
  }
}



AnimationController.prototype._run = function(segment) {
  if(!this.controller.isPaused) {
    this.controller.playSegments(segment, false);
  } else {
    this.controller.playSegments(segment, true);
  }
  console.log(this.controller)
}


AnimationController.prototype.SEGMENTS = {
  SELF: [60,160],
  SELF_REVERSE: [400,500],
  SELF_PARTNER: [180,280],
  SELF_PARTNER_REVERSE: [280, 380],
  PARTNER: [540,640],
  PARTNER_REVERSE: [860, 960],
  PARTNER_SELF: [640,740],
  PARTNER_SELF_REVERSE: [760, 860],
}


var googleController = new AnimationController(google);
var shopifyController = new AnimationController(shopify);
var anyServiceController = new AnimationController(anyService);

googleController.setIncomingPartner(shopifyController);
googleController.setOutgoingPartner(anyServiceController);

shopifyController.setIncomingPartner(anyServiceController)
shopifyController.setOutgoingPartner(googleController)

anyServiceController.setIncomingPartner(googleController)
anyServiceController.setOutgoingPartner(shopifyController);


function toggleGoogle() {
  googleController.toggle();
}

function toggleShopify() {
  shopifyController.toggle();
}

function toggleAnyService() {
  anyServiceController.toggle();
}