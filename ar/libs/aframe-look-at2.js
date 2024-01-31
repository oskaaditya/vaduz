AFRAME.registerComponent('look-at2', {
	schema: {
	  target: {type: 'string', default: 'camera'}
	},
	init: function () { },
	update: function () { },
	tick: function () {
	  const targetEl = document.getElementById(this.data.target).object3D;
	  const el = this.el.object3D;
	  const vec = new THREE.Vector3();
	  targetEl.getWorldDirection(vec);
	  vec.y = 0;
	  vec.add(el.position)
	  el.lookAt(vec);
	}
  });