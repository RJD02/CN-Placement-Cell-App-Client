const makeRequest = async(url: string, options: RequestInit ) => {
    try {
    const response = await fetch('http://localhost:8000' + url, options);
        if(response.status !== 200) return null;
    const data = await response.json();
    return data;
    } catch(e) {
        console.log('error')
        return null;
    }
}

export default makeRequest
