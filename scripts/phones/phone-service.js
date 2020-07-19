
const PhoneService = {
  getAll({ query, orderBy } = {}) {
    return this.sendRequest(`http://localhost:3000/api/phones.json`)
        .then(phones => {
          const filteredPhones = this._filter(phones, query);
          const sortedPhones = this._sort(filteredPhones, orderBy);
          return sortedPhones;
        })
  },

  getOneById(phoneId) {
    return this.sendRequest(`http://localhost:3000/api/phones/${phoneId}.json`);
  },

  sendRequest(url, {method = "GET"} = {}) {
    return new Promise(
      (resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url,
              true);
        xhr.send();

        xhr.onload = () => {
          if(xhr.status !== 200) {
            reject(new Error(xhr.status + ' : ' + xhr.statusText));
          } else {
            resolve(JSON.parse(xhr.responseText));
            }
          };
        });
  },

  _filter(phones, query) {
    if(!query) {
      return phones;
    }

    const normalizedQuery = query.toLowerCase();
    return phones
        .filter(phone => {
          const normalizedName = phone.name.toLowerCase();
          return normalizedName.includes(normalizedQuery)
        });
  },

  _sort(phones, orderBy) {
    if(!orderBy) {
      return phones;
    }

    return [...phones].sort((phone1, phone2) => {
      return (phone1[orderBy] > phone2[orderBy]) ? 1 : -1;
    });
  }
}

export default PhoneService;
