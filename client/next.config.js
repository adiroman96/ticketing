module.exports = {
    webpackDevMiddleware: config =>{
        config.watchOptions.poll = 3000; // make Next JS update after every change (sometimes it didn't work so this was the solution)
        return config;
    } 
};
// if change doesnt appear -> kubectl get pods, kubectl delete pod <client_pod>, skaffold will create auto. a new pod with the changes