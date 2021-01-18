import axios from 'axios';

// decides if the call originates in browser or server
// and sets te baseURL
export default ({req}) => {
    if(typeof window === 'undefined'){
        // we are on server
        const servicename = 'ingress-nginx-controller';
        const namespace = 'ingress-nginx';
        const baseurl = 'http://' + servicename + '.' + namespace + '.svc.cluster.local';
        return axios.create({
            baseURL: baseurl,
            headers: req.headers
        });

    }else{
        // browser
        return axios.create({
            baseURL: '/'
        });
    }
}
