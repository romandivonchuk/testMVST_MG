export default class Service {

    
    _url = "https://run.mocky.io/v3/"

    async getResourse(url) {
        const res = await fetch(`${this._url}${url}`)
        if (!res.ok) {
            throw new Error(`could not fetch ${url} , received ${res.status}`)
        }
        return await res.json()
    }

    

    async processArray(array) {
        let arr = []
        for (const item of array) {
          await this.getResourse(item).then((el) => arr.push(el));
        }
        
        

        return arr
    }
    

}
