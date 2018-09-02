const cid = 'HL5YB0ABIRIKUIO5FFTJD2PA3QNPUMUSKT0RZCZ5TQLE45UN'
const csecret = 'ILCK3VMC5VTYVWDCYTVKVQSPDH532LSQ4HSXOMHJIQD3FKJM'
const v = '20180805'
const ll = "30.0083745,31.2149558"
const limit = "100"
const radius = "5000"
const categories = {
    Spa: "4bf58dd8d48988d1ed941735",
    Resort: "4bf58dd8d48988d12f951735",
    Airport: "4bf58dd8d48988d1ed931735",
    Gym: "4bf58dd8d48988d176941735",
    Stadium:"4bf58dd8d48988d184941735"
}
export const url = `https://api.foursquare.com/v2/venues/search?ll=${ll}
&categoryId=${Object.values(categories)}&radius=${radius}&client_id=${cid}&client_secret=${csecret}&v=${v}&limit=${limit}`

export const Places = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url).then(response => {
            if (response.ok === true) {
                return response.json();
            }
            reject('api failed')
        }).then(input => {
            if (input) {
                resolve(input)
                }
            }).catch(errorapi => reject('api failed'))
    });
}
