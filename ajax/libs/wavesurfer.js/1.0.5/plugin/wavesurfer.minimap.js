'use strict';

/* Minimap */
WaveSurfer.Minimap = WaveSurfer.util.extend({}, WaveSurfer.Drawer, WaveSurfer.Drawer.Canvas, {
    init: function (wavesurfer, params) {
        this.wavesurfer = wavesurfer;
        this.container = this.wavesurfer.drawer.container;
        this.lastPos = this.wavesurfer.drawer.lastPos;
        this.params = wavesurfer.util.extend(
            {}, this.wavesurfer.drawer.params, params, {
                scrollParent: false,
                fillParent: true
            }
        );

        this.width = 0;
        this.height = this.params.height * this.params.pixelRatio;

        this.createWrapper();
        this.createElements();

        this.bindWaveSurferEvents();
        this.bindMinimapEvents();
    },

    bindWaveSurferEvents: function () {
        var my = this;
        this.wavesurfer.on('ready', this.render.bind(this));
        this.wavesurfer.on('progress', function (progress) {
            my.progress(progress);
        });
    },

    bindMinimapEvents: function () {
        var my = this;
        this.on('click', function (e, position) {
            my.progress(position);
            var time = ~~(position * my.wavesurfer.getDuration());
            my.wavesurfer.play(time);
        });
    },

    render: function () {
        var len = this.getWidth();
        var peaks = this.wavesurfer.backend.getPeaks(len);
        this.drawPeaks(peaks, len);
    }
});


WaveSurfer.initMinimap = function (params) {
    var map = Object.create(WaveSurfer.Minimap);
    map.init(this, params);
    return map;
};
