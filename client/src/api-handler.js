import axios from "axios";

const basicUrl = "api";

export function post(routeURL, postData, success , error) {

    return new Promise((resolve, reject) => {
        axios.post(basicUrl+routeURL, postData).then(res => {
            console.log('res',res)
            if(res.status && success) success()
            resolve(res.data);
        })
        .catch(err => {
            console.log('err',err)
            if(error) error()
            reject(err)
        });
    });
}
export function get(routeURL, postData, success , error) {

    return new Promise((resolve, reject) => {
        axios.get(basicUrl+routeURL, postData).then(res => {
            console.log('res',res)
            if(res.status && success) success()
            resolve(res.data);
        })
        .catch(err => {
            console.log('err',err)
            if(error) error()
            reject(err)
        });
    });
}