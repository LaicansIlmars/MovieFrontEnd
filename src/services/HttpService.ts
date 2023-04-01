export default class HttpService {
  private readonly apiUrl = 'http://127.0.0.1:8000/'

  private readonly headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  public async get(path: string) {
    try {
      const response = await fetch(this.apiUrl + path, {
        method: 'GET',
        headers: this.headers
      })

      return response.json()
    } catch (error) {
      console.error(error)
      return null
    }
  }

  public async post(path: string, body: any) {
    try {
      const response = await fetch(this.apiUrl + path, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(body)
      })

      return response.json()
    } catch (error) {
      console.error(error)
      return null
    }
  }

  public async put(path: string, body: any) {
    try {
      const response = await fetch(this.apiUrl + path, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify(body)
      })

      return response.json()
    } catch (error) {
      console.error(error)
      return null
    }
  }

  public async delete(path: string) {
    try {
      const response = await fetch(this.apiUrl + path, {
        method: 'DELETE',
        headers: this.headers
      })

      return response.json()
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
