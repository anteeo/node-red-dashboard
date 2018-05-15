module.exports = function (RED) {
    var ui = require('../ui')(RED);

    function MapNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var group = RED.nodes.getNode(config.group);
        if (!group) {
            return;
        }
        var tab = RED.nodes.getNode(group.config.tab);
        if (!tab) {
            return;
        }

        var done = ui.add({
            emitOnlyNewValues: false,
            node: node,
            tab: tab,
            group: group,
            control: {
                type: 'map',
                label: config.label,
                order: config.order,
                width: config.width || group.config.width || 6,
                height: config.height || parseInt(group.config.width * 0.5 + 2.5) || 5,
                tileUrl: config.tileUrl || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: config.attribution || '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        });
        node.on("close", done);
    }
    RED.nodes.registerType("ui_map", MapNode);
};