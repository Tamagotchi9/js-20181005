const API_URL = `https://mgrinko.github.io/js-20181004/api`;

const PhoneService = {
  getAll({ query, orderBy } = {}) {
      return this.fetchData(`/phones`)
        .then(phones => {
            const filteredPhones = this._filter(phones, query);
            return this._sort(filteredPhones, orderBy);
        })
  },

  getOneById(phoneId) {
      return this.fetchData(`/phones/${ phoneId }`);
  },

  fetchData(url, params = {}) {
      return fetch(`${ API_URL }${ url }.json`, params)
          .then((response) => response.json())
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
