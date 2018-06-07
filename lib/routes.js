FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('MainLayout', { main: "hostList" });
    }
});

FlowRouter.route('/hostInput', {
    name: 'hostInput',
    action() {
        BlazeLayout.render('MainLayout', { main: "hostInput" });
    }
});

FlowRouter.route('/hostList', {
    name: 'hostList',
    action() {
        BlazeLayout.render('MainLayout', { main: "hostList" });
    }
});

FlowRouter.route('/configSystem', {
    name: 'configSystem',
    action() {
        BlazeLayout.render('MainLayout', { main: 'adminConfig' });
    }
});
