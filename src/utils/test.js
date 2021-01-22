const request = require('axios');

async function getLocation(ipaddr) {
    const url = `http://api.ipstack.com/${encodeURIComponent(ipaddr)}?access_key=c5b64d9a2b62de9e54fabdfb9210c7b3&format=1`;

    console.log(url);

    try {
        let response = await request.get(url);

        if (response.data.success) {
          return {
            city: response.data.city,
            countryCode: response.data.country_code
          };
        }

        return response.data.error;
    } catch (err) {
        console.error('Http Error', err);
    }
}

